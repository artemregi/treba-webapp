import { useCart } from '../store/cartStore';

export default function ProfilePage() {
  const { count } = useCart();
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  const menuItems = [
    { icon: '✏️', label: 'Редактировать профиль', sub: 'Имя, email, телефон' },
    { icon: '📋', label: 'Мои заказы', sub: `${count} заказов` },
    { icon: '❓', label: 'Частые вопросы', sub: 'FAQ' },
    { icon: '🔒', label: 'Политика конфиденциальности', sub: '' },
    { icon: '💬', label: 'Поддержка', sub: 'Telegram @zakaz_treba_bot' },
  ];

  return (
    <div className="page">
      <div className="page-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.first_name?.[0] || '👤'}
          </div>
          <div className="profile-name">{user?.first_name || 'Пользователь'} {user?.last_name || ''}</div>
          {user?.username && <div className="profile-username">@{user.username}</div>}
        </div>

        <div className="profile-menu">
          {menuItems.map((item, i) => (
            <div key={i} className="profile-menu-item">
              <span className="profile-menu-icon">{item.icon}</span>
              <div className="profile-menu-text">
                <div className="profile-menu-label">{item.label}</div>
                {item.sub && <div className="profile-menu-sub">{item.sub}</div>}
              </div>
              <span className="profile-menu-arrow">›</span>
            </div>
          ))}
        </div>

        <div className="profile-footer">
          <span>✝ ✝ ✝</span>
          <p>© 2025 Православная Треба · pravtreba.ru</p>
        </div>
      </div>
    </div>
  );
}
