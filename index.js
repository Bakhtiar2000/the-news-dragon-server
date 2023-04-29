const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const categories = require('./data/categories.json')
const cors = require('cors')
const news = require('./data/news.json')

app.use(cors()) //Must use this above other app calls

app.get('/', (req, res) => {
    res.send('Dragon is running')
})

app.get('/categories', (req, res) => {
    res.send(categories)
})

//To show all news from the server
app.get('/news', (req, res) => {
    res.send(news)
})

//To show one specific news (id wise) from all news
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)
    const selectedNews = news.find(n => n._id == id)
    res.send(selectedNews)
})

//To show all news from a special category (sports, international etc)
app.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    if (id == 0) {
        res.send(news)
    }
    else {
        const categoryNews = news.filter(n => n.category_id == id)
        res.send(categoryNews)
    }
})

app.listen(port, () => {
    console.log(`Dragon API is running on port ${port}`)
})