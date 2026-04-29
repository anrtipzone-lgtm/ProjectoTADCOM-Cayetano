import { useEffect, useRef } from 'react';

export default function DeleteModal({ count, onConfirm, onClose }) {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    setTimeout(() => confirmBtnRef.current?.focus(), 50);
  }, []);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deleteModalLabel"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title" id="deleteModalLabel">
              <i className="bi bi-exclamation-triangle-fill text-danger me-2" aria-hidden="true"></i>
              Confirmar eliminación
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar modal" />
          </div>
          <div className="modal-body">
            <p className="mb-0">
              ¿Estás seguro de que deseas eliminar{' '}
              <strong>
                {count === 1 ? '1 usuario' : `${count} usuarios`}
              </strong>
              ? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              ref={confirmBtnRef}
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              <i className="bi bi-trash3 me-1" aria-hidden="true"></i>
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
