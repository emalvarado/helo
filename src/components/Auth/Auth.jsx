import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUserData} from '../../ducks/reducer'

class Auth extends Component {
  constructor(props){
    super(props)

    this.state = {
        username: '',
        password: ''
    }

    this.register = this.register.bind(this)
  }



  

  handleChange = (prop,val) => {
    this.setState({
      [prop]: val
    })
  }

  async register(){
    const {username, password} = this.state
    let res = await axios.post('/auth/register', {username, password})
    this.props.getUserData(res.data.userData)
    if(res.data.loggedIn){
      this.props.history.push('/dashboard')
    }
  }

   login = async () => {
    const {username, password} = this.state
    let res = await axios.post('/auth/login', {username, password})
    // console.log(res.data)
    this.props.getUserData(res.data.userData)
    if(res.data.loggedIn) {
      this.props.history.push('/dashboard')
    }
  }

  render(){
    return (
      <div>
        <p>Username: <input onChange={(e)=>this.handleChange('username', e.target.value)} type="text"/></p>
        <p>Password: <input onChange={(e)=>this.handleChange('password', e.target.value)} type="text"/></p>

        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
        
      </div>
    )
  }
}

export default connect(null, {getUserData})(Auth)