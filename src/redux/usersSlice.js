import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  users: [],
  isLoading: false
}

const getUsers = createAsyncThunk('users/getUsers', () => {
  return axios.get('http://localhost:4000/users')
      .then(response => response.data)
})

const addUser = createAsyncThunk('users/addUser', (object) => {
  return axios.post('http://localhost:4000/users', object)
      .then(response => response.data)
})

const editUser = createAsyncThunk('users/editUser', (object) => {
  return axios.put(`http://localhost:4000/users/${object.id}`, object)
      .then(response => response.data)
})

const removeUser = createAsyncThunk('users/removeUser', (id) => {
  return axios.delete(`http://localhost:4000/users/${id}`)
      .then(response => {
          return {...response.data, itemId: id}
      })
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
    extraReducers: {
      [getUsers.pending]: (state) => {
          state.isLoading = true
      },
      [getUsers.fulfilled]: (state, action) => {
          state.users = action.payload
          state.isLoading = false
      },
      [getUsers.rejected]: (state) => {
          state.isLoading = false
      },
      [addUser.pending]: (state) => {
          state.isLoading = true
      },
      [addUser.fulfilled]: (state, action) => {
          state.users.push(action.payload)
          state.isLoading = false
      },
      [addUser.rejected]: (state) => {
          state.isLoading = false
      },
      [editUser.pending]: (state) => {
        state.isLoading = true
    },
      [editUser.fulfilled]: (state, action) => {
          const userIndex = state.users.indexOf(user => user.id === action.payload.id)
          state.users.splice(userIndex, 1, action.payload)
          state.isLoading = false
      },
      [editUser.rejected]: (state) => {
          state.isLoading = false
      },
      [removeUser.pending]: (state) => {
          state.isLoading = true
      },
      [removeUser.fulfilled]: (state, action) => {
          state.users = state.users.filter(item => item.id !== action.payload.itemId)
          state.isLoading = false
      },
      [removeUser.rejected]: (state) => {
          state.isLoading = false
      }
  }
})


export { getUsers, addUser, removeUser, editUser }
export default usersSlice.reducer