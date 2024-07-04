import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { addToCart, deleteCart, fetchItemByUserId, updateCart } from './cartApi'


const initialState = {
    items:[],
    status:'idle'
  }

  export const addToCartAsync=createAsyncThunk(
    'cart/addToCart',
    async(item)=>{
      const response =await addToCart(item)
      return response
    }
  )

  export const fetchItemByUserIdAsync=createAsyncThunk(
    'user/fetchItemByUserId',
    async(userId)=>{
      const response =await fetchItemByUserId(userId)
      return response
    }
  )

  export const updateCartAsync=createAsyncThunk(
    'user/updateCart',
    async(item)=>{
      const response =await updateCart(item)
      return response
    }
  )
  export const deleteCartAsync=createAsyncThunk(
    'user/deleteCart',
    async(id)=>{
      const response =await deleteCart(id)
      return response
    }
  )

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers:(builder)=>{
      builder.addCase(addToCartAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(addToCartAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.items.push(action.payload)
      })
      builder.addCase(fetchItemByUserIdAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(fetchItemByUserIdAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.items=(action.payload)
      })
      builder.addCase(updateCartAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(updateCartAsync.fulfilled,(state,action)=>{
        state.status='idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=(action.payload)
      })
      builder.addCase(deleteCartAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(deleteCartAsync.fulfilled,(state,action)=>{
        state.status='idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
    }
})

export const selectCartItem=(state)=>{
    return state.cart.items
  }
export default cartSlice.reducer