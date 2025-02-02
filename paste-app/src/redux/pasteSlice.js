import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes: localStorage.getItem("pastes") //value name iis pastes

    //local storage mei agr data pada hoga toh lelenge
    ?JSON.parse(localStorage.getItem("pastes"))
    : [] //nahi toh khali array pakda denege
}

export const pasteSlice = createSlice({
  name: 'paste', //name
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      //add a check -> paste already exist vala case
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully")
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully");
      }
    },
    resetsAllPastes: (state, action) => {
      state.pastes = []; // ✅ Fix: Resetting pastes array
      localStorage.removeItem("pastes"); // ✅ Fix: Clear localStorage
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id=== pasteId);
      if(index >= 0){
        state.pastes.splice(index, 1);
      }
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Removed Successfully");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetsAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer