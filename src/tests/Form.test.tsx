import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Form from '../components/modalAddPath/components/Form';
import { describe, it, expect, vi } from 'vitest';

const mockStore = configureStore([]);
const store = mockStore({
  routes: [],
});

describe('Form Component', () => {
  it('renders the form fields', () => {
    render(
      <Provider store={store}>
        <Form handleClose={vi.fn()} />
      </Provider>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Short description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full description/i)).toBeInTheDocument();
  });

  it('handles form submission', () => {
    render(
      <Provider store={store}>
        <Form handleClose={vi.fn()} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Short description/i), { target: { value: 'Test Short Description' } });
    fireEvent.change(screen.getByLabelText(/Full description/i), { target: { value: 'Test Full Description' } });

    fireEvent.click(screen.getByText(/Add/i));
  });
});