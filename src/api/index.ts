import { Router } from 'express';
import * as middleware from './middleware';

import LoginRoute from './v1/login';
import RegisterRoute from './v1/register';

const apiRouter = Router();

apiRouter.use('/', middleware.Application);
apiRouter.use('/register', RegisterRoute);

apiRouter.use('/login', middleware.Authorization);
apiRouter.use('/login', LoginRoute);

export default apiRouter