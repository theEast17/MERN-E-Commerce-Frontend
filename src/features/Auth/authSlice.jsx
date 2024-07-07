import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { checkLoggedInUser, createUser, signOut } from './authApi'
import { updateUser } from '../User/userApi'

const initialState = {
    loggedInUser:null,
    status:'idle'
  }

  export const createUserAsync=createAsyncThunk(
    'user/createUser',
    async(data)=>{
      const response =await createUser(data)
      return response
    }
  )
  export const updateUserAsync=createAsyncThunk(
    'user/updateUser',
    async(user)=>{
      const response =await updateUser(user)
      return response
    }
  )

  export const checkLoggedInUserAsync=createAsyncThunk(
    'user/checkLoggedInUser',
    async(data)=>{
      const response =await checkLoggedInUser(data)
      return response.data
    }
  )
  export const signOutAsync=createAsyncThunk(
    'user/signOut',
    async(userId)=>{
      const response =await signOut(userId)
      return response.data
    }
  )

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers:(builder)=>{
      builder.addCase(createUserAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(createUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUser=action.payload
      })
      builder.addCase(checkLoggedInUserAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(checkLoggedInUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUser=action.payload
      })
      .addCase(checkLoggedInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      builder.addCase(updateUserAsync.pending,(state)=>{
        state.status='loading';
      })
      builder.addCase(updateUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUser=action.payload
      })
      builder.addCase(signOutAsync.pending,(state)=>{
        state.status='loading';
      })
      builder.addCase(signOutAsync.fulfilled,(state)=>{
        state.status='idle';
        state.loggedInUser=null
      })
      
    }
})

export const selectLoggedInUser=(state)=>{
    return state.auth.loggedInUser
}

export const selectError = (state)=>state.auth.error;

  export default userSlice.reducer