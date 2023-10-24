import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  allCartProducts: 0,
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
        state.allCartProducts++;
      } else {
        state.cartProducts.push(action.payload);
        state.allCartProducts++;
      }
    },
    addToFavoriteAction: (state, action) => {
      const favoriteItemID = action.payload._id;
      const existingProduct = state.favoriteProducts.find(
        (item) => item._id === favoriteItemID
      );
      if (existingProduct) {
        state.favoriteProducts = state.favoriteProducts.filter(
          (item) => item._id !== favoriteItemID
        );
      } else {
        state.favoriteProducts.push(action.payload);
      }
    },
  },
});

export const { addToCartAction, addToFavoriteAction } = itemsSlice.actions;
const itemsSliceReducer = itemsSlice.reducer;
export default itemsSliceReducer;
