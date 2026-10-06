import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'elandalus_jwt_secret_key_2026';

/**
 * POST /api/auth/register
 * Accepts: email, password, role, schoolId
 * Hashes password using bcryptjs and creates a User in Prisma
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, schoolId } = req.body;

    // 1. Validation
    if (!email || !password || !role || !schoolId) {
      return res.status(400).json({
        error: 'Missing required fields: email, password, role, and schoolId are required',
      });
    }

    const validRoles = ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'];
    const formattedRole = role.toUpperCase();
    if (!validRoles.includes(formattedRole)) {
      return res.status(400).json({
        error: `Invalid role. Allowed roles: ${validRoles.join(', ')}`,
      });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'A user with this email address already exists',
      });
    }

    // 3. Check if school exists
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
    });

    if (!school) {
      return res.status(404).json({
        error: `School with ID "${schoolId}" not found`,
      });
    }

    // 4. Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 5. Create user (and StudentProfile if role is STUDENT)
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        role: formattedRole,
        schoolId,
        ...(formattedRole === 'STUDENT'
          ? {
              studentData: {
                create: {
                  totalXP: 0,
                },
              },
            }
          : {}),
      },
      include: {
        studentData: true,
        school: {
          select: { id: true, name: true },
        },
      },
    });

    // 6. Generate signed JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        schoolId: newUser.schoolId,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return response without passwordHash
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        school: newUser.school,
        studentData: newUser.studentData,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'An error occurred during registration',
      details: error.message,
    });
  }
});

/**
 * POST /api/auth/login
 * Accepts: email, password
 * Verifies credentials and returns signed JWT using jsonwebtoken
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        studentData: true,
        school: {
          select: { id: true, name: true },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // 3. Verify password hash using bcryptjs
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // 4. Generate signed JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return authenticated response
    res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        school: user.school,
        studentData: user.studentData,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'An error occurred during authentication',
      details: error.message,
    });
  }
});

export default router;
