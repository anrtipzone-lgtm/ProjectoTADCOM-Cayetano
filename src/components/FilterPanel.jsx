import { useState } from 'react';

const NATIONALITIES = [
  { value: 'US', label: 'United States' },
  { value: 'AU', label: 'Australia' },
  { value: 'BR', label: 'Brazil' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'ES', label: 'Spain' },
  { value: 'FR', label: 'France' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'MX', label: 'Mexico' },
];

const GENDERS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
];

export default function FilterPanel({ onApply }) {
  const [nat, setNat] = useState('');
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ nat, gender });
  };

  const handleReset = () => {
    setNat('');
    setGender('');
    onApply({ nat: '', gender: '' });
  };

  return (
    <div className="col-sm-12 mt-3">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-sm btn-outline-primary px-4"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="filter-panel"
          type="button"
        >
          <i className="bi bi-sliders me-1" aria-hidden="true"></i>
          Filtros
        </button>
      </div>

      <div id="filter-panel" className={`mt-3 ${open ? '' : 'd-none'}`}>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row py-2 align-items-end g-3">
                <div className="col-sm-12 col-lg-4">
                  <label htmlFor="filter-nat" className="form-label small fw-semibold mb-1">
                    Nacionalidad
                  </label>
                  <select
                    id="filter-nat"
                    className="form-select form-select-sm"
                    value={nat}
                    onChange={(e) => setNat(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {NATIONALITIES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-12 col-lg-4">
                  <label htmlFor="filter-gender" className="form-label small fw-semibold mb-1">
                    Género
                  </label>
                  <select
                    id="filter-gender"
                    className="form-select form-select-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {GENDERS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-12 col-lg-4 d-flex gap-2">
                  <button type="submit" className="btn btn-sm btn-primary px-4">
                    <i className="bi bi-search me-1" aria-hidden="true"></i>
                    Buscar
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary px-3" onClick={handleReset}>
                    Limpiar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
