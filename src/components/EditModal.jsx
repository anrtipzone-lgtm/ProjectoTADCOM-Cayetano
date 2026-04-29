import { useEffect, useRef, useState } from 'react';

const REQUIRED_FIELDS = ['name', 'address', 'phone', 'email', 'country'];

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'El nombre es obligatorio.';
  if (!data.address.trim()) errors.address = 'La dirección es obligatoria.';
  if (!data.phone.trim()) errors.phone = 'El teléfono es obligatorio.';
  if (!data.email.trim()) {
    errors.email = 'El correo es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingrese un correo electrónico válido.';
  }
  if (!data.country.trim()) errors.country = 'El país es obligatorio.';
  return errors;
}

export default function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ name: '', gender: 'Female', address: '', phone: '', email: '', country: '' });
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        gender: user.gender,
        address: user.address,
        phone: user.phone,
        email: user.email,
        country: user.country,
      });
      setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ ...user, ...form });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editModalLabel"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              <i className="bi bi-pencil-square me-2" aria-hidden="true"></i>
              Editar Usuario
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar modal" />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="d-flex align-items-center mb-4">
                <img src={user.picture} alt={`Foto de ${user.name}`} className="user-avatar me-3" style={{ width: 56, height: 56 }} />
                <div>
                  <div className="fw-semibold">{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-name" className="form-label">
                    Nombre <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="edit-name"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && <div id="err-name" className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-gender" className="form-label">Género</label>
                  <select
                    id="edit-gender"
                    name="gender"
                    className="form-select"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-address" className="form-label">
                    Dirección <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-address"
                    name="address"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    value={form.address}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.address ? 'err-address' : undefined}
                  />
                  {errors.address && <div id="err-address" className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-phone" className="form-label">
                    Teléfono <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    id="edit-phone"
                    name="phone"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    value={form.phone}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                  />
                  {errors.phone && <div id="err-phone" className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-email" className="form-label">
                    Correo electrónico <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="edit-email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && <div id="err-email" className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-sm-12 col-md-6">
                  <label htmlFor="edit-country" className="form-label">
                    País <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-country"
                    name="country"
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    value={form.country}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.country ? 'err-country' : undefined}
                  />
                  {errors.country && <div id="err-country" className="invalid-feedback">{errors.country}</div>}
                </div>
              </div>

              <p className="text-muted small mt-3 mb-0">
                <span aria-hidden="true" className="text-danger">*</span> Campos obligatorios
              </p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-floppy me-1" aria-hidden="true"></i>
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
