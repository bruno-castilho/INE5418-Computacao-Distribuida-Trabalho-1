require('dotenv/config');
const express = require('express')
const cookieParser = require('cookie-parser')

const routes = require('./routes')

require('./database')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(routes)

app.listen(process.env.SERVER_PORT || 3000)
