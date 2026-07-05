import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../../type";

interface ReviewsState {
  reviews: Review[];
}

const initialState: ReviewsState = {
  reviews: [],
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
