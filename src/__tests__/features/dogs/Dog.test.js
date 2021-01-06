import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../../app/store';
import App from '../../../App';

describe('Dog show page', () => {
  afterEach(() => {
    cleanup();
  });
  test('has an initial text `Loading dog` and `Loading next dogs` because of the API requests', async () => {
    const history = createMemoryHistory();
    history.push('/rkVB1x9E7');

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(getByText('Loading dog...')).toBeTruthy();
    expect(getByText('Loading next dogs')).toBeTruthy();
  });

  test('has an heading `dog super powers` and `other random dogs` after the API fetch', async () => {
    const history = createMemoryHistory();
    history.push('/rkVB1x9E7');

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    const dogHeading = await screen.findByText(/dog super powers/i);
    const nextDogsHeading = await screen.findByText(/other random dogs/i);
    expect(dogHeading).toBeTruthy();
    expect(nextDogsHeading).toBeTruthy();
  });
});
