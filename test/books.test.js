import request from 'supertest'
import { app, startServer } from '../app.js'
import connection_db from '../database/connectionDb.js'

let server

beforeAll(async () => {
    server = await startServer() // Inicia el servidor antes de ejecutar las pruebas
})

describe('CRUD Books', () => {
    test('should return a response with status 200 and type json', async () => {
        const response = await request(app).get('/books') // Prueba de obtener todos los libros

        expect(response.status).toBe(200) // Verifica el estado 200
        expect(response.type).toBe('application/json') // Verifica que el tipo sea JSON
    })

    test('should create a book', async () => {
        const bookData = {
            title: 'Test title',
            author: 'Test Author',
            description: 'This is a test description',
        }

        const response = await request(app).post('/books').send(bookData) // Prueba de creación de un libro

        expect(response.statusCode).toBe(201) // Verifica que el código de estado sea 201 (creado)
        expect(response.body.title).toBe(bookData.title) // Verifica que el título coincida
        expect(response.body.author).toBe(bookData.author) // Verifica que el autor coincida
        expect(response.body.description).toBe(bookData.description) // Verifica que la descripción coincida
    })
    test('should delete a book', async () => {
        // Paso 1: Crear un libro para luego eliminarlo
        const bookData = {
            title: 'Test title to delete',
            author: 'Test author',
            description: 'Test description',
        }
        const createResponse = await request(app).post('/books').send(bookData)
        const bookId = createResponse.body.id // Asumiendo que la respuesta incluye el ID del libro creado

        // Paso 2: Enviar solicitud DELETE para eliminar el libro
        const deleteResponse = await request(app).delete(`/books/${bookId}`)

        // Verificar que la respuesta tenga un código de estado 200
        expect(deleteResponse.statusCode).toBe(200)
        // Opcional: Verificar el cuerpo de la respuesta
        expect(deleteResponse.body.message).toBe('Book deleted successfully')

        // Paso adicional: Verificar que el libro haya sido eliminado
        const getResponse = await request(app).get(`/books/${bookId}`)
        expect(getResponse.statusCode).toBe(404) // O el código de estado que uses para indicar "No encontrado"
    })
})

afterAll(() => {
    server.close() // Cierra el servidor al final de las pruebas
    connection_db.close() // Cierra la conexión con la base de datos
})
