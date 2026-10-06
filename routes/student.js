import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import requireAuth from '../middlewares/requireAuth.js';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/student/dashboard
 * Protected by requireAuth middleware
 * Fetches and returns the logged-in user's StudentProfile, including totalXP and xpLogs
 */
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized: Invalid token payload (userId missing)',
      });
    }

    // Fetch StudentProfile with totalXP and xpLogs
    const studentProfile = await prisma.studentProfile.findUnique({
      where: {
        userId,
      },
      include: {
        xpLogs: {
          orderBy: {
            awardedAt: 'desc',
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            school: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!studentProfile) {
      return res.status(404).json({
        error: 'Student profile not found for this user',
      });
    }

    // Return the student profile including totalXP and xpLogs
    return res.status(200).json({
      ...studentProfile,
      studentProfile,
      totalXP: studentProfile.totalXP,
      xpLogs: studentProfile.xpLogs,
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching the student dashboard',
      details: error.message,
    });
  }
});

export default router;
