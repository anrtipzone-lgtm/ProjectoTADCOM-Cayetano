export default function UserRow({ user, selected, onToggle }) {
  return (
    <tr className={selected ? 'table-active' : ''}>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(user.id)}
          aria-label={`Seleccionar a ${user.name}`}
          id={`chk-${user.id}`}
        />
      </td>
      <td>
        <img
          src={user.picture}
          alt={`Foto de ${user.name}`}
          className="user-avatar"
        />
      </td>
      <td>{user.name}</td>
      <td>
        <span className={`badge ${user.gender === 'Female' ? 'bg-pink' : 'bg-info-subtle text-info-emphasis'}`}>
          {user.gender}
        </span>
      </td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
      <td>
        <a href={`mailto:${user.email}`} className="text-decoration-none">
          {user.email}
        </a>
      </td>
      <td>{user.country}</td>
    </tr>
  );
}
