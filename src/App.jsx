import { useCallback, useState } from 'react';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import FilterPanel from './components/FilterPanel';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import UserTable from './components/UserTable';
import { useUsers } from './hooks/useUsers';

export default function App() {
  const {
    users,
    loading,
    error,
    selectedIds,
    page,
    totalPages,
    editingUser,
    showDeleteModal,
    applyFilters,
    setPage,
    toggleSelect,
    toggleSelectAll,
    openEdit,
    closeEdit,
    saveEdit,
    openDelete,
    closeDelete,
    confirmDelete,
  } = useUsers();

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleSaveEdit = (user) => {
    saveEdit(user);
    showToast('Los cambios han sido guardados correctamente.');
  };

  const handleConfirmDelete = () => {
    const count = selectedIds.length;
    confirmDelete();
    showToast(`${count === 1 ? '1 usuario eliminado' : `${count} usuarios eliminados`} correctamente.`);
  };

  const hasModal = !!editingUser || showDeleteModal;

  return (
    <>
      <Navbar />

      {hasModal && (
        <div
          className="modal-backdrop fade show"
          aria-hidden="true"
          style={{ zIndex: 1040 }}
        />
      )}

      <main className="container pt-5 pb-5">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h1 className="h3 fw-bold">Listado de usuarios</h1>
          </div>

          <FilterPanel onApply={applyFilters} />

          <UserTable
            users={users}
            loading={loading}
            error={error}
            selectedIds={selectedIds}
            page={page}
            totalPages={totalPages}
            onToggleSelect={toggleSelect}
            onToggleSelectAll={toggleSelectAll}
            onEdit={openEdit}
            onDelete={openDelete}
            onPageChange={setPage}
          />
        </div>
      </main>

      {editingUser && (
        <div style={{ position: 'relative', zIndex: 1050 }}>
          <EditModal user={editingUser} onSave={handleSaveEdit} onClose={closeEdit} />
        </div>
      )}

      {showDeleteModal && (
        <div style={{ position: 'relative', zIndex: 1050 }}>
          <DeleteModal count={selectedIds.length} onConfirm={handleConfirmDelete} onClose={closeDelete} />
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
