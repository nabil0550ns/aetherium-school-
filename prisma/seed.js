import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Common password hash for test accounts ('password123')
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('password123', saltRounds);

  // 1. Create or find default School 'مدرسة الأندلس'
  let school = await prisma.school.findFirst({
    where: { name: 'مدرسة الأندلس' },
  });

  if (!school) {
    school = await prisma.school.create({
      data: {
        name: 'مدرسة الأندلس',
      },
    });
    console.log(`✅ Created school: ${school.name} (ID: ${school.id})`);
  } else {
    console.log(`ℹ️ Found existing school: ${school.name} (ID: ${school.id})`);
  }

  // 2. Create TEACHER user
  const teacherEmail = 'teacher@elandalus.edu';
  let teacher = await prisma.user.findUnique({
    where: { email: teacherEmail },
  });

  if (!teacher) {
    teacher = await prisma.user.create({
      data: {
        email: teacherEmail,
        passwordHash,
        role: 'TEACHER',
        schoolId: school.id,
      },
    });
    console.log(`✅ Created teacher user: ${teacher.email} (ID: ${teacher.id})`);
  } else {
    console.log(`ℹ️ Teacher user already exists: ${teacher.email}`);
  }

  // 3. Create STUDENT user with StudentProfile and initial XPLog
  const studentEmail = 'student@elandalus.edu';
  let student = await prisma.user.findUnique({
    where: { email: studentEmail },
    include: { studentData: true },
  });

  if (!student) {
    student = await prisma.user.create({
      data: {
        email: studentEmail,
        passwordHash,
        role: 'STUDENT',
        schoolId: school.id,
        studentData: {
          create: {
            totalXP: 100,
            xpLogs: {
              create: {
                amount: 100,
                reason: 'Welcome to El Andalus Academy! Initial starter XP',
              },
            },
          },
        },
      },
      include: {
        studentData: {
          include: {
            xpLogs: true,
          },
        },
      },
    });
    console.log(`✅ Created student user: ${student.email} (ID: ${student.id})`);
    console.log(`   - Student Profile ID: ${student.studentData?.id}`);
    console.log(`   - Initial totalXP: ${student.studentData?.totalXP}`);
  } else {
    console.log(`ℹ️ Student user already exists: ${student.email}`);
    // If student exists without studentData profile, create it
    if (!student.studentData) {
      const profile = await prisma.studentProfile.create({
        data: {
          userId: student.id,
          totalXP: 100,
          xpLogs: {
            create: {
              amount: 100,
              reason: 'Welcome to El Andalus Academy! Initial starter XP',
            },
          },
        },
      });
      console.log(`✅ Created StudentProfile for existing student (Profile ID: ${profile.id})`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
