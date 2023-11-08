import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bicicletaRoutes from './routes/Bicicleta';
import clienteRoutes from './routes/Cliente';
import itemRoutes from './routes/Item';
import ordemServicoRoutes from './routes/OrdemServico';
import usuarioRoutes from './routes/Usuario';

let server: Express = express();

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

server.use(bicicletaRoutes);
server.use(clienteRoutes);
server.use(itemRoutes);
server.use(ordemServicoRoutes);
server.use(usuarioRoutes);

export default {
  start () {
    server.listen(Number(process.env.DB_PORT), () => {
      console.log(`Server started on port ${process.env.DB_PORT}!`);
    });
  }
};