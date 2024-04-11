import express from "express"
import InventoryController from "../controllers/inventoryController.js";
const router = express.Router();

router.post("/inventories",InventoryController.createInventory);
router.get("/inventories",InventoryController.getInventory);
router.get("/inventories/:id",InventoryController.getInventoryById);



export default router;