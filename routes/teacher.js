import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import requireAuth from '../middlewares/requireAuth.js';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/teacher/award-xp
 * Protected by requireAuth middleware
 * Requires role: TEACHER (returns 403 otherwise)
 * Uses prisma.$transaction to atomically:
 * 1) Create a new XPLog with studentId, amount, reason
 * 2) Increment StudentProfile.totalXP by amount
 */
router.post('/award-xp', requireAuth, async (req, res) => {
  try {
    // 1. Role verification
    if (req.user?.role !== 'TEACHER') {
      return res.status(403).json({
        error: 'Forbidden: Only teachers are authorized to award XP',
      });
    }

    const { studentId, amount, reason } = req.body;

    // 2. Input validation
    if (!studentId || amount === undefined || amount === null || !reason) {
      return res.status(400).json({
        error: 'Missing required fields: studentId, amount, and reason are required',
      });
    }

    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        error: 'Invalid amount: amount must be a positive integer',
      });
    }

    // 3. Verify student profile existence (supports StudentProfile ID or User ID)
    let profile = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    });

    if (!profile) {
      // Check if studentId provided is the user's ID
      profile = await prisma.studentProfile.findUnique({
        where: { userId: studentId },
      });
    }

    if (!profile) {
      return res.status(404).json({
        error: `Student profile not found for identifier "${studentId}"`,
      });
    }

    // 4. Atomic transaction using prisma.$transaction
    const [newXPLog, updatedProfile] = await prisma.$transaction([
      prisma.xPLog.create({
        data: {
          studentId: profile.id,
          amount: parsedAmount,
          reason: String(reason).trim(),
        },
      }),
      prisma.studentProfile.update({
        where: { id: profile.id },
        data: {
          totalXP: {
            increment: parsedAmount,
          },
        },
      }),
    ]);

    return res.status(200).json({
      message: 'XP awarded successfully',
      xpLog: newXPLog,
      studentProfile: updatedProfile,
    });
  } catch (error) {
    console.error('Error awarding XP:', error);
    return res.status(500).json({
      error: 'An error occurred while awarding XP',
      details: error.message,
    });
  }
});

export default router;
