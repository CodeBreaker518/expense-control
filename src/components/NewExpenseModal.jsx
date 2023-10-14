import { useState, useEffect } from 'react'
import Message from './Message'
import closeModalIcon from '../assets/images/cerrar.svg'

const NewExpenseModal = ({ setModal, animateModal, setAnimateModal, saveExpense, editExpense, setEditExpense }) => {
  const [message, setMessage] = useState('')

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setName(editExpense.name)
      setQuantity(editExpense.quantity)
      setCategory(editExpense.category)
      setId(editExpense.id)
      setDate(editExpense.date)
    }
  }, [editExpense])

  const hideModal = () => {
    setAnimateModal(false)
    setEditExpense({})
    setTimeout(() => {
      setModal(false)
    }, 300)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([name, quantity, category].includes('')) {
      setMessage('Todos los campos son obligatorios')
      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }
    saveExpense({ name, quantity, category, id, date })
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={closeModalIcon} alt='close modal icon' onClick={hideModal} />
      </div>

      <form className={`formulario ${animateModal ? 'animar' : 'cerrar'}`} onSubmit={handleSubmit}>
        <legend>{editExpense.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {message && <Message type='error'>{message}</Message>}
        <div className='campo'>
          <label htmlFor='name'>Nombre Gasto</label>
          <input
            id='name'
            type='text'
            placeholder='Añade el nombre del gasto'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='quantity'>Cantidad</label>
          <input
            id='quantity'
            type='number'
            placeholder='Añade la cantidad del gasto: ej. 300'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor='category'>Categoria</label>
          <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>-- Seleccione --</option>
            <option value='savings'>Ahorro</option>
            <option value='food'>Comida</option>
            <option value='house'>Casa</option>
            <option value='miscellaneous'>Gastos Varios</option>
            <option value='leisure'>Ocio</option>
            <option value='health'>Salud</option>
            <option value='suscriptions'>Suscripciones</option>
          </select>
        </div>
        <input type='submit' value={editExpense ? 'Guardar cambios' : 'Añadir Gasto'} />
      </form>
    </div>
  )
}

export default NewExpenseModal
