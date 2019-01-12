require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

const { SERVER_PORT, SECRET, CONNECTION_STRING } = process.env

const app = express()
app.use(express.json())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true
}))


massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log(`And then there were ${SERVER_PORT}`)
  })
})



app.post('/auth/register', ctrl.register)

app.post('/auth/login', ctrl.login)




app.get('/api/posts/:userid', ctrl.search)

app.get('/api/post/:postid', ctrl.getSinglePost)
