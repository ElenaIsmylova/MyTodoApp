import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import PropTypes from 'prop-types'

import './task-item.css'

export default class TaskItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  static defaultProps = {
    done: false,
    handleDone: () => {},
    handleDelete: () => {}
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    handleDone: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    editDone:PropTypes.func.isRequired

  }
	

  handleEditing = () => {
    this.setState({
      editing: true
    })
  }

  handleEditingDone = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        editing: false
      })
    }
    let title = e.target.value
    this.props.editDone(this.props.id, title)
  }

  onPreventDefault = (e) => {
    e.preventDefault()
  }

  whenCreate = () => {
    return `create ${formatDistanceToNow (
      new Date(this.props.date),
      {includeSeconds: true})} ago`
  }

  render() {
    const {title, done, handleDone, handleDelete} = this.props
    const viewStyle = {}
    const editStyle = {}

    if(this.state.editing) {
      viewStyle.display = 'none'
    } else {
      editStyle.display = 'none'
    }

    let classNames = ''
    if (done) {
      classNames = 'completed'
    }
    return (
      <li className={classNames}>
        <div className="view" style={viewStyle} >
          <input className="toggle" type="checkbox"/>
          <label>
            <button className="description" onClick={handleDone}>
              {title}
            </button>
						
            <span className="created">{this.whenCreate()}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditing}></button>
          <button className="icon icon-destroy" onClick={handleDelete}></button>
        </div>

        <form onSubmit={this.onPreventDefault}>
          <input 
            type="text" 
            style={editStyle}
            defaultValue={title}
            className="edit"
            onKeyDown={this.handleEditingDone}
          />
        </form>
				
      </li>
    )
  }
}

