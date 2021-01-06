import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../app/store';
import App from '../../App';

describe('Footer', () => {
  afterEach(() => {
    cleanup();
  });
  test('has the author name on the footer', async () => {
    const history = createMemoryHistory();
    history.push('/');

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(getByText('Cristian Ceamatu')).toBeTruthy();
  });
});
