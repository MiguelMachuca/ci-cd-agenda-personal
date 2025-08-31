import { render, screen } from '@testing-library/react';
import App from './App';

// Mock para react-chartjs-2 para evitar errores en los tests
jest.mock('react-chartjs-2', () => ({
  Doughnut: () => <div data-testid="chart-mock">Chart Mock</div>,
}));

// Mock para el contexto de contactos
jest.mock('./context/ContactContext', () => ({
  useContacts: () => ({
    state: {
      contacts: [],
      stats: {
        totalContactos: 15,
        totalFavoritos: 3,
        contactosPorCategoria: { Familia: 5, Trabajo: 7, Amigos: 3 }
      }
    },
    actions: {
      loadContacts: jest.fn(),
      loadStats: jest.fn()
    }
  }),
  ContactProvider: ({ children }) => <>{children}</>
}));

test('renders navbar with app title', () => {
  render(<App />);
  
  // Usar data-testid en lugar de texto para evitar conflictos
  const navbarTitle = screen.getByTestId('navbar-title');
  expect(navbarTitle).toBeInTheDocument();
  expect(navbarTitle).toHaveTextContent('📱 Agenda Personal - InfraDockers');
});

test('renders navigation buttons', () => {
  render(<App />);
  
  // Verificar que los botones principales estén presentes
  expect(screen.getByTestId('home-button')).toBeInTheDocument();
  expect(screen.getByTestId('contacts-button')).toBeInTheDocument();
  expect(screen.getByTestId('new-contact-button')).toBeInTheDocument();
  expect(screen.getByTestId('favorites-button')).toBeInTheDocument();
  expect(screen.getByTestId('categories-button')).toBeInTheDocument();
  expect(screen.getByTestId('statistics-button')).toBeInTheDocument();
});

test('renders welcome message on home page', () => {
  render(<App />);
  
  // Verificar el mensaje de bienvenida usando data-testid
  const welcomeTitle = screen.getByTestId('welcome-title');
  expect(welcomeTitle).toBeInTheDocument();
  expect(welcomeTitle).toHaveTextContent('Bienvenido a tu Agenda Personal');
});

test('renders action buttons on home page', () => {
  render(<App />);
  
  // Verificar botones de acción en la página de inicio
  expect(screen.getByTestId('new-contact-btn')).toHaveTextContent('Nuevo contacto');
  expect(screen.getByTestId('view-contacts-btn')).toHaveTextContent('Ver contactos');
});

test('renders complete navbar', () => {
  render(<App />);
  
  const navbar = screen.getByTestId('navbar');
  expect(navbar).toBeInTheDocument();
});

// Test adicional para verificar que la página principal se renderiza
test('renders home page content', () => {
  render(<App />);
  
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
  expect(screen.getByTestId('stats-cards')).toBeInTheDocument();
});