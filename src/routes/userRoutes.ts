import { Router } from "express";
import { userController } from "../controllers";
import logginIsRequired from "../middleware/logginIsRequired";
import multer from "multer";
import { multerConfig } from "../config";
const router = Router();

router.post("", multer(multerConfig).single("file"), userController.create)
router.post("/login", userController.login)
router.get("/whoami", logginIsRequired, userController.whoAmI)
router.get("/getAll", logginIsRequired, userController.listUsers)
router.get("/:id", logginIsRequired, userController.findUserById);
router.put("", logginIsRequired, multer(multerConfig).single("file"), userController.updateUser)

export default router;
  