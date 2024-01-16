import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product", //could the problem be here?
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },
    incrementQty: (state, action) => {
      console.log(
        "Inside incrementQty reducer. Product state before:",
        state.product
      );
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.Quantity++;
      console.log(
        "Inside incrementQty reducer. Product state after:",
        state.product
      );
    },
    decrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.Quantity == 1) {
        itemPresent.Quantity = 0;
        const removeItem = state.product.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else {
        itemPresent.Quantity--;
      }
    },
  },
});

export const { getProducts, incrementQty, decrementQty } = productSlice.actions;

export default productSlice.reducer;
