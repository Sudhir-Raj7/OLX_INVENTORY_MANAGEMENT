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

    static getInventory = async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        try {
            const totalItems = await InventoryModel.countDocuments();
            const totalPages = Math.ceil(totalItems / perPage);

            // If requested page exceeds total pages, return an empty array
            if (page > totalPages) {
                return res.status(200).json({
                    currentPage: page,
                    totalPages: totalPages,
                    inventory: []
                });
            }

            const inventory = await InventoryModel.find()
                .skip((page - 1) * perPage)
                .limit(perPage);

            res.status(200).json({
                currentPage: page,
                totalPages: totalPages,
                inventory: inventory
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };

    static getInventoryById = async (req, res) => {
        const { id } = req.params;

        try {
            if (id) {
                const inventory = await InventoryModel.findById(id);
                return res.status(200).json(inventory);
            }
            else {
                return res.status(400).json({ message: "Invalid URL" });
            }
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }

    }
}

export default InventoryController;


