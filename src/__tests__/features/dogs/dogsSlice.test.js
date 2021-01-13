import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../../app/store';
import App from '../../../App';
import {
  getDogs,
  getDog,
  getNextDogs,
  changeBreedGroupFilter,
  changeSearchFilter,
  resetDog,
  setCurrentPage,
} from '../../../features/dogs/dogsSlice';

afterEach(() => {
  cleanup();
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
describe('dogsSlice async actions and initial state', () => {
  test('has no dogs in the data array in initial fase', () => {
    const { data: dogs } = store.getState().dogs;
    expect(dogs.length).toStrictEqual(0);
    // expect(Container).toBeFalsy();
  });

  test('getDogs fetches the Dogs from the API and populates the state data array', async () => {
    await store.dispatch(getDogs());
    const { data: dogs } = store.getState().dogs;
    expect(dogs.length).not.toStrictEqual(0);
  }, 30000);

  test('has a default empty dog object array in the initial fase', () => {
    const defaultEmptyDog = {
      breeds: [{ weight: {}, height: {} }],
    };
    const { dog } = store.getState().dogs;
    expect(dog).toStrictEqual(defaultEmptyDog);
  });

  test('getDog fetches a Dog from the API by the ID received as a parameter and populates the state dog object', async () => {
    const id = 'rkVB1x9E7';
    await store.dispatch(getDog(id));
    const { dog } = store.getState().dogs;
    expect(dog.id).toStrictEqual(id);
  }, 30000);

  test('has a default array nextDogs with empty dog objects', () => {
    const defaultEmptyNextDogs = [
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
    ];
    const { nextDogs } = store.getState().dogs;
    expect(nextDogs).toStrictEqual(defaultEmptyNextDogs);
  });

  test('getNextDogs fetches at least 4 dogs from the API and populates the nextDogs array', async () => {
    await store.dispatch(getNextDogs());
    const { nextDogs } = store.getState().dogs;
    expect(nextDogs.length).toBeGreaterThan(4);
    expect(nextDogs[0].id).toBeDefined();
  }, 30000);
});

describe('dogsSlice actions', () => {
  test('should have an empty filters object as default', () => {
    const { filters } = store.getState().dogs;
    expect(filters).toStrictEqual({});
  });

  test('should have changeBreedGroupFilter action that creates a breedGroupFilter proprety in the filters object of the state', () => {
    store.dispatch(changeBreedGroupFilter('warrior'));
    const { filters } = store.getState().dogs;

    expect(filters.breedGroupFilter).toBeDefined();
    expect(filters.breedGroupFilter).toStrictEqual('warrior');
  });

  test('should have changeSearchFilter action that creates a search proprety in the filters object of the state', () => {
    store.dispatch(changeSearchFilter('query'));
    const { filters } = store.getState().dogs;

    expect(filters.search).toBeDefined();
    expect(filters.search).toStrictEqual('query');
  });

  test('should have the default currentPage string proprety set to `0` in the state ', async () => {
    const { currentPage } = store.getState().dogs;

    expect(currentPage).toBeDefined();
    expect(currentPage).toStrictEqual('0');
  });

  test('should have a setCurrentPage action that sets the currentPage proprety in the state to the received parameter', () => {
    store.dispatch(setCurrentPage('5'));
    const { currentPage } = store.getState().dogs;

    expect(currentPage).toBeDefined();
    expect(currentPage).toStrictEqual('5');
  });

  test('should have a resetDog action that sets the dog proprety in the state toa default object', async () => {
    const id = 'rkVB1x9E7';
    await store.dispatch(getDog(id));
    const { dog } = store.getState().dogs;
    expect(dog.id).toStrictEqual(id);

    const defaultEmptyDog = {
      breeds: [{ weight: {}, height: {} }],
    };

    store.dispatch(resetDog());
    const { dog: emptyDogAfterReset } = store.getState().dogs;

    expect(emptyDogAfterReset).toBeDefined();
    expect(emptyDogAfterReset).toStrictEqual(defaultEmptyDog);
  }, 30000);
});
