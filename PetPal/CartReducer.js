import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.Quantity++;
      } else {
        state.cart.push({ ...action.payload, Quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
      console.log(
        "Inside incrementQuantity reducer. Cart state before:",
        state.cart
      );
      console.log("Action payload:", action.payload);
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      console.log("itemPresent:", itemPresent);

      if (itemPresent) {
        itemPresent.Quantity++;
      }

      console.log(
        "Inside incrementQuantity reducer. Cart state after:",
        state.cart
      );
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.Quantity == 1) {
        itemPresent.Quantity = 0;
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else {
        itemPresent.Quantity--;
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;
