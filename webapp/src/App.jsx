import { useState, useEffect } from 'react';
import TabBar from './components/TabBar';
import DonatePage from './pages/DonatePage';
import TrebaPage from './pages/TrebaPage';
import CandlePage from './pages/CandlePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import { useCart } from './store/cartStore';
import './index.css';

export default function App() {
  const [tab, setTab] = useState('donate');
  const [showCart, setShowCart] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); }
  }, []);

  if (showCart) {
    return (
      <CartPage
        onClose={() => setShowCart(false)}
        onAddMore={(t) => { setShowCart(false); setTab(t); }}
      />
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-header-left">
          <span className="app-cross">✝</span>
          <span className="app-title">Православная Треба</span>
        </div>
        {count > 0 && (
          <button className="cart-badge-header" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-badge-num">{count}</span>
          </button>
        )}
      </div>

      <div className="tab-content">
        {tab === 'donate' && <DonatePage onCartOpen={() => setShowCart(true)} />}
        {tab === 'treba' && <TrebaPage onCartOpen={() => setShowCart(true)} />}
        {tab === 'candle' && <CandlePage onCartOpen={() => setShowCart(true)} />}
        {tab === 'orders' && <OrdersPage />}
        {tab === 'profile' && <ProfilePage />}
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}
