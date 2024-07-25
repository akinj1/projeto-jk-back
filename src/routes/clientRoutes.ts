import { Router } from "express";
import { clientController } from "../controllers";
import logginIsRequired from "../middleware/logginIsRequired";
const router = Router();

router.post("", logginIsRequired, clientController.create);
router.get("/:id", logginIsRequired, clientController.listClients);
router.get("/getAll", logginIsRequired, clientController.listClients);
router.put("", logginIsRequired, clientController.updateClient)

export default router;
