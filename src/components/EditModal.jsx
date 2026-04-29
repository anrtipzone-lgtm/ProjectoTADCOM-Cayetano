import { useEffect, useRef, useState } from 'react';

const TIPOS_CASA = ['Casa', 'Departamento', 'Oficina', 'Local Comercial', 'Terreno'];

function validate(data) {
  const errors = {};
  if (!data.direccion.trim()) errors.direccion = 'La dirección es obligatoria.';
  if (!data.distrito.trim()) errors.distrito = 'El distrito es obligatorio.';
  if (!data.tipoCasa) errors.tipoCasa = 'El tipo de propiedad es obligatorio.';
  if (!data.numeroHabitaciones || data.numeroHabitaciones < 0)
    errors.numeroHabitaciones = 'Ingrese un número válido de habitaciones.';
  if (!data.areaM2 || data.areaM2 <= 0) errors.areaM2 = 'El área debe ser mayor a 0.';
  if (!data.precio || data.precio <= 0) errors.precio = 'El precio debe ser mayor a 0.';
  return errors;
}

export default function EditModal({ user: casa, onSave, onClose, saving, isNew = false }) {
  const [form, setForm] = useState({
    direccion: '',
    distrito: '',
    tipoCasa: 'Casa',
    numeroHabitaciones: 1,
    areaM2: 0,
    precio: 0,
    descripcion: '',
    activo: true,
  });
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isNew) {
      setForm({ direccion: '', distrito: '', tipoCasa: 'Casa', numeroHabitaciones: 1, areaM2: 0, precio: 0, descripcion: '', activo: true });
      setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else if (casa) {
      setForm({
        direccion: casa.direccion,
        distrito: casa.distrito,
        tipoCasa: casa.tipoCasa,
        numeroHabitaciones: casa.numeroHabitaciones,
        areaM2: casa.areaM2,
        precio: casa.precio,
        descripcion: casa.descripcion ?? '',
        activo: casa.activo,
      });
      setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [casa, isNew]);

  if (!isNew && !casa) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsed = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    setForm((prev) => ({ ...prev, [name]: parsed }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(isNew ? { ...form } : { ...casa, ...form });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editModalLabel"
      onClick={(e) => e.target === e.currentTarget && !saving && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              <i className={`bi ${isNew ? 'bi-plus-circle' : 'bi-pencil-square'} me-2`} aria-hidden="true"></i>
              {isNew ? 'Nueva Propiedad' : 'Editar Propiedad'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar modal" disabled={saving} />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-sm-12 col-md-8">
                  <label htmlFor="edit-direccion" className="form-label">
                    Dirección <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="edit-direccion"
                    name="direccion"
                    className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                    value={form.direccion}
                    onChange={handleChange}
                    required
                  />
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                <div className="col-sm-12 col-md-4">
                  <label htmlFor="edit-distrito" className="form-label">
                    Distrito <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-distrito"
                    name="distrito"
                    className={`form-control ${errors.distrito ? 'is-invalid' : ''}`}
                    value={form.distrito}
                    onChange={handleChange}
                    required
                  />
                  {errors.distrito && <div className="invalid-feedback">{errors.distrito}</div>}
                </div>

                <div className="col-sm-12 col-md-4">
                  <label htmlFor="edit-tipo" className="form-label">
                    Tipo <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <select
                    id="edit-tipo"
                    name="tipoCasa"
                    className={`form-select ${errors.tipoCasa ? 'is-invalid' : ''}`}
                    value={form.tipoCasa}
                    onChange={handleChange}
                  >
                    {TIPOS_CASA.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.tipoCasa && <div className="invalid-feedback">{errors.tipoCasa}</div>}
                </div>

                <div className="col-sm-12 col-md-4">
                  <label htmlFor="edit-habitaciones" className="form-label">
                    Habitaciones <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="edit-habitaciones"
                    name="numeroHabitaciones"
                    min="0"
                    className={`form-control ${errors.numeroHabitaciones ? 'is-invalid' : ''}`}
                    value={form.numeroHabitaciones}
                    onChange={handleChange}
                    required
                  />
                  {errors.numeroHabitaciones && <div className="invalid-feedback">{errors.numeroHabitaciones}</div>}
                </div>

                <div className="col-sm-12 col-md-4">
                  <label htmlFor="edit-area" className="form-label">
                    Área (m²) <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="edit-area"
                    name="areaM2"
                    min="0"
                    step="0.01"
                    className={`form-control ${errors.areaM2 ? 'is-invalid' : ''}`}
                    value={form.areaM2}
                    onChange={handleChange}
                    required
                  />
                  {errors.areaM2 && <div className="invalid-feedback">{errors.areaM2}</div>}
                </div>

                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-precio" className="form-label">
                    Precio (S/.) <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="edit-precio"
                    name="precio"
                    min="0"
                    step="0.01"
                    className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                    value={form.precio}
                    onChange={handleChange}
                    required
                  />
                  {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
                </div>

                <div className="col-sm-12 col-md-6 d-flex align-items-end pb-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="edit-activo"
                      name="activo"
                      checked={form.activo}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="edit-activo">
                      Propiedad activa
                    </label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <label htmlFor="edit-descripcion" className="form-label">Descripción</label>
                  <textarea
                    id="edit-descripcion"
                    name="descripcion"
                    className="form-control"
                    rows={3}
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <p className="text-muted small mt-3 mb-0">
                <span aria-hidden="true" className="text-danger">*</span> Campos obligatorios
              </p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className={`bi ${isNew ? 'bi-plus-lg' : 'bi-floppy'} me-1`} aria-hidden="true"></i>
                    {isNew ? 'Crear propiedad' : 'Guardar cambios'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
