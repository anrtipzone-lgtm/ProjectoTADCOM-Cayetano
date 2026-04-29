import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
  const bg = type === 'success' ? 'text-success' : 'text-danger';

  return (
    <div
      className="toast show position-fixed bottom-0 end-0 m-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{ zIndex: 9999, minWidth: '280px' }}
    >
      <div className="toast-header">
        <i className={`bi ${icon} ${bg} me-2`} aria-hidden="true"></i>
        <strong className="me-auto">{type === 'success' ? 'Éxito' : 'Error'}</strong>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar notificación" />
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
}
