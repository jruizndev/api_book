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
})

afterAll(() => {
    server.close() // Cierra el servidor al final de las pruebas
    connection_db.close() // Cierra la conexión con la base de datos
})
