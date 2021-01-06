import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../app/store';
import App from '../../App';

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });
  test('has the brand name, home and contact links', async () => {
    const history = createMemoryHistory();
    history.push('/');

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(getByText('Just Dogs')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Contact')).toBeTruthy();
  });
});
