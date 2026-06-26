import { useState } from 'react';
import StepHeader from '../components/StepHeader';
import StepProgress from '../components/StepProgress';
import ChurchList from '../components/ChurchList';
import { candleTypes } from '../data/churches';
import { addToCart, useCart } from '../store/cartStore';

const STEPS = ['Вид свечи', 'Храм', 'Пожелания'];

export default function CandlePage({ onCartOpen }) {
  const { count } = useCart();
  const [step, setStep] = useState(0);
  const [candleType, setCandleType] = useState(null);
  const [church, setChurch] = useState(null);
  const [names, setNames] = useState('');
  const [iconWish, setIconWish] = useState('');

  function handleAdd() {
    addToCart({
      type: 'СВЕЧА',
      name: candleType.name,
      church: church.name,
      names,
      price: candleType.price,
    });
    setStep(0); setCandleType(null); setChurch(null); setNames(''); setIconWish('');
    onCartOpen();
  }

  return (
    <div className="page page-candle">
      <StepHeader
        title="Православная Треба"
        subtitle={`Шаг ${step + 1} из ${STEPS.length} — ${STEPS[step]}`}
        cartCount={count}
        onCartClick={onCartOpen}
      />
      <StepProgress steps={STEPS} current={step} accent="gold" />

      <div className="page-content">
        {step === 0 && (
          <>
            <h2>Поставить свечу</h2>
            <p className="hint">Служащий поставит и пришлёт фото или видео</p>
            <div className="list candle-list">
              {candleTypes.map(c => (
                <div
                  key={c.id}
                  className={`list-item candle-item ${candleType?.id === c.id ? 'selected-candle' : ''}`}
                  onClick={() => setCandleType(c)}
                >
                  <div className="list-item-info">
                    <div className="list-item-name">{c.name}</div>
                    <div className="list-item-sub">{c.desc}</div>
                  </div>
                  <div className="candle-price-block">
                    <span className="candle-price">{c.price} ₽</span>
                    {candleType?.id === c.id && <span className="check">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>Выберите храм</h2>
            <ChurchList selected={church} onSelect={setChurch} />
          </>
        )}

        {step === 2 && (
          <>
            <h2>Ваши пожелания</h2>
            <label className="field-label">ИМЕНА ДЛЯ ПОМИНОВЕНИЯ *</label>
            <input
              className="text-input"
              placeholder="За здравие Анастасии"
              value={names}
              onChange={e => setNames(e.target.value)}
            />
            <label className="field-label">ПОЖЕЛАНИЯ ПО ИКОНЕ</label>
            <input
              className="text-input"
              placeholder="Например: икона Николая Чудотворца"
              value={iconWish}
              onChange={e => setIconWish(e.target.value)}
            />
            <p className="hint-small">После постановки свечи вы получите фото или видео</p>
          </>
        )}
      </div>

      <div className="nav-buttons">
        {step > 0 && (
          <button className="btn-back" onClick={() => setStep(s => s - 1)}>← Назад</button>
        )}
        {step < 2 ? (
          <button
            className="btn-next btn-gold"
            disabled={step === 0 && !candleType}
            onClick={() => setStep(s => s + 1)}
          >
            Далее →
          </button>
        ) : (
          <button
            className="btn-next btn-gold"
            disabled={!names.trim()}
            onClick={handleAdd}
          >
            + В корзину
          </button>
        )}
      </div>
    </div>
  );
}
