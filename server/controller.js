const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req,res) => {
    const db = req.app.get('db')
    const {username, password} = req.body
    const user = await db.find_user({username})
    if(user[0]) {
      return res.status(200).send({message: 'Email already in use.'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    let newUser = await db.create_user({username, password: hash})
    req.session.user = {id: newUser[0].id, username: newUser[0].username}
    res.status(200).send({message: 'Logged in', userData: req.session.user, loggedIn: true})
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body
    const user = await db.find_user({username})
    if(!user[0]){
      return res.status(200).send({message: 'email not found.'})
    }
    const result = bcrypt.compareSync(password, user[0].password)
    if(!result) {
      return res.status(401).send({message: 'incorrect password'})
    }
    req.session.user = {id: user[0].id, username: user[0].username, img: user[0].profile_pic}
    res.status(200).send({message: 'Logged in', userData: req.session.user, loggedIn: true})
  },
  search: async (req, res) => {
    const db = req.app.get('db')
    const {userid} = req.params
    const {search, userposts} = req.query
    // console.log(req.query)
    if(userposts === 'true' && search) {
      const posts = await db.search_posts_by_user({id: userid, search})
      // console.log (posts, userid, search)
      res.status(200).send(posts)
    }else if (userposts === 'false' && !search) {
      const posts = await db.get_others_posts({userid})
      res.status(200).send(posts)
    } else if(userposts ==='false' && search) {
      const posts = await db.search_others_posts({userid, search})
      res.status(200).send(posts)
    } else if(userposts ==='true' && !search) {
      const posts = await db.get_all_posts()
      res.status(200).send(posts)
    }
  },
  getSinglePost: async (req, res) => {
    const db = req.app.get('db')
    const {postid} = req.params
    const post = await db.get_single_post({postid})
    res.status(200).send(post)
  }
}