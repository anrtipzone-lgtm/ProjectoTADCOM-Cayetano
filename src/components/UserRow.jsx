const SOL = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 });

export default function UserRow({ user: casa, selected, onToggle }) {
  return (
    <tr className={selected ? 'table-active' : ''}>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(casa.id)}
          aria-label={`Seleccionar ${casa.direccion}`}
          id={`chk-${casa.id}`}
        />
      </td>
      <td className="fw-medium">{casa.direccion}</td>
      <td>{casa.distrito}</td>
      <td>
        <span className="badge bg-primary-subtle text-primary-emphasis">{casa.tipoCasa}</span>
      </td>
      <td className="text-center">{casa.numeroHabitaciones}</td>
      <td className="text-end">{casa.areaM2} m²</td>
      <td className="text-end">{SOL.format(casa.precio)}</td>
      <td>
        {casa.activo
          ? <span className="badge bg-success-subtle text-success-emphasis">Activo</span>
          : <span className="badge bg-secondary-subtle text-secondary-emphasis">Inactivo</span>}
      </td>
    </tr>
  );
}
