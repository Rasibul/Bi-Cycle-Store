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





export const BiCycleStoreService = { createBicycle, getAllBicycles, searchBicycles, getBicycleById };