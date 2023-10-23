import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  favoriteProducts: [],
  allProducts: [],
  userInfo: null,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cartProducts.push(action.payload);
      }
    },
  },
});

export const { addToCartAction } = itemsSlice.actions;
const itemsSliceReducer = itemsSlice.reducer;
export default itemsSliceReducer;
