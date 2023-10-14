import PropTypes from 'prop-types'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'

const Header = ({ expenses, setExpenses, budget, setBudget, isBudgetValid, setIsBudgetValid }) => {
  return (
    <header className='header'>
      <h1>Planificador de gastos</h1>
      {isBudgetValid ? (
        <BudgetControl expenses={expenses} setExpenses={setExpenses} budget={budget} setBudget={setBudget} setIsBudgetValid={setIsBudgetValid} />
      ) : (
        <NewBudget budget={budget} setBudget={setBudget} setIsBudgetValid={setIsBudgetValid} />
      )}
    </header>
  )
}

Header.propTypes = {
  budget: PropTypes.number,
  setBudget: PropTypes.func,
}

export default Header
