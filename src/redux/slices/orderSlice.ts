import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { OrderState, Order, OrderStatus } from '../../types';
import { orderApi } from '../../services/mockApi';

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (shopId: string) => {
  return orderApi.getOrders(shopId);
});

export const fetchOrder = createAsyncThunk('orders/fetchOne', async (orderId: string) => {
  return orderApi.getOrder(orderId);
});

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    return orderApi.createOrder(orderData);
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
    return orderApi.updateOrderStatus(orderId, status);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    // fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch orders';
      });

    // fetchOrder
    builder
      .addCase(fetchOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Order not found';
      });

    // createOrder
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders = [action.payload, ...state.orders];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to place order';
      });

    // updateOrderStatus
    builder
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.orders = state.orders.map((o) => (o.id === updated.id ? updated : o));
        if (state.currentOrder?.id === updated.id) state.currentOrder = updated;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;