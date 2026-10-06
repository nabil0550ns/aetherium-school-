import { PrismaClient, Role, Pillar, QuestStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting El Andalus Academy database seeding...');

  // 1. Create or update School
  const school = await prisma.school.upsert({
    where: { code: 'ANDALUS-DZ' },
    update: {},
    create: {
      name: 'مدرسة الأندلس',
      code: 'ANDALUS-DZ',
      address: 'هضبة حيدرة / الأبيار، الجزائر العاصمة، 16035',
      phone: '+213 (0) 23 88 44 20',
      email: 'contact@elandalus-academy.dz',
    },
  });

  console.log(`🏫 School verified: ${school.name} (${school.code})`);

  // 2. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@elandalus-academy.dz' },
    update: {},
    create: {
      fullName: 'أ. عبد الحفيظ بوعبد الله',
      email: 'admin@elandalus-academy.dz',
      phone: '+213 550 00 11 22',
      passwordHash: 'argon2_or_bcrypt_hash_placeholder',
      role: Role.ADMIN,
      schoolId: school.id,
    },
  });

  // 3. Create Student Users & Profiles
  // Student 1: Amine (Preparatory)
  const amineUser = await prisma.user.upsert({
    where: { email: 'amine.benz@student.elandalus.dz' },
    update: {},
    create: {
      fullName: 'أمين بن زروال',
      email: 'amine.benz@student.elandalus.dz',
      role: Role.STUDENT,
      schoolId: school.id,
      passwordHash: 'hash_placeholder',
      studentData: {
        create: {
          studentCode: 'AND-ST-01',
          pillar: Pillar.PREPARATORY,
          gradeLevel: 'الطور التحضيري (4 سنوات)',
          rfidCardUid: 'RFID-AMINE-01',
          supervisedZone: 'ورشة النباتات اللمسية (البهو الأخضر)',
          totalXP: 450,
        },
      },
    },
    include: { studentData: true },
  });

  // Student 2: Meriem (Primary)
  const meriemUser = await prisma.user.upsert({
    where: { email: 'meriem.saidi@student.elandalus.dz' },
    update: {},
    create: {
      fullName: 'مريم سعيدي',
      email: 'meriem.saidi@student.elandalus.dz',
      role: Role.STUDENT,
      schoolId: school.id,
      passwordHash: 'hash_placeholder',
      studentData: {
        create: {
          studentCode: 'AND-ST-02',
          pillar: Pillar.PRIMARY,
          gradeLevel: 'الطور الابتدائي (السنة الثالثة - 8 سنوات)',
          rfidCardUid: 'RFID-MERIEM-02',
          supervisedZone: 'مختبر الروبوتات والمنطق الرياضي',
          totalXP: 1850,
        },
      },
    },
    include: { studentData: true },
  });

  // Student 3: Yanis (Middle School)
  const yanisUser = await prisma.user.upsert({
    where: { email: 'yanis.belk@student.elandalus.dz' },
    update: {},
    create: {
      fullName: 'يانيس بلقاسم',
      email: 'yanis.belk@student.elandalus.dz',
      role: Role.STUDENT,
      schoolId: school.id,
      passwordHash: 'hash_placeholder',
      studentData: {
        create: {
          studentCode: 'AND-ST-03',
          pillar: Pillar.MIDDLE,
          gradeLevel: 'الطور المتوسط (السنة الثالثة - 13 سنة)',
          rfidCardUid: 'RFID-YANIS-03',
          supervisedZone: 'غرفة المناظرات السقراطية ونفق الرياح',
          totalXP: 2950,
        },
      },
    },
    include: { studentData: true },
  });

  // 4. Create Parent Users & link to students
  const parentSomia = await prisma.user.upsert({
    where: { email: 'dr.somia@parents.elandalus.dz' },
    update: {},
    create: {
      fullName: 'د. سمية بن يحيى',
      email: 'dr.somia@parents.elandalus.dz',
      phone: '+213 550 44 33 22',
      role: Role.PARENT,
      schoolId: school.id,
      passwordHash: 'hash_placeholder',
      parentData: {
        create: {
          relation: 'أم',
        },
      },
    },
    include: { parentData: true },
  });

  if (parentSomia.parentData && meriemUser.studentData) {
    await prisma.parentStudent.upsert({
      where: {
        parentId_studentId: {
          parentId: parentSomia.parentData.id,
          studentId: meriemUser.studentData.id,
        },
      },
      update: {},
      create: {
        parentId: parentSomia.parentData.id,
        studentId: meriemUser.studentData.id,
      },
    });
  }

  // 5. Create Sample XP Logs & Quests for Meriem
  if (meriemUser.studentData) {
    await prisma.xPLog.createMany({
      data: [
        {
          studentId: meriemUser.studentData.id,
          amount: 150,
          reason: 'بناء نموذج مجسم لخلية نباتية متوازنة في علوم الطبيعة',
          awardedBy: 'أ. فريد حمداوي',
        },
        {
          studentId: meriemUser.studentData.id,
          amount: 200,
          reason: 'كتابة مقال تحليلي حول أثر ابن خلدون في العمران والأخلاق',
          awardedBy: 'د. نور الدين زروقي',
        },
      ],
      skipDuplicates: true,
    });

    await prisma.homeworkQuest.createMany({
      data: [
        {
          studentId: meriemUser.studentData.id,
          title: 'بناء نموذج مجسم لخلية نباتية متوازنة',
          subject: 'علوم الطبيعة والحياة',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          status: QuestStatus.COMPLETED,
          xpReward: 150,
        },
        {
          studentId: meriemUser.studentData.id,
          title: 'برمجة خوارزمية فرز بياني بحساس الألوان',
          subject: 'الروبوتات',
          dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
          status: QuestStatus.IN_PROGRESS,
          xpReward: 180,
        },
      ],
      skipDuplicates: true,
    });

    await prisma.earnedBadge.createMany({
      data: [
        {
          studentId: meriemUser.studentData.id,
          badgeName: 'وسام الفصاحة والبيان',
          description: 'ألقى مرافعة نموذجية في نادي المناظرات باللغة الفصحى.',
          color: '#C9A24B',
        },
        {
          studentId: meriemUser.studentData.id,
          badgeName: 'وسام المستكشف البيئي',
          description: 'نجح في زراعة وتوثيق دورة حياة بذور اللافندر بالكامل.',
          color: '#2FD6C8',
        },
      ],
      skipDuplicates: true,
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
