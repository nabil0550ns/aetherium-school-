import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.js';
import studentRouter from './routes/student.js';
import teacherRouter from './routes/teacher.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();
const PORT = process.env.PORT && process.env.PORT !== '5173' ? process.env.PORT : (process.env.BACKEND_PORT || 3000);

// Initialize Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Make 'io' instance globally accessible
app.set('io', io);
global.io = io;

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`⚡ Socket client connected: ${socket.id}`);

  // Join student personal room
  socket.on('join_student', (studentId) => {
    if (studentId) {
      socket.join(String(studentId));
      socket.join(`student_${studentId}`);
      console.log(`👤 Socket ${socket.id} joined student room: ${studentId}`);
    }
  });

  socket.on('join_room', (room) => {
    if (room) {
      socket.join(String(room));
      console.log(`🚪 Socket ${socket.id} joined room: ${room}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Socket client disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);

// GET /api/health - Returns database connection status
app.get('/api/health', async (req, res) => {
  try {
    // Ping PostgreSQL database using raw query
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'ok',
      message: 'Server and database are healthy',
      database: 'connected',
      socketio: 'ready',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database connection error in /api/health:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.json({
    name: 'El Andalus Academy API',
    status: 'running',
    socketio: 'enabled',
    healthCheck: '/api/health',
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start Server with Socket.io attached
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🩺 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`⚡ Socket.io real-time engine initialized`);
});
