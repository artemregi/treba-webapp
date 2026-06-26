import { useCart } from '../store/cartStore';

export default function OrdersPage() {
  return (
    <div className="page">
      <div className="page-content">
        <h2>Мои заказы</h2>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Заказов пока нет</h3>
          <p>Оформите требу, пожертвование или постановку свечи — они появятся здесь</p>
        </div>
      </div>
    </div>
  );
}
