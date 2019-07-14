import React, { Component } from 'react'
import Axios from 'axios';

Axios.defaults.baseURL = 'https://5b8971636b7dcb0014d5f3f1.mockapi.io'

export default class App extends Component {
    state = {
        todos: []
    }

    apiCall = () => {
        Axios.get('/todos')
        .then(result =>{
            console.log(result)
            this.setState({
                todos: result.data
            })

        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount(){
        this.apiCall()
    }

    handleStatus = (id, status) => {
        console.log(id)
        Axios.put('/todos/'+id, {
            completed : !status
        })
        .then(data => {
            console.log(data);
            this.apiCall();
        })

    }

    render() {
        let {todos} = this.state
        return (
            <>
                <header>
                    <h1>Todo List</h1>
                </header> 
                <main>
                    <ul>
                        {
                            todos.map(todo => {
                                let {id, title, completed} = todo
                                let className = completed ? "completed" : ''
                                return (
                                    <li onClick={() => this.handleStatus(id,completed)} className={className} key={id}>{title}</li>
                                )
                            })
                        }
                    </ul>
                </main>
            </>
        )
    }
}
