export default function StepProgress({ steps, current }) {
  return (
    <div className="step-progress">
      {steps.map((s, i) => (
        <div key={s} className={`step-prog-item ${i <= current ? 'active' : ''}`}>
          <div className="step-prog-line" />
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}
