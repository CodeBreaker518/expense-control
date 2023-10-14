import PropTypes from 'prop-types'
import Expense from './Expense'

const ExpensesList = ({ expenses, setEditExpense, deleteExpense, filter, filteredExpenses }) => {
  return (
    <div className='listado-gastos contenedor'>
      {/* FILTER EXISTS ? */}
      {filter ? (
        <>
          <h2>
            {/* eslint-disable-next-line react/prop-types */}
            {filteredExpenses.length ? 'Gastos' : 'No hay gastos en esta categoría'}
          </h2>
          {/* eslint-disable-next-line react/prop-types */}
          {filteredExpenses.map((expense) => (
            <Expense key={expense.id} expense={expense} setEditExpense={setEditExpense} deleteExpense={deleteExpense} />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? 'Gastos' : 'No hay gastos aun'}</h2>
          {expenses.map((expense) => (
            <Expense key={expense.id} expense={expense} setEditExpense={setEditExpense} deleteExpense={deleteExpense} />
          ))}
        </>
      )}
    </div>
  )
}

ExpensesList.propTypes = {
  expenses: PropTypes.array.isRequired,
}
export default ExpensesList
