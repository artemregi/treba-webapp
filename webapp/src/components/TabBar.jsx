import { useCart } from '../store/cartStore';

const tabs = [
  { id: 'donate', label: 'Пожертвовать', icon: '🕯️' },
  { id: 'treba', label: 'Треба', icon: '🌿' },
  { id: 'candle', label: 'Свеча', icon: '🕯' },
  { id: 'orders', label: 'Заказы', icon: '📋' },
  { id: 'profile', label: 'Профиль', icon: '👤' },
];

export default function TabBar({ active, onChange }) {
  const { count } = useCart();

  return (
    <div className="tabbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-item ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
