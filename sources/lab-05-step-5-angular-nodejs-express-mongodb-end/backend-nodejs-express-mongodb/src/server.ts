import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import CatsRoute from './routes/cats.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(),  new CatsRoute(), new AuthRoute()]);

app.listen();
