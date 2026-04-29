import { useCallback, useEffect, useReducer } from 'react';
import { fetchUsers } from '../services/userService';

const initialState = {
  users: [],
  loading: false,
  error: null,
  filters: { nat: '', gender: '' },
  page: 1,
  totalResults: 0,
  selectedIds: [],
  editingUser: null,
  showDeleteModal: false,
};

const RESULTS_PER_PAGE = 10;

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.users, totalResults: action.totalResults, selectedIds: [] };
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
      const allIds = state.users.map((u) => u.id);
      const allSelected = allIds.every((id) => state.selectedIds.includes(id));
      return { ...state, selectedIds: allSelected ? [] : allIds };
    }
    case 'OPEN_EDIT': {
      const user = state.users.find((u) => u.id === action.id);
      return { ...state, editingUser: user ? { ...user } : null };
    }
    case 'CLOSE_EDIT':
      return { ...state, editingUser: null };
    case 'SAVE_EDIT':
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.user.id ? action.user : u)),
        editingUser: null,
      };
    case 'OPEN_DELETE':
      return { ...state, showDeleteModal: true };
    case 'CLOSE_DELETE':
      return { ...state, showDeleteModal: false };
    case 'CONFIRM_DELETE':
      return {
        ...state,
        users: state.users.filter((u) => !state.selectedIds.includes(u.id)),
        selectedIds: [],
        showDeleteModal: false,
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
      const { users, info } = await fetchUsers({
        nat: state.filters.nat,
        gender: state.filters.gender,
        page: state.page,
        results: RESULTS_PER_PAGE,
      });
      dispatch({ type: 'FETCH_SUCCESS', users, totalResults: info.results });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', error: err.message });
    }
  }, [state.filters, state.page]);

  useEffect(() => {
    load();
  }, [load]);

  const applyFilters = (filters) => dispatch({ type: 'SET_FILTERS', filters });
  const setPage = (page) => dispatch({ type: 'SET_PAGE', page });
  const toggleSelect = (id) => dispatch({ type: 'TOGGLE_SELECT', id });
  const toggleSelectAll = () => dispatch({ type: 'TOGGLE_SELECT_ALL' });
  const openEdit = (id) => dispatch({ type: 'OPEN_EDIT', id });
  const closeEdit = () => dispatch({ type: 'CLOSE_EDIT' });
  const saveEdit = (user) => dispatch({ type: 'SAVE_EDIT', user });
  const openDelete = () => dispatch({ type: 'OPEN_DELETE' });
  const closeDelete = () => dispatch({ type: 'CLOSE_DELETE' });
  const confirmDelete = () => dispatch({ type: 'CONFIRM_DELETE' });

  const totalPages = Math.ceil(state.totalResults / RESULTS_PER_PAGE) || 1;

  return {
    ...state,
    totalPages,
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
  };
}
