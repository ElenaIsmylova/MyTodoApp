import { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {

  static propTypes = {
    item: PropTypes.element.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { item, handleChange, handleSubmit } = this.props

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={item}
            onChange={handleChange}
          />
        </form>
      </header>
    )
  }
}
