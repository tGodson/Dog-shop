import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../../app/store';
import App from '../../../App';

afterEach(() => {
  cleanup();
});

test('has an initial text `Loading dogs for page 1` when loading the dogs', async () => {
  const history = createMemoryHistory();
  history.push('/');

  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );

  expect(getByText('Loading dogs for page 1')).toBeTruthy();
});

test('has an heading `Dogs on page` after the API fetch', async () => {
  const history = createMemoryHistory();
  history.push('/');

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );

  const dogsHeading = await screen.findByText(/dogs on page/i);
  expect(dogsHeading).toBeTruthy();
});

test('has an filter section with the text `filter by` after the API fetch', async () => {
  const history = createMemoryHistory();
  history.push('/');

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );

  const filterHeading = await screen.findByText(/filter by/i);
  expect(filterHeading).toBeTruthy();
});
