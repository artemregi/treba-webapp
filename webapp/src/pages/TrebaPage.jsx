import { useState } from 'react';
import StepHeader from '../components/StepHeader';
import StepProgress from '../components/StepProgress';
import ChurchList from '../components/ChurchList';
import { trebaTypesHealth, trebaTypesRepose } from '../data/churches';
import { addToCart, useCart } from '../store/cartStore';

const STEPS = ['За кого', 'Треба', 'Имена', 'Храм'];

export default function TrebaPage({ onCartOpen }) {
  const { count } = useCart();
  const [step, setStep] = useState(0);
  const [forWhom, setForWhom] = useState('health'); // 'health' | 'repose'
  const [trebaType, setTrebaType] = useState(null);
  const [names, setNames] = useState('');
  const [church, setChurch] = useState(null);

  const types = forWhom === 'health' ? trebaTypesHealth : trebaTypesRepose;

  const [done, setDone] = useState(null);

  function handleAdd() {
    addToCart({ type: 'ТРЕБА', name: trebaType.name, church: church.name, names, price: trebaType.price });
    setDone({ name: trebaType.name, church: church.name, price: trebaType.price });
  }

  function reset() {
    setStep(0); setForWhom('health'); setTrebaType(null); setNames(''); setChurch(null); setDone(null);
  }

  if (done) {
    return (
      <div className="page">
        <StepHeader title="Православная Треба" subtitle="добавлено в корзину" cartCount={count} onCartClick={onCartOpen} />
        <div className="success-screen">
          <div className="success-icon">✓</div>
          <div className="success-title">Добавлено в корзину</div>
          <div className="success-card">
            <div className="success-card-type">Треба</div>
            <div className="success-card-name">{done.name}</div>
            <div className="success-card-church">{done.church}</div>
            <div className="success-card-price">{done.price} ₽</div>
          </div>
          <p className="success-hint">Вы можете добавить ещё требы, свечи или пожертвование — и оплатить всё одним платежом</p>
          <div className="success-buttons">
            <button className="btn-secondary" onClick={reset}>+ Добавить ещё</button>
            <button className="btn-next" onClick={onCartOpen}>🛒 Корзина · {count}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <StepHeader
        title="Православная Треба"
        subtitle={`Шаг ${step + 1} из ${STEPS.length} — ${STEPS[step]}`}
        cartCount={count}
        onCartClick={onCartOpen}
      />
      <StepProgress steps={STEPS} current={step} />

      <div className="page-content">
        {step === 0 && (
          <>
            <h2>За кого подать требу?</h2>
            <div className="toggle-row">
              <button
                className={`toggle-btn ${forWhom === 'health' ? 'active-health' : ''}`}
                onClick={() => setForWhom('health')}
              >
                ❤️ О здравии
              </button>
              <button
                className={`toggle-btn ${forWhom === 'repose' ? 'active-repose' : ''}`}
                onClick={() => setForWhom('repose')}
              >
                🕯 За упокой
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className={`for-whom-badge ${forWhom === 'health' ? 'badge-health' : 'badge-repose'}`}>
              {forWhom === 'health' ? '❤️ О здравии' : '🕯 За упокой'}
            </div>
            <h2>Вид требы</h2>
            <div className="list">
              {types.map(t => (
                <div
                  key={t.id}
                  className={`list-item ${trebaType?.id === t.id ? 'selected' : ''}`}
                  onClick={() => setTrebaType(t)}
                >
                  <div className="list-item-info">
                    <div className="list-item-name">{t.name}</div>
                    <div className="list-item-sub">{t.desc}</div>
                  </div>
                  <span className="list-item-price">от {t.price} ₽</span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Имена для поминовения</h2>
            <p className="hint">Церковное имя в родительном падеже: Николая, Марии</p>
            <textarea
              className="text-input textarea"
              placeholder="Например: Николая, Марии, Иоанна..."
              value={names}
              onChange={e => setNames(e.target.value)}
              rows={4}
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2>Выберите храм</h2>
            <ChurchList selected={church} onSelect={setChurch} />
          </>
        )}
      </div>

      <div className="nav-buttons">
        {step > 0 && (
          <button className="btn-back" onClick={() => setStep(s => s - 1)}>← Назад</button>
        )}
        {step < 3 ? (
          <button
            className="btn-next"
            disabled={step === 1 && !trebaType}
            onClick={() => setStep(s => s + 1)}
          >
            Далее →
          </button>
        ) : (
          <button className="btn-next" disabled={!church} onClick={handleAdd}>+ В корзину</button>
        )}
      </div>
    </div>
  );
}
