import { Sequelize } from 'sequelize'
import { DB_PASSWORD } from '../config.js'

const connection_db = new Sequelize('book_app', 'root', DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    define: { timestamps: false },
})

export default connection_db
