import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { checkAuth, checkLoggedInUser, createUser, signOut } from './authApi'
import { updateUser } from '../User/userApi'

const initialState = {
    loggedInUserToken:null,
    status:'idle',
    userChecked:false
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
      return response
    }
  )

  export const checkAuthAsync=createAsyncThunk(
    'user/checkAuth',
    async()=>{
      const response =await checkAuth()
      return response
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
        state.loggedInUserToken=action.payload
      })
      builder.addCase(checkLoggedInUserAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(checkLoggedInUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUserToken=action.payload
      })
      .addCase(checkLoggedInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      builder.addCase(checkAuthAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(checkAuthAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUserToken=action.payload
        state.userChecked=true
      })
      // eslint-disable-next-line no-unused-vars
      builder.addCase(checkAuthAsync.rejected,(state,action)=>{
        state.status='idle';
        state.loggedInUserToken=action.payload
        state.userChecked=true
      })
     
      builder.addCase(updateUserAsync.pending,(state)=>{
        state.status='loading';
      })
      builder.addCase(updateUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUserToken=action.payload
      })
      builder.addCase(signOutAsync.pending,(state)=>{
        state.status='loading';
      })
      builder.addCase(signOutAsync.fulfilled,(state)=>{
        state.status='idle';
        state.loggedInUserToken=null
      })
      
    }
})

export const selectLoggedInUser=(state)=>{
    return state.auth.loggedInUserToken
}
export const selectUserChecked=(state)=>{
    return state.auth.userChecked
}

export const selectError = (state)=>state.auth.error;

  export default userSlice.reducer