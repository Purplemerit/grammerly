import { render, screen } from '@/tests/utils/test-utils';
import { Input } from '@/components/base/Input';
import userEvent from '@testing-library/user-event';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" id="email" error="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input label="Email" id="email" helperText="Enter your email address" />);
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Email" id="email" />);
    
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'test@example.com');
    
    expect(input).toHaveValue('test@example.com');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input label="Email" id="email" disabled />);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });
});

