import express from 'express'
import { getAllBooks, createBook } from '../controllers/bookController.js'

const bookRouter = express.Router()

bookRouter.get('/', getAllBooks)
bookRouter.post('/', createBook)

export default bookRouter
