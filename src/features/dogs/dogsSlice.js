/* eslint-disable  no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.headers.get['x-apy-key'] = '4aba53a3-51c3-4af7-9941-8321ab92ac07';

export const getDogs = createAsyncThunk('dogs/getDogs', async (page = 0) => {
  const uri = `https://api.thedogapi.com/v1/images/search?api_key=4aba53a3-51c3-4af7-9941-8321ab92ac07&limit=100&order=ASC&page=${page}`;
  const response = await axios.get(uri);
  const dogs = response.data.filter(dog => dog.breeds.length !== 0 && dog.breeds[0].breed_group);

  return dogs;
});

export const getDog = createAsyncThunk('dogs/getDog', async id => {
  const response = await axios.get(`https://api.thedogapi.com/v1/images/${id}`);
  const dog = response.data;
  return dog;
});

export const getNextDogs = createAsyncThunk('dogs/getNextDogs', async () => {
  const uri = 'https://api.thedogapi.com/v1/images/search?limit=15';
  const response = await axios.get(uri);
  const dogs = response.data.filter(dog => dog.breeds.length !== 0 && dog.breeds[0].name);
  return dogs;
});

export const counterSlice = createSlice({
  name: 'dogs',
  initialState: {
    data: [],
    dog: {
      breeds: [{ weight: {}, height: {} }],
    },
    nextDogs: [
      {
        id: 1,
        breeds: [{ weight: {}, height: {} }],
      },
      {
        id: 2,
        breeds: [{ weight: {}, height: {} }],
      },
      {
        id: 3,
        breeds: [{ weight: {}, height: {} }],
      },
      {
        id: 4,
        breeds: [{ weight: {}, height: {} }],
      },
    ],
    currentPage: '0',
    filters: {},
    loaders: {},
    errors: {},
    success: {},
  },
  reducers: {
    changeBreedGroupFilter: (state, action) => {
      state.filters.breedGroupFilter = action.payload;
    },
    changeSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetDog: state => {
      state.dog = {
        breeds: [{ weight: {}, height: {} }],
      };
    },
  },
  extraReducers: {
    [getDogs.pending]: state => {
      state.loaders.loadingDogs = true;
      state.errors.loadingDogs = false;
      state.success.loadingDogs = false;
    },
    [getDogs.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.success.loadingDogs = true;
      state.loaders.loadingDogs = false;
      state.errors.loadingDogs = false;
    },
    [getDogs.rejected]: (state, action) => {
      state.errors.loadingDogs = action.error.message;
      state.loaders.loadingDogs = false;
      state.success.loadingDogs = false;
    },
    [getDog.pending]: state => {
      state.loaders.loadingDog = true;
      state.errors.loadingDog = false;
      state.success.loadingDog = false;
    },
    [getDog.fulfilled]: (state, action) => {
      state.dog = action.payload;
      state.success.loadingDog = true;
      state.loaders.loadingDog = false;
      state.errors.loadingDog = false;
    },
    [getDog.rejected]: (state, action) => {
      state.errors.loadingDog = action.error.message;
      state.loaders.loadingDog = false;
      state.success.loadingDog = false;
    },
    [getNextDogs.pending]: state => {
      state.loaders.loadingNextDogs = true;
      state.errors.loadingNextDogs = false;
      state.success.loadingNextDogs = false;
    },
    [getNextDogs.fulfilled]: (state, action) => {
      state.nextDogs = action.payload;
      state.success.loadingNextDogs = true;
      state.loaders.loadingNextDogs = false;
      state.errors.loadingNextDogs = false;
    },
    [getNextDogs.rejected]: (state, action) => {
      state.errors.loadingNextDogs = action.error.message;
      state.loaders.loadingNextDogs = false;
      state.success.loadingNextDogs = false;
    },
  },
});

export const {
  changeBreedGroupFilter,
  changeSearchFilter,
  setCurrentPage,
  resetDog,
} = counterSlice.actions;

export default counterSlice.reducer;
