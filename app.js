import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import compress from "compression"
import helmet from "helmet"
import cors from "cors"
import mongoose from "mongoose"
import expressRateLimiter from "express-rate-limit"

// import usersRouter from "./router/users.router"
import postsRouter from "./router/posts.router"
import contactFormRouter from "./router/contact_form.router"

dotenv.config()

const app = express()

mongoose.Promise = global.Promise

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DATABASE_NAME }).then( () => {
    console.log('Database connected successfully...')
}).catch( (err) => {
    console.log(`An error was encountered: ${err}`)
})

// TODO: Add proper configuration here
const configuredBodyParserJSON = bodyParser.json()
const configuredBodyParserURLEncoding = bodyParser.urlencoded({ extended: true })
const configuredCompress = compress()
const configuredHelmet = helmet({
    crossOriginResourcePolicy: false,
})
const configuredCors = cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})

const configuredRateLimiter = expressRateLimiter({
    window: 10*1000,
    max: 10,
    message: "You've requested this site too frequently.\nPlease wait for a while before making a new request.",
    Headers: true,
    keyGenerator: (req, res) => {
        return req.ip
    }
})

app.use(configuredBodyParserJSON)
app.use(configuredBodyParserURLEncoding)
app.use(configuredCompress)
app.use(configuredHelmet)
app.use(configuredCors)
app.use(configuredRateLimiter)
app.set('view engine', 'ejs')

// TODO: Add better UX for the below error handling
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({"error": `${err.name}: ${err.message}`})
    } else if (err) {
        res.status(400).json({"error": `${err.name}: ${err.message}`})
        console.log(err)
    }
})

app.get('/',(req, res) => {
    res.send("hello")
})

// app.use('/api/v1/users', usersRouter)
app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/contact', contactFormRouter)

export default app