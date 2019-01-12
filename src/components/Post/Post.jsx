import React, {Component} from 'react'
import Nav from '../Nav/Nav';
import axios from 'axios'

class Post extends Component {

state = {
  post: {}
}

componentDidMount(){
  this.getPost()
}

getPost = async (postid) => {
 let res = await axios.get(`/api/post/${postid}`)
 console.log(res.data)
}

  render(){
    return (
      <div>
        <Nav/>
        post:

        </div>
    )
  }
}

export default Post