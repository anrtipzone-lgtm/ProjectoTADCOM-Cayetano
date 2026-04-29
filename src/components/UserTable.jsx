import UserRow from './UserRow';
import Pagination from './Pagination';

export default function UserTable({
  users,
  loading,
  error,
  selectedIds,
  page,
  totalPages,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  onPageChange,
}) {
  const allSelected = users.length > 0 && users.every((u) => selectedIds.includes(u.id));
  const someSelected = selectedIds.length > 0;

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden="true"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="col-sm-12 pt-4">
      <div className="card border rounded-2 table-card">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary px-4"
                onClick={() => someSelected && onEdit(selectedIds[0])}
                disabled={selectedIds.length !== 1}
                aria-label="Editar usuario seleccionado"
                title={selectedIds.length !== 1 ? 'Seleccione exactamente un usuario para editar' : 'Editar usuario'}
              >
                <i className="bi bi-pencil me-1" aria-hidden="true"></i>
                Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger px-4"
                onClick={() => someSelected && onDelete()}
                disabled={!someSelected}
                aria-label="Eliminar usuarios seleccionados"
                title={!someSelected ? 'Seleccione al menos un usuario para eliminar' : `Eliminar ${selectedIds.length} usuario(s)`}
              >
                <i className="bi bi-trash3 me-1" aria-hidden="true"></i>
                Eliminar {someSelected && `(${selectedIds.length})`}
              </button>
            </div>
            {someSelected && (
              <span className="text-muted small">
                {selectedIds.length} de {users.length} seleccionado(s)
              </span>
            )}
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5" aria-live="polite" aria-busy="true">
              <div className="spinner-border text-primary me-3" role="status">
                <span className="visually-hidden">Cargando usuarios...</span>
              </div>
              <span className="text-muted">Cargando usuarios...</span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0" aria-label="Listado de usuarios">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '40px' }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={allSelected}
                        onChange={onToggleSelectAll}
                        aria-label="Seleccionar todos los usuarios"
                        title="Seleccionar / Deseleccionar todos"
                      />
                    </th>
                    <th scope="col" style={{ width: '56px' }}></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Género</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Correo electrónico</th>
                    <th scope="col">País</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center text-muted py-5">
                        <i className="bi bi-inbox fs-2 d-block mb-2" aria-hidden="true"></i>
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        selected={selectedIds.includes(user.id)}
                        onToggle={onToggleSelect}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && users.length > 0 && (
          <div className="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">
            <small className="text-muted">
              Página {page} de {totalPages}
            </small>
            <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
