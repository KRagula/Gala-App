import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class App extends Component{
    constructor() {
        super()
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
        this.changeFirstName = this.changeFirstName.bind(this)
        this.changeLastName = this.changeLastName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeFirstName(event){
        this.setState({
            firstName:event.target.value
        })
    }

    changeLastName(event){
        this.setState({
            lastName:event.target.value
        })
    }

    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()
        const registered = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/app/signup', registered)
            .then(response => console.log(response.data))
        //window.location = '/home'
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            password:''
        })
    }

    render () {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type = 'text' 
                            placeholder = 'First Name' 
                            onChange={this.changeFirstName} 
                            value={this.state.firstName}
                            className='form-control form-group'
                            />
                            <input type = 'text' 
                            placeholder = 'Last Name' 
                            onChange={this.changeLastName} 
                            value={this.state.lastName}
                            className='form-control form-group'
                            />
                            <input type = 'text' 
                            placeholder = 'E-mail' 
                            onChange={this.changeEmail} 
                            value={this.state.email}
                            className='form-control form-group'
                            />
                            <input type = 'password' 
                            placeholder = 'Password' 
                            onChange={this.changePassword} 
                            value={this.state.password}
                            className='form-control form-group'
                            />
                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;