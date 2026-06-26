export default function StepHeader({ title, subtitle, cartCount, onCartClick }) {
  return (
    <div className="step-header">
      <div className="step-header-left">
        <span className="step-cross">✝</span>
        <div>
          <div className="step-title">{title}</div>
          <div className="step-subtitle">{subtitle}</div>
        </div>
      </div>
      {cartCount > 0 && (
        <button className="cart-badge" onClick={onCartClick}>
          🛒 <span>{cartCount}</span>
        </button>
      )}
    </div>
  );
}
