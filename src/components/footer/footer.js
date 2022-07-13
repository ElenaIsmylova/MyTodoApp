import { Component } from 'react'
import PropTypes from 'prop-types'

import './footer.css'

export default class Footer extends Component {

  static propTypes = {
    doneCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onFilterSelect: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired
  }

  render() {
    const { doneCount, filter, onFilterSelect, onClearCompleted } = this.props

    const buttonsData = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ]

    const buttons = buttonsData.map(({ name, label }) => {
      const active = filter === name
      const clazz = active ? 'selected' : ''
      return (
        <li key={name}>
          <button className={clazz} onClick={() => onFilterSelect(name)}>
            {label}
          </button>
        </li>
      )
    })

    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <ul className="filters">{buttons}</ul>
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
