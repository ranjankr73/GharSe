import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ShopState, Shop } from '../../types';
import { shopApi } from '../../services/mockApi';

const initialState: ShopState = {
  shop: null,
  loading: false,
  error: null,
};

export const fetchShop = createAsyncThunk('shop/fetch', async (shopId: string) =>
  shopApi.getShop(shopId)
);

export const updateShop = createAsyncThunk('shop/update', async (updates: Partial<Shop>) =>
  shopApi.updateShop(updates)
);

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShop.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload;
      })
      .addCase(fetchShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load shop';
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.shop = action.payload;
      });
  },
});

export default shopSlice.reducer;