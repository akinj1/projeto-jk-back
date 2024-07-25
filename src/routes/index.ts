import { Router } from "express";
import userRouter from "./userRoutes"
import roleRouter from "./permissionRoutes";
import clientRouter from "./clientRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/client", clientRouter);

export default router;      