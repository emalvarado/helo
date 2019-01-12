import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

 function Nav(props) {
  // props.location ?  null : 
  return (
    <div>
      <button>Home</button>
      <button>New Post</button>
      <Link to='/'>
        <button>Logout</button>
      </Link>

        User: {props.user.username}
        <img src={props.user.img} alt="profile picture"/>

    </div>
  )
}


const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps) (Nav)