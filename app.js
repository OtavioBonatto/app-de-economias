const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './dist')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log('servidor rodando'))