import { createSlice } from "@reduxjs/toolkit";
import { storeProduct } from "../../type";

interface NextState {
  productData: storeProduct[];
  favoriteData: storeProduct[];
  allProducts: storeProduct[];
  userInfo: null | string;
}
const initialState: NextState = {
  productData: [],
  favoriteData: [],
  allProducts: [],
  userInfo: null,
};

export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: storeProduct) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantaty += action.payload.quantaty;
      } else {
        state.productData.push(action.payload);
      }
    },
    addToFavorite: (state, action) => {
      const existingProduct = state.favoriteData.find(
        (item: storeProduct) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantaty += action.payload.quantaty;
      } else {
        state.favoriteData.push(action.payload);
      }
    },
    incressQuantaty: (state, action) => {
      const existingProduct = state.productData.find(
        (item: storeProduct) => item._id === action.payload._id
      );
      existingProduct && existingProduct.quantaty++;
    },
    decressQuantaty: (state, action) => {
      const existingProduct = state.productData.find(
        (item: storeProduct) => item._id === action.payload._id
      );
      if (existingProduct?.quantaty === 1) {
        existingProduct.quantaty = 1;
      } else {
        existingProduct!.quantaty--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts:(state,action)=>{
        state.allProducts=action.payload
    }
  },
});

export const {
  addToCart,
  addToFavorite,
  incressQuantaty,
  decressQuantaty,
  deleteProduct,
  resetCart,
  addUser,
  removeUser,
  setAllProducts,
} = nextSlice.actions;
export default nextSlice.reducer;
