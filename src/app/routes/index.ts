import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { BiCycleStoreRoutes } from "../modules/biCycleStore/biCycleStore.routes";
import { OrderRoutes } from "../modules/order/order.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoutes,
    },
    {
        path: '/products',
        route: BiCycleStoreRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
