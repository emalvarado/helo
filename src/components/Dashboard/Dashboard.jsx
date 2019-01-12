import React, { Component } from 'react'
import Nav from '../Nav/Nav';
import { connect } from 'react-redux'
import axios from 'axios'


class Dashboard extends Component {

  state = {
    posts: [],
    search: '',
    myPosts: true
  }

  componentDidMount() {
    this.search(this.props.user.id)
  }

  search = async (userid) => {
    const {search, myPosts} = this.state
    const res = await axios.get(`/api/posts/${userid}?search=${search}&userposts=${myPosts}`)
    this.setState({
      posts: res.data
    })





    // const res = await axios.get(`/posts/${userid}`)
    // // console.log(res.data)
    // this.setState({
    //   posts: res.data
    // })
  }

  reset = async(userid) => {
    const {myPosts} = this.state
    const res = await axios.get(`/api/posts/${userid}?userposts=${myPosts}`)
    this.setState({
      posts: res.data,
      search: ''
    })
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }




  render() {
    let postsToDisplay = this.state.posts.map((post, i) => {
      return (
        <div>
         Title: {post.title}
         User: {post.username}
         <img src={post.profile_pic} alt="Profile image"/> 
        </div>
      )
    })
    return (
      <div>
        <Nav />
        Search: <input value={this.state.search}
         onChange={(e) => this.handleChange('search', e.target.value)} type="text" />

        <button onClick={(id)=> this.search(this.props.user.id)}>Search</button>
        <button onClick={(id) =>{ this.reset(this.props.user.id)}}>Reset</button>

        My Posts: <input onChange={()=> this.setState({myPosts: !this.state.myPosts})} checked={this.state.myPosts}
          type="checkbox" />

        <div>
          {postsToDisplay}
        </div>
      </div>
    )
  }
}


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard)