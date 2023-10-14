import { useState, useEffect } from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <div className='filtros sombra contenedor'>
      <form onChange={(e) => setFilter(e.target.value)}>
        <div className='campo'>
          <label>Filtrar gastos</label>
          <select value={filter}>
            <option value=''>-- Todas las Categorías --</option>
            <option value='savings'>Ahorro</option>
            <option value='food'>Comida</option>
            <option value='house'>Casa</option>
            <option value='miscellaneous'>Gastos Varios</option>
            <option value='leisure'>Ocio</option>
            <option value='health'>Salud</option>
            <option value='suscriptions'>Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filter
