import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../app/store';
import App from '../../App';

describe('Contact page', () => {
  afterEach(() => {
    cleanup();
  });
  test('has a contact me section', async () => {
    const history = createMemoryHistory();
    history.push('/contact');

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(getByText('Contact me')).toBeTruthy();
  });
});
