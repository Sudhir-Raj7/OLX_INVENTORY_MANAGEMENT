import { expect } from 'chai';
import sinon from 'sinon';

// Import the method to be tested
import InventoryController from '../controllers/inventoryController.js';
import InventoryModel from '../models/inventoryModel.js';

describe('InventoryController', () => {
    describe('createInventory', () => {
        it('should return a 200 status and created inventory data when valid data is provided', async () => {
            // Arrange
            const req = {
                body: {
                    sku: 'SKU001',
                    type: 'type1',
                    status: 'active',
                    location: 'Location A',
                    attributes: {
                        brand: 'Brand X',
                        model: 'Model Y'
                    },
                    pricing: {
                        cost: 100,
                        sellingPrice: 150
                    },
                    metadata: {
                        createdBy: 'user1'
                    }
                }
            };
            const res = {
                status: sinon.stub().returnsThis(), 
                json: sinon.spy() 
            };
            sinon.stub(InventoryModel.prototype, 'save').resolves(req.body); 

            // Act
            await InventoryController.createInventory(req, res);

            // Assert
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ message: 'Inventory created', inventory: req.body })).to.be.true;

            InventoryModel.prototype.save.restore();
        });

        it('should return a 400 status and error message when required fields are missing', async () => {
            // Arrange
            const req = {
                body: {}
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            // Act
            await InventoryController.createInventory(req, res);

            // Assert
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ message: 'All fields are required' })).to.be.true;
        });


    });
});
