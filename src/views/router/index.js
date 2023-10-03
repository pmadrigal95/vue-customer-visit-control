/**
 * ROUTES
 */
import homeRoutes from '@/views/home/router';

import errorRoutes from '@/views/error/router';

import brandRoutes from '@/views/brand/router';

import reportRoutes from '@/views/report/router';

import productRoutes from '@/views/product/router';

import customerRoutes from '@/views/customer/router';

import authenticationRoutes from '@/views/authentication/login/router';


const routes = [
    ...homeRoutes,
    ...errorRoutes,
    ...brandRoutes,
    ...reportRoutes,
    ...productRoutes,
    ...customerRoutes,
    ...authenticationRoutes,
];

export default routes;