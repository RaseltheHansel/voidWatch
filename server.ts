import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

// ✅ Extend the global type
declare global {
  var io: Server | undefined;
}

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    socket.on('join_project', (projectId: string) => {
      socket.join(projectId);
    });
  });

  global.io = io;

  httpServer.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});