class InventoryData {
    constructor({ sku, type, status, location, attributes, pricing, metadata }) {
        this.sku = sku;
        this.type = type;
        this.status = status;
        this.location = location;
        this.attributes = attributes;
        this.pricing = pricing;
        this.metadata = metadata;
    }
}

import InventoryModel from "../models/inventoryModel.js";

class InventoryController {
    static createInventory = async (req, res) => {
        try {
            // Create an object of InventoryData class to encapsulate request body attributes
            const inventoryData = new InventoryData(req.body);

            if (!inventoryData.sku || !inventoryData.type || !inventoryData.status || !inventoryData.location || !inventoryData.attributes || !inventoryData.pricing || !inventoryData.metadata) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const newInventory = new InventoryModel(inventoryData);

            const savedInventory = await newInventory.save();

            if (savedInventory) {
                return res.status(200).json({ message: "Inventory created", inventory: savedInventory });
            } else {
                return res.status(500).json({ message: "Failed to save inventory item" });
            }
        } catch (error) {

            console.error('Error creating inventory:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default InventoryController;


