import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BuyState{
    discountPrice:number,
}

const initialState:BuyState = {
    discountPrice:0,
}

export const buySlice = createSlice({
    name:"buy",
    initialState,

    reducers:{
        setDiscountPrice:(state, action:PayloadAction<number>)=>{
            state.discountPrice = action.payload;
        },
    }
})

export const {setDiscountPrice} = buySlice.actions;
export default buySlice.reducer;