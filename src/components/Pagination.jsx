export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(page, totalPages);

  return (
    <nav aria-label="Paginación de usuarios">
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            <i className="bi bi-chevron-left" aria-hidden="true"></i>
          </button>
        </li>

        {pages.map((p, i) =>
          p === '...' ? (
            <li key={`ellipsis-${i}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(p)}
                aria-label={`Ir a página ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Página siguiente"
          >
            <i className="bi bi-chevron-right" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}
