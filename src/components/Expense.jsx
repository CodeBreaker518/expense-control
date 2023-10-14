import PropTypes from 'prop-types'

import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css/'

import { formatDate } from '../helpers/formatDate'

import savingsIcon from '../assets/images/icono_ahorro.svg'
import foodIcon from '../assets/images/icono_comida.svg'
import houseIcon from '../assets/images/icono_casa.svg'
import expensesIcon from '../assets/images/icono_gastos.svg'
import leisureIcon from '../assets/images/icono_ocio.svg'
import healthIcon from '../assets/images/icono_salud.svg'
import suscriptionsIcon from '../assets/images/icono_suscripciones.svg'

const iconsDictionary = {
  savings: savingsIcon,
  food: foodIcon,
  house: houseIcon,
  miscellaneous: expensesIcon,
  leisure: leisureIcon,
  health: healthIcon,
  suscriptions: suscriptionsIcon,
}

const Expense = ({ expense, setEditExpense, deleteExpense }) => {
  const { name, quantity, category, date, id } = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>Editar</SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteExpense(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img src={iconsDictionary[category]} alt='expense icon' />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Agregado el: {''}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

Expense.propTypes = {
  expense: PropTypes.object.isRequired,
}

export default Expense
