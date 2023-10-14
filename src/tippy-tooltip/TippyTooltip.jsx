// Tooltip
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
// Styles
import '../index.css'

const TippyTooltip = ({ text }) => {
  return (
    <Tippy content={<span>{text}</span>}>
      <FontAwesomeIcon icon={faCircleQuestion} />
    </Tippy>
  )
}

export default TippyTooltip
