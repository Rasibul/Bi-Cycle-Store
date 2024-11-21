import { BiCycleStore } from "./biCycleStore.interface";
import { BiCycleStoreModel } from "./biCycleStore.model";


const createBicycle = async (bicycleData: BiCycleStore) => {
    const bicycle = BiCycleStoreModel.create(bicycleData);
    return bicycle;

};


export const BiCycleStoreService = { createBicycle };