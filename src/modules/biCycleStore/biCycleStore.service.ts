import { BiCycleStore } from './biCycleStore.interface';
import { BiCycleStoreModel } from './biCycleStore.model';

// Create a service method to create a new bicycle in the database
const createBicycle = async (bicycleData: BiCycleStore) => {
  const bicycle = BiCycleStoreModel.create(bicycleData);
  return bicycle;
};

// Create a service method to retrieve all bicycles from the database
const getAllBicycles = async () => {
  const bicycles = await BiCycleStoreModel.find();
  return bicycles;
};

// Create a service method to search for bicycles in the database
const searchBicycles = async (searchTerm: string) => {
  return await BiCycleStoreModel.find({
    // Use a regular expression to perform a case-insensitive search
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { type: { $regex: searchTerm, $options: 'i' } },
    ],
  });
};

// Create a service method to retrieve a bicycle by its ID
const getBicycleById = async (productId: string) => {
  const bicycle = await BiCycleStoreModel.findById(productId);
  return bicycle;
};

// Create a service method to update a bicycle by its ID
const updateBicycle = async (
  productId: string,
  updatedData: Partial<BiCycleStore>,
) => {
  const updatedBicycle = await BiCycleStoreModel.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true },
  );
  return updatedBicycle;
};

// Create a service method to delete a bicycle by its ID
const deleteBicycle = async (productId: string) => {
  const deletedBicycle = await BiCycleStoreModel.findByIdAndDelete(productId);
  return deletedBicycle;
};

// Exporting the service methods
export const BiCycleStoreService = {
  createBicycle,
  getAllBicycles,
  searchBicycles,
  getBicycleById,
  updateBicycle,
  deleteBicycle,
};
