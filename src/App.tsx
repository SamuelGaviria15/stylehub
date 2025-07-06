import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/shared/Header';
import { Cart } from './components/cart/Cart';
import { ProductsShowcase } from './pages/ProductsShowcase';
import { CartProvider } from './hooks/CartContext';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <Cart />
            <ProductsShowcase />
          </CartProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
