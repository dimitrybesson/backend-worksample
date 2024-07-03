import express, {Express} from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app: Express = express();
app.use(cors())
  .use(express.json())
  .options('*', cors());

app.use(routes)

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
