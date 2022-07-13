import { Component } from 'react'
import PropTypes from 'prop-types'

import TaskItem from '../task-item'

import './task-list.css'

export default class TaskList extends Component {

  static defaultProps = {
    handleDone: () => {},
    editDone: () => {},
    handleDelete: () => {}
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleDone: PropTypes.func.isRequired,
    editDone: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }
    
  render() {
    const {items, handleDone, editDone, handleDelete} = this.props

    const elements = items.map(item => {
           
      return(
        <TaskItem key={item.id} 
          id={item.id}
          date={item.date}
          title={item.title}
          done={item.done}
          handleDone={() => handleDone(item.id)}
          handleDelete={() => handleDelete(item.id)}
          editDone={editDone}          
        />
      )
    })
                
    return (
      <ul className="todo-list">
        {elements}
      </ul>
    )
  }
}

