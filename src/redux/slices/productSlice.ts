import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ProductState, Product, Category } from '../../types';
import { productApi } from '../../services/mockApi';

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async (shopId: string) => {
  const [products, categories] = await Promise.all([
    productApi.getProducts(shopId),
    productApi.getCategories(shopId),
  ]);
  return { products, categories };
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (product: Omit<Product, 'id'>) => productApi.createProduct(product)
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, updates }: { id: string; updates: Partial<Product> }) =>
    productApi.updateProduct(id, updates)
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string) => { await productApi.deleteProduct(id); return id; }
);

export const createCategory = createAsyncThunk(
  'products/createCategory',
  async (category: Omit<Category, 'id'>) => productApi.createCategory(category)
);

export const deleteCategory = createAsyncThunk(
  'products/deleteCategory',
  async (id: string) => { await productApi.deleteCategory(id); return id; }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = [...state.categories, action.payload];
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      });
  },
});

export default productSlice.reducer;