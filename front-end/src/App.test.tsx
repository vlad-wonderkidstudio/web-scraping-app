import { render, screen } from '@testing-library/react';
import App from './App';
import { ReactPortal } from 'react';

jest.mock('@chakra-ui/react', () => {
  return {
    ChakraProvider: ({ children }: { children: ReactPortal;}) => <div>{children}</div>,
    Box: () => <div>Hello World</div>,
  };
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
