import { useCart } from '../store/cartStore';

const menuItems = [
  { icon: '✏', label: 'Редактировать профиль', sub: 'Имя, email, телефон', color: '#4a7cb5' },
  { icon: '📋', label: 'Мои заказы', sub: null, color: '#6a5acd' },
  { icon: '❓', label: 'Частые вопросы', sub: 'FAQ', color: '#c9a84c' },
  { icon: '🔒', label: 'Политика конфиденциальности', sub: null, color: '#888' },
  { icon: '💬', label: 'Поддержка', sub: '@zakaz_treba_bot', color: '#29a884' },
];

export default function ProfilePage() {
  const { count } = useCart();
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;
  const initials = user?.first_name ? user.first_name[0].toUpperCase() : '?';
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'Пользователь';

  return (
    <div className="page">
      <div className="page-content">

        {/* User card */}
        <div className="prf-card">
          <div className="prf-avatar">{initials}</div>
          <div className="prf-info">
            <div className="prf-name">{fullName}</div>
            {user?.username
              ? <div className="prf-handle">@{user.username}</div>
              : <div className="prf-handle">Telegram пользователь</div>
            }
          </div>
          <div className="prf-orders-badge">
            <span className="prf-orders-num">{count}</span>
            <span className="prf-orders-label">заказов</span>
          </div>
        </div>

        {/* Menu */}
        <div className="prf-menu">
          {menuItems.map((item, i) => (
            <button key={i} className="prf-row">
              <span className="prf-row-icon" style={{ background: item.color + '18', color: item.color }}>
                {item.icon}
              </span>
              <div className="prf-row-text">
                <span className="prf-row-label">{item.label}</span>
                {item.sub && <span className="prf-row-sub">{item.sub}</span>}
              </div>
              <span className="prf-row-arrow">›</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="prf-footer">
          <span className="prf-footer-cross">✝ ✝ ✝</span>
          <span>© 2025 Православная Треба · pravtreba.ru</span>
        </div>

      </div>
    </div>
  );
}
