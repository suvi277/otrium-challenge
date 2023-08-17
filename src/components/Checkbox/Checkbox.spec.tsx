import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
  it('renders without crashing', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('handles checking and unchecking', () => {
    const onChange = jest.fn();

    render(<Checkbox checked={false} onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  it('displays label if provided', () => {
    render(<Checkbox label="My Checkbox" checked={false} onChange={() => {}} />);

    expect(screen.getByText('My Checkbox')).toBeInTheDocument();
  });

  it('handles label click if labelClickable is true', () => {
    const onLabelClick = jest.fn();

    render(<Checkbox label="My Checkbox" labelClickable={true} checked={false} onChange={() => {}} onLabelClick={onLabelClick} />);

    fireEvent.click(screen.getByText('My Checkbox'));

    expect(onLabelClick).toHaveBeenCalled();
  });

  it('reflects the checked state correctly', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });
});
