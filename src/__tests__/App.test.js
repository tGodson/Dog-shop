import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';

afterEach(() => {
  cleanup();
});

test('renders the home page with no errors', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );

  expect(getByText(/just dogs/i)).toBeInTheDocument();
});
