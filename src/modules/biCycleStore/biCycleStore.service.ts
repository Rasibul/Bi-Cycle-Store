import { BiCycleStore } from "./biCycleStore.interface";
import { BiCycleStoreModel } from "./biCycleStore.model";


const createBicycle = async (bicycleData: BiCycleStore) => {
    const bicycle = BiCycleStoreModel.create(bicycleData);
    return bicycle;

};


const getAllBicycles = async () => {
    const bicycles = await BiCycleStoreModel.find();
    return bicycles;
};


const searchBicycles = async (searchTerm: string) => {
    return await BiCycleStoreModel.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { brand: { $regex: searchTerm, $options: 'i' } },
            { type: { $regex: searchTerm, $options: 'i' } },
        ],
    });
};


const getBicycleById = async (productId: string) => {
    const bicycle = await BiCycleStoreModel.findById(productId);
    return bicycle;
};


const updateBicycle = async (productId: string, updatedData: Partial<BiCycleStore>) => {
    const updatedBicycle = await BiCycleStoreModel.findByIdAndUpdate(productId, updatedData, { new: true });
    return updatedBicycle;
};


const deleteBicycle = async (productId: string) => {
    const deletedBicycle = await BiCycleStoreModel.findByIdAndDelete(productId);
    return deletedBicycle;
};






export const BiCycleStoreService = { createBicycle, getAllBicycles, searchBicycles, getBicycleById, updateBicycle, deleteBicycle };