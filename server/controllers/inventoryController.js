import InventoryModel from "../models/inventoryModel.js";

class InventoryController {
    static createInventory = async (req, res) => {
        const { sku, type, status, location, attributes, pricing, metadata } = req.body;
        try {
            // Check if all required fields are present in the request body
            if (sku && type && status && location && attributes && pricing && metadata) {
                // Create a new InventoryModel instance with the provided data
                const newInventory = new InventoryModel({
                    sku,
                    type,
                    status,
                    location,
                    attributes,
                    pricing,
                    metadata
                });
                // Save the new inventory item to the database
                const savedInventory = await newInventory.save();
                // Check if the inventory item was successfully saved
                if (savedInventory) {
                    return res.status(200).json({ message: "Inventory created", inventory: savedInventory });
                } else {
                    return res.status(500).json({ message: "Failed to save inventory item" });
                }
            } else {
                // Return a 400 Bad Request response if any required field is missing
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            // Handle any errors that occur during the creation or saving of the inventory item
            return res.status(500).json({ message: error.message });
        }
    };
    
    


}

export default InventoryController;


