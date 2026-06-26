import { useState } from 'react';
import StepHeader from '../components/StepHeader';
import StepProgress from '../components/StepProgress';
import ChurchList from '../components/ChurchList';
import { addToCart, useCart } from '../store/cartStore';

const STEPS = ['Храм', 'Сумма', 'Имена'];
const AMOUNTS = [100, 300, 500, 1000];

export default function DonatePage({ onCartOpen }) {
  const { count } = useCart();
  const [step, setStep] = useState(0);
  const [church, setChurch] = useState(null);
  const [amount, setAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [name, setName] = useState('');

  const finalAmount = customAmount ? Number(customAmount) : amount;

  function handleAdd() {
    addToCart({
      type: 'ПОЖЕРТВОВАНИЕ',
      name: 'Пожертвование',
      church: church.name,
      names: name,
      price: finalAmount,
    });
    setStep(0); setChurch(null); setAmount(300); setCustomAmount(''); setName('');
    onCartOpen();
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
            <h2>Выберите храм</h2>
            <p className="hint">Пожертвование поступит напрямую на счёт прихода</p>
            <ChurchList selected={church} onSelect={setChurch} />
          </>
        )}

        {step === 1 && (
          <>
            <h2>Сумма пожертвования</h2>
            <p className="hint">Храм: {church?.name}</p>
            <div className="amount-grid">
              {AMOUNTS.map(a => (
                <button
                  key={a}
                  className={`amount-btn ${!customAmount && amount === a ? 'selected' : ''}`}
                  onClick={() => { setAmount(a); setCustomAmount(''); }}
                >
                  {a} ₽
                </button>
              ))}
            </div>
            <input
              className="text-input"
              type="number"
              placeholder="Другая сумма, ₽"
              value={customAmount}
              onChange={e => setCustomAmount(e.target.value)}
            />
            <label className="checkbox-row">
              <input type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)} />
              <span>Жертвовать каждый месяц автоматически</span>
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Имя для поминовения</h2>
            <p className="hint">Необязательно — можно пропустить</p>
            <input
              className="text-input"
              placeholder="Например: раба Божия Мария"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <p className="hint-small">Церковное имя в родительном падеже: Николая, Марии</p>
            <blockquote className="scripture">
              «Истинно говорю вам, что эта бедная вдова положила больше всех» – Мк 12:43
            </blockquote>
          </>
        )}
      </div>

      <div className="nav-buttons">
        {step > 0 && (
          <button className="btn-back" onClick={() => setStep(s => s - 1)}>← Назад</button>
        )}
        {step < 2 ? (
          <button
            className="btn-next"
            disabled={step === 0 && !church}
            onClick={() => setStep(s => s + 1)}
          >
            Далее →
          </button>
        ) : (
          <button className="btn-next" onClick={handleAdd}>+ В корзину</button>
        )}
      </div>
    </div>
  );
}
