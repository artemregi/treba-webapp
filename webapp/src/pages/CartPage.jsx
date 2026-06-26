import { useState } from 'react';
import { useCart, removeFromCart } from '../store/cartStore';

const PAYMENT_METHODS = [
  { id: 'card_ru', label: '💳 Карта РФ' },
  { id: 'card_foreign', label: '🌍 Иностр.' },
  { id: 'sbp', label: '📱 СБП' },
  { id: 'stripe', label: 'Stripe' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'yukassa', label: '🏦 ЮКасса' },
];

export default function CartPage({ onAddMore, onClose }) {
  const { items, total } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [payMethod, setPayMethod] = useState('card_ru');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="close-btn" onClick={onClose}>✕</button>
          <span className="header-title">Корзина</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Корзина пуста</h3>
          <p>Добавьте требу, свечу или пожертвование</p>
          <button className="btn-next" onClick={onClose}>Добавить</button>
        </div>
      </div>
    );
  }

  if (checkout) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="close-btn" onClick={() => setCheckout(false)}>← Назад</button>
          <span className="header-title">Оформление заказа</span>
        </div>
        <div className="page-content">
          <div className="cart-card">
            <div className="cart-section-title">📋 Состав заказа</div>
            {items.map(item => (
              <div key={item.cartId} className="checkout-row">
                <span>{item.name}</span>
                <span>{item.price} ₽</span>
              </div>
            ))}
            <div className="checkout-row total-row">
              <strong>Итого</strong>
              <strong>{total} ₽</strong>
            </div>
          </div>

          <div className="cart-card">
            <div className="cart-section-title">💳 Способ оплаты</div>
            <div className="payment-grid">
              {PAYMENT_METHODS.map(m => (
                <button
                  key={m.id}
                  className={`pay-method-btn ${payMethod === m.id ? 'selected' : ''}`}
                  onClick={() => setPayMethod(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {(payMethod === 'card_ru' || payMethod === 'card_foreign') && (
              <div className="card-fields">
                <input
                  className="text-input"
                  placeholder="0000 0000 0000 0000"
                  value={cardNum}
                  maxLength={19}
                  onChange={e => setCardNum(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                />
                <div className="card-row">
                  <input className="text-input" placeholder="ММ / ГГ" value={expiry} onChange={e => setExpiry(e.target.value)} />
                  <input className="text-input" placeholder="CVV" value={cvv} maxLength={3} onChange={e => setCvv(e.target.value)} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="nav-buttons single">
          <button className="btn-next" onClick={() => alert('Оплата в разработке')}>
            Оплатить {total} ₽
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <button className="close-btn" onClick={onClose}>← Назад</button>
        <span className="header-title">Корзина</span>
        <span className="cart-count-badge">{items.length}</span>
      </div>
      <div className="page-content">
        <h2>Корзина</h2>
        <p className="hint">{items.length} {items.length === 1 ? 'позиция' : 'позиции'}</p>

        {items.map(item => (
          <div key={item.cartId} className="cart-card cart-item-card">
            <div className="cart-item-type">{item.type}</div>
            <div className="cart-item-row">
              <div>
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-sub">{item.church}{item.names ? ` · ${item.names}` : ''}</div>
              </div>
              <div className="cart-item-right">
                <span className="cart-item-price">{item.price} ₽</span>
                <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>✕</button>
              </div>
            </div>
          </div>
        ))}

        <button className="add-more-btn" onClick={() => { onClose(); setTimeout(() => onAddMore('treba'), 50); }}>+ Добавить требу</button>
        <button className="add-more-btn" onClick={() => { onClose(); setTimeout(() => onAddMore('candle'), 50); }}>+ Добавить свечу</button>
        <button className="add-more-btn" onClick={() => { onClose(); setTimeout(() => onAddMore('donate'), 50); }}>+ Добавить пожертвование</button>

        <div className="cart-card total-card">
          <span>Итого</span>
          <strong>{total} ₽</strong>
        </div>
      </div>
      <div className="nav-buttons single">
        <button className="btn-next" onClick={() => setCheckout(true)}>К оплате →</button>
      </div>
    </div>
  );
}
