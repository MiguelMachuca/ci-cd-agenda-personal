import { render, screen } from '@testing-library/react';
import App from './App';

test('renders agenda personal app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Agenda Personal/i);
  expect(linkElement).toBeInTheDocument();
});
