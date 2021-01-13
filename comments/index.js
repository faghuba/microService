const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')


//middlewares 
const app = express() 
app.use(bodyParser.json())
app.use(cors())

const commentsByIPostId = { };

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByIPostId[req.params.id] || [] );
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body;

    const comments = commentsByIPostId[req.params.id] || [];
    comments.push({id: commentId, content })

    commentsByIPostId[req.params.id] = comments;

    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log('Listening Comments on port 4001');
})