import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Save to localStorage
const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartState));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) ?? [],
  reducers: {
    addToCart: (state, action) => {
      const updated = [...state, action.payload];
      saveCartToStorage(updated);
      return updated;
    },
    deleteFromCart: (state, action) => {
      const updated = state.filter((item) => item.id !== action.payload.id);
      saveCartToStorage(updated);
      return updated;
    },
    clearCart: () => {
      saveCartToStorage([]);
      return [];
    },
  },
});

export const { deleteFromCart, clearCart } = cartSlice.actions;
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
