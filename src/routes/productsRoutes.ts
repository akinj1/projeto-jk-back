import { Router } from "express";
import { productController } from "../controllers";
import logginIsRequired from "../middleware/logginIsRequired";
const router = Router();

router.post("", logginIsRequired,productController.create);
router.get("/:id", logginIsRequired, productController.findProductById);
router.get("/getAll", logginIsRequired, productController.listProducts);
router.put("", logginIsRequired, productController.updateProduct)

export default router;
