export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="banner">
      <div className="container-fluid">
        <a className="navbar-brand mx-auto" href="/" aria-label="Ir al inicio">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/UPCH_logo.svg/200px-UPCH_logo.svg.png"
            alt="Logo UPCH"
            className="d-inline-block align-text-top"
            height="36"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="ms-2 text-white fw-semibold" style={{ fontSize: '1.1rem' }}>
            UPCH · Gestión de Usuarios
          </span>
        </a>
      </div>
    </nav>
  );
}
