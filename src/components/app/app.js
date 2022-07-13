import { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

export default class App extends Component {

  state = {
    items: [],
    id: 1,
    item: '',
    filter: 'all',
  }

  handleChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.state.item) return
    const newItem = {
      id: this.state.id,
      title: this.state.item[0].toUpperCase() + this.state.item.slice(1),
      done: false,
      date: new Date(),
    }

    const updatedItems = [...this.state.items, newItem]

    this.setState({
      items: updatedItems,
      id: this.state.id + 1,
      item: '',
      editItem: false,
    })
  }

  handleDone = (id) => {
        
    const idx = this.state.items.findIndex(item => item.id === id)

    const oldItem = this.state.items[idx]
    const newItem = {...oldItem, done: !oldItem.done}

    const newItems = [
      ...this.state.items.slice(0, idx),
      newItem,
      ...this.state.items.slice(idx + 1)
    ]

    this.setState({
      items: newItems
    })
  }

  editDone = (id, title) => {
        
    const idx = this.state.items.findIndex(item => item.id === id)

    const oldItem = this.state.items[idx]
    const newItem = {...oldItem, title: title}

    const newItems = [
      ...this.state.items.slice(0, idx),
      newItem,
      ...this.state.items.slice(idx + 1)
    ]

    this.setState({
      items: newItems
    })
  }

  handleDelete = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: filteredItems
    })
  }

  filterPost = (items, filter) => {
    switch (filter) {
    case 'active':
      return items.filter(item => !item.done)
    case 'completed':
      return items.filter(item => item.done)
    default:
      return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  onClearCompleted = () => {
    this.setState(({items}) => {
      const activeTodo = items.filter(item => !item.done)
      return {
        items: activeTodo
      }
    })
  }

  render() {
    const {items, filter} = this.state
    const doneCount = items.length - items.filter(item => item.done).length
    const visibleData = this.filterPost(items, filter)

    return (
      <section className="todoapp">
        <NewTaskForm item={this.state.item} 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
    
        <section className="main">
          <TaskList items={visibleData}
            handleDone={this.handleDone}
            handleChange={this.handleChange}
            editDone={this.editDone}
            handleDelete={this.handleDelete}
          />
    
          <Footer
            doneCount={doneCount} 
            filter={filter} 
            onFilterSelect={this.onFilterSelect}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
    
      </section>
    )
  }
}
