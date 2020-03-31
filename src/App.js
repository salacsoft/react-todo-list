import React, { Component, cloneElement } from 'react';
import axios from 'axios';  
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/pages/About';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
// import {v4 as  uuid} from 'uuid';
import './App.css';


class App extends Component {
  state = {
    todos: [ ]
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=15")
      .then(res => this.setState({ todos: res.data }));
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  deleteTodo = (id) => {
     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => {
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
      })

  }

  // Add todi
  addTodo = (title) => {
    axios.post("https://jsonplaceholder.typicode.com/todos", {title, completed:false})
      .then(res => this.setState({ todos: [...this.state.todos, res.data] })
    )
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo}/>
              </React.Fragment>
            )} />
            <Route exact path="/about" component={About} />
          </div>
          
        </div>  
      </Router>
    );
  }
  
}

export default App;
