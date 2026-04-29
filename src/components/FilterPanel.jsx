import { useState } from 'react';

const TIPOS_CASA = [
  { value: 'Casa', label: 'Casa' },
  { value: 'Departamento', label: 'Departamento' },
  { value: 'Oficina', label: 'Oficina' },
  { value: 'Local Comercial', label: 'Local Comercial' },
  { value: 'Terreno', label: 'Terreno' },
];

export default function FilterPanel({ onApply }) {
  const [distrito, setDistrito] = useState('');
  const [tipoCasa, setTipoCasa] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ distrito, tipoCasa });
  };

  const handleReset = () => {
    setDistrito('');
    setTipoCasa('');
    onApply({ distrito: '', tipoCasa: '' });
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
                  <label htmlFor="filter-distrito" className="form-label small fw-semibold mb-1">
                    Distrito
                  </label>
                  <input
                    id="filter-distrito"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ej: Lima, Miraflores..."
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                  />
                </div>

                <div className="col-sm-12 col-lg-4">
                  <label htmlFor="filter-tipo" className="form-label small fw-semibold mb-1">
                    Tipo de propiedad
                  </label>
                  <select
                    id="filter-tipo"
                    className="form-select form-select-sm"
                    value={tipoCasa}
                    onChange={(e) => setTipoCasa(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {TIPOS_CASA.map(({ value, label }) => (
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
