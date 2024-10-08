import bookModel from '../models/bookModel.js'

// Controlador para obtener todos los libros
export const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll() // Obtiene todos los libros de la base de datos
        res.json(books) // Envía los libros como respuesta JSON
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los libros',
            error: error.message,
        })
    }
}

// Controlador para crear un libro
export const createBook = async (req, res) => {
    try {
        const { title, author, description } = req.body

        const newBook = await bookModel.create({ title, author, description }) // Crea el libro en la base de datos

        res.status(201).json(newBook) // Respuesta con el libro creado
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el libro',
            error: error.message,
        })
    }
}
