import { GraphQLServer } from 'graphql-yoga';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import jwtHandler from '@middlewares/jwtHandler';

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        return {
          req: req.request
        }
      },
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(jwtHandler);
  };
}

export default new App().app;
