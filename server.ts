import { createServer } from 'http';
import next from 'next';
import { Server as SocketServer } from 'socket.io';

const dev    = process.env.NODE_ENV !== 'production';
const app    = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    // ← removed parse and parseUrl — handle works without them
    handle(req, res);
  });

  const io = new SocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Dashboard connected:', socket.id);

    socket.on('subscribe_project', (projectId: string) => {
      // ← removed space inside template literal
      socket.join(`project:${projectId}`);
      console.log(`Subscribed to project: ${projectId}`);
    });

    socket.on('disconnect', () => {
      console.log('Dashboard disconnected:', socket.id);
    });
  });

  // ← fixed any → unknown
  (global as unknown as { io: SocketServer }).io = io;

  const PORT = parseInt(process.env.PORT || '3000', 10);
  httpServer.listen(PORT, () => {
    console.log(`⚫ VoidWatch running on http://localhost:${PORT}`);
  });
});
