import { useState } from 'react';
import { churches } from '../data/churches';

export default function ChurchList({ selected, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = churches.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="church-list">
      <input
        className="search-input"
        placeholder="🔍 Название или город..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="list">
        {filtered.map(c => (
          <div
            key={c.id}
            className={`list-item ${selected?.id === c.id ? 'selected' : ''}`}
            onClick={() => onSelect(c)}
          >
            <span className="list-item-icon">{c.emoji}</span>
            <div>
              <div className="list-item-name">{c.name}</div>
              <div className="list-item-sub">{c.city}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
