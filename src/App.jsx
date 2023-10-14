import { useState, useEffect } from 'react'

import Header from './components/Header'
import ExpensesList from './components/ExpensesList'
import NewExpenseModal from './components/NewExpenseModal'
import Filter from './components/Filter'

import { generateID } from './helpers/generateID'
import NewExpenseIcon from './assets/images/nuevo-gasto.svg'

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  const [budget, setBudget] = useState(Number(localStorage.getItem('budget') ?? 0))
  const [isBudgetValid, setIsBudgetValid] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimateModal(true)
      }, 300)
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget') ?? 0)
    if (budgetLS > 0) {
      setIsBudgetValid(true)
    }
  }, [])

  useEffect(() => {
    if (filter) {
      // filter expenses by category
      const filteredExpenses = expenses.filter((expense) => expense.category === filter)
      setFilteredExpenses(filteredExpenses)
    }
  }, [filter])

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 300)
  }

  const saveExpense = (expense) => {
    if (expense.id) {
      // edit
      const updatedExpenses = expenses.map((expenseState) => (expenseState.id === expense.id ? expense : expenseState))
      setExpenses(updatedExpenses)
      setEditExpense({})
    } else {
      // new expense
      expense.id = generateID()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300)
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isBudgetValid={isBudgetValid}
        setIsBudgetValid={setIsBudgetValid}
      />

      {isBudgetValid && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={NewExpenseIcon} alt='new expense icon' onClick={handleNewExpense} />
          </div>
        </>
      )}

      {modal && (
        <NewExpenseModal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      )}
    </div>
  )
}

export default App
