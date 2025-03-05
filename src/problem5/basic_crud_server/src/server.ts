import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { ResourceRoutes } from '../src/routes/index';

// Load environment variables
dotenv.config();

class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());

    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.json({ limit: '10kb' }));
  }

  private connectToDatabase(): void {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crud_service';

    mongoose.connect(mongoUri)
      .then(() => {
        console.log('Connecting');
      })
      .catch((error) => {
        console.error('Cannot connect to Mongoose:', error);
        process.exit(1);
      });
  }

  private initializeRoutes(): void {
    const resourceRoutes = new ResourceRoutes();
    this.app.use('/api/resources', resourceRoutes.router);

    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).send('Internal Services error!');
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Start listening at PORT:${this.port}`);
    });
  }
}

const server = new Server();
server.start();