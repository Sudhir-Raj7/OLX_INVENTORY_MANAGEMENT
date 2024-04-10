import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    sku: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    attributes: {
        brand: { type: String },
        model: { type: String },
        // Add more fields as needed
    },
    pricing: {
        cost: { type: Number, required: true },
        sellingPrice: { type: Number },
    },
    metadata: {
        createdAt: { type: Date, default: Date.now },
        lastUpdatedAt: { type: Date },
        createdBy: { type: String },
        lastUpdatedBy: { type: String },
    }
});



const InventoryModel = mongoose.model('Inventory', InventorySchema);

export default InventoryModel;
