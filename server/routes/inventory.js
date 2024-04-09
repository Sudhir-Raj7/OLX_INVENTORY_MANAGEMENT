import express from "express"
import InventoryController from "../controllers/inventoryController.js";
const router = express.Router();

router.post("/inventories",InventoryController.createInventory);

export default router;