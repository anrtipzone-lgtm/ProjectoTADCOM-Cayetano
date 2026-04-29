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
    saving,
    error,
    selectedIds,
    page,
    totalPages,
    editingUser,
    showDeleteModal,
    showCreateModal,
    applyFilters,
    setPage,
    toggleSelect,
    toggleSelectAll,
    openEdit,
    closeEdit,
    saveEdit,
    openCreate,
    closeCreate,
    submitCreate,
    openDelete,
    closeDelete,
    confirmDelete,
  } = useUsers();

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleCreate = async (data) => {
    const result = await submitCreate(data);
    if (result.ok) {
      showToast('Propiedad creada correctamente.');
    } else {
      showToast(result.error || 'Error al crear la propiedad.', 'danger');
    }
  };

  const handleSaveEdit = async (casa) => {
    const result = await saveEdit(casa);
    if (result.ok) {
      showToast('Los cambios han sido guardados correctamente.');
    } else {
      showToast(result.error || 'Error al guardar los cambios.', 'danger');
    }
  };

  const handleConfirmDelete = async () => {
    const count = selectedIds.length;
    const result = await confirmDelete();
    if (result.ok) {
      showToast(`${count === 1 ? '1 propiedad eliminada' : `${count} propiedades eliminadas`} correctamente.`);
    } else {
      showToast(result.error || 'Error al eliminar.', 'danger');
    }
  };

  const hasModal = !!editingUser || showDeleteModal || showCreateModal;

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
            <h1 className="h3 fw-bold">Listado de propiedades</h1>
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
            onAdd={openCreate}
            onEdit={openEdit}
            onDelete={openDelete}
            onPageChange={setPage}
          />
        </div>
      </main>

      {showCreateModal && (
        <div style={{ position: 'relative', zIndex: 1050 }}>
          <EditModal isNew onSave={handleCreate} onClose={closeCreate} saving={saving} />
        </div>
      )}

      {editingUser && (
        <div style={{ position: 'relative', zIndex: 1050 }}>
          <EditModal user={editingUser} onSave={handleSaveEdit} onClose={closeEdit} saving={saving} />
        </div>
      )}

      {showDeleteModal && (
        <div style={{ position: 'relative', zIndex: 1050 }}>
          <DeleteModal count={selectedIds.length} onConfirm={handleConfirmDelete} onClose={closeDelete} saving={saving} />
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
