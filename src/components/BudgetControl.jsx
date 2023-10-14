import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import TippyTooltip from '../tippy-tooltip/TippyTooltip'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({ expenses, setExpenses, budget, setBudget, setIsBudgetValid }) => {
  const [percentage, setPercentage] = useState(0)
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => expense.quantity + total, 0)
    const totalAvailable = budget - totalSpent

    setAvailable(totalAvailable)
    setSpent(totalSpent)

    // calculate total spent percentage
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2)
    setTimeout(() => {
      setPercentage(newPercentage)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses])

  const formatBudget = (quantity) => {
    return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  const handleResetApp = () => {
    const result = confirm('¿Deseas reiniciar presupuesto y gastos?')
    if (result) {
      setExpenses([])
      setBudget(0)
      setIsBudgetValid(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: percentage > 100 ? '#dc2626' : '#3b82f6',
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <div className='reset-app-container'>
          {/* Tooltip trigger */}
          <button className='reset-app-btn' type='button' onClick={handleResetApp}>
            Reiniciar App
          </button>
          <div className='reset-icon'>
            <TippyTooltip text='Reiniciar la app te permitira definir un nuevo presupuesto y borrara tus gastos actuales!' />
          </div>
        </div>
        <p>
          <span>Presupuesto: </span> {formatBudget(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatBudget(available)}
        </p>
        <p>
          <span>Gastado: </span> {formatBudget(spent)}
        </p>
      </div>
    </div>
  )
}

export default BudgetControl
