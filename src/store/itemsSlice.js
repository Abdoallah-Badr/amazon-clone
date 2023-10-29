import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  allCartProducts: 0,
  totalCartPrice: 0,
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
    inCreaseQuantity: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (item) => item._id === action.payload._id
      );
      existingProduct.quantity += 1;
      state.allCartProducts++;
    },
    deCreaseQuantity: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct.quantity === 1) {
        state.cartProducts = state.cartProducts.filter(
          (item) => item._id !== action.payload._id
        );
        state.allCartProducts--;
      } else {
        existingProduct.quantity -= 1;
        state.allCartProducts--;
      }
    },
    removeCartProduct: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (item) => item._id === action.payload._id
      );
      state.cartProducts = state.cartProducts.filter(
        (item) => item._id !== action.payload._id
      );
      state.allCartProducts -= existingProduct.quantity;
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state, action) => {
      state.userInfo = null;
    },
    resetCart: (state, action) => {
      state.cartProducts = [];
      state.allCartProducts = 0;
      state.totalCartPrice = 0;
    },
    resetfavoriteList: (state, action) => {
      state.favoriteProducts = [];
    },
    setTotalPrice: (state) => {
      state.totalCartPrice = 0;
      state.cartProducts.forEach((item) => {
        const tolalForItem = item.quantity * item.price;
        state.totalCartPrice += tolalForItem;
      });
    },
  },
});

export const {
  addToCartAction,
  addToFavoriteAction,
  inCreaseQuantity,
  deCreaseQuantity,
  removeCartProduct,
  addUserInfo,
  removeUser,
  resetCart,
  resetfavoriteList,
  setTotalPrice,
} = itemsSlice.actions;
const itemsSliceReducer = itemsSlice.reducer;
export default itemsSliceReducer;
