import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalName: '', // Added to track which modal is open
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalName = action.payload; // Set modal name based on payload
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalName = ''; // Clear modal name when closed
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
