import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { fetchCasas, createCasa, updateCasa, deleteCasa } from '../services/userService';

const RESULTS_PER_PAGE = 10;

const initialState = {
  allCasas: [],
  loading: false,
  saving: false,
  error: null,
  filters: { distrito: '', tipoCasa: '' },
  page: 1,
  selectedIds: [],
  editingCasa: null,
  showDeleteModal: false,
  showCreateModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, allCasas: action.casas, selectedIds: [] };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'SET_FILTERS':
      return { ...state, filters: action.filters, page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.page, selectedIds: [] };
    case 'TOGGLE_SELECT': {
      const id = action.id;
      const already = state.selectedIds.includes(id);
      return {
        ...state,
        selectedIds: already ? state.selectedIds.filter((x) => x !== id) : [...state.selectedIds, id],
      };
    }
    case 'TOGGLE_SELECT_ALL': {
      const allIds = action.pageIds;
      const allSelected = allIds.every((id) => state.selectedIds.includes(id));
      return { ...state, selectedIds: allSelected ? [] : allIds };
    }
    case 'OPEN_EDIT': {
      const casa = state.allCasas.find((c) => c.id === action.id);
      return { ...state, editingCasa: casa ? { ...casa } : null };
    }
    case 'CLOSE_EDIT':
      return { ...state, editingCasa: null };
    case 'SAVING_START':
      return { ...state, saving: true };
    case 'SAVING_END':
      return { ...state, saving: false };
    case 'SAVE_EDIT':
      return {
        ...state,
        allCasas: state.allCasas.map((c) => (c.id === action.casa.id ? action.casa : c)),
        editingCasa: null,
        saving: false,
      };
    case 'OPEN_CREATE':
      return { ...state, showCreateModal: true };
    case 'CLOSE_CREATE':
      return { ...state, showCreateModal: false };
    case 'ADD_CASA':
      return { ...state, allCasas: [...state.allCasas, action.casa], showCreateModal: false, saving: false };
    case 'OPEN_DELETE':
      return { ...state, showDeleteModal: true };
    case 'CLOSE_DELETE':
      return { ...state, showDeleteModal: false };
    case 'CONFIRM_DELETE':
      return {
        ...state,
        allCasas: state.allCasas.filter((c) => !action.ids.includes(c.id)),
        selectedIds: [],
        showDeleteModal: false,
        saving: false,
      };
    default:
      return state;
  }
}

export function useUsers() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const casas = await fetchCasas();
      dispatch({ type: 'FETCH_SUCCESS', casas });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', error: err.message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    let result = state.allCasas;
    if (state.filters.distrito) {
      result = result.filter((c) =>
        c.distrito.toLowerCase().includes(state.filters.distrito.toLowerCase())
      );
    }
    if (state.filters.tipoCasa) {
      result = result.filter((c) => c.tipoCasa === state.filters.tipoCasa);
    }
    return result;
  }, [state.allCasas, state.filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / RESULTS_PER_PAGE));
  const pageStart = (state.page - 1) * RESULTS_PER_PAGE;
  const casasDePagina = filtered.slice(pageStart, pageStart + RESULTS_PER_PAGE);

  const applyFilters = (filters) => dispatch({ type: 'SET_FILTERS', filters });
  const setPage = (page) => dispatch({ type: 'SET_PAGE', page });
  const toggleSelect = (id) => dispatch({ type: 'TOGGLE_SELECT', id });
  const toggleSelectAll = () =>
    dispatch({ type: 'TOGGLE_SELECT_ALL', pageIds: casasDePagina.map((c) => c.id) });
  const openEdit = (id) => dispatch({ type: 'OPEN_EDIT', id });
  const closeEdit = () => dispatch({ type: 'CLOSE_EDIT' });
  const openCreate = () => dispatch({ type: 'OPEN_CREATE' });
  const closeCreate = () => dispatch({ type: 'CLOSE_CREATE' });

  const submitCreate = useCallback(async (data) => {
    dispatch({ type: 'SAVING_START' });
    try {
      const nueva = await createCasa(data);
      dispatch({ type: 'ADD_CASA', casa: nueva });
      return { ok: true };
    } catch (err) {
      dispatch({ type: 'SAVING_END' });
      return { ok: false, error: err.message };
    }
  }, []);

  const openDelete = () => dispatch({ type: 'OPEN_DELETE' });
  const closeDelete = () => dispatch({ type: 'CLOSE_DELETE' });

  const saveEdit = useCallback(async (casa) => {
    dispatch({ type: 'SAVING_START' });
    try {
      const updated = await updateCasa(casa.id, casa);
      dispatch({ type: 'SAVE_EDIT', casa: updated });
      return { ok: true };
    } catch (err) {
      dispatch({ type: 'SAVING_END' });
      return { ok: false, error: err.message };
    }
  }, []);

  const confirmDelete = useCallback(async () => {
    const ids = state.selectedIds;
    dispatch({ type: 'SAVING_START' });
    try {
      await Promise.all(ids.map((id) => deleteCasa(id)));
      dispatch({ type: 'CONFIRM_DELETE', ids });
      return { ok: true };
    } catch (err) {
      dispatch({ type: 'SAVING_END' });
      return { ok: false, error: err.message };
    }
  }, [state.selectedIds]);

  return {
    users: casasDePagina,
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    selectedIds: state.selectedIds,
    page: state.page,
    totalPages,
    editingUser: state.editingCasa,
    showDeleteModal: state.showDeleteModal,
    showCreateModal: state.showCreateModal,
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
  };
}
