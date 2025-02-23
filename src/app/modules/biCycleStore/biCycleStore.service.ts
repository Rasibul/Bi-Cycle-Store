import { BiCycleStore, PaginationOptions, SearchFilters } from './biCycleStore.interface';
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
const searchBicycles = async (
  searchTerm: string,
  filters: SearchFilters = {},
  paginationOptions: PaginationOptions = { page: 1, limit: 10 }
) => {
  const { page, limit } = paginationOptions;
  const skip = (page - 1) * limit;

  // Build query dynamically
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { ...filters }; // Include applied filters

  // Apply search term
  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search
      { brand: { $regex: searchTerm, $options: 'i' } },
      { type: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // Fetch paginated results
  const bicycles = await BiCycleStoreModel.find(query).skip(skip).limit(limit);
  const total = await BiCycleStoreModel.countDocuments(query);

  return {
    bicycles,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
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
