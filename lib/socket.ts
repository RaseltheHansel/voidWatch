import type { Server as SocketServer } from 'socket.io';

export function getIO(): SocketServer {
  const io = (global as unknown as { io: SocketServer }).io;
  if (!io) throw new Error('Socket.io is not initialized');
  return io;
}