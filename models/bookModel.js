import connection_db from '../database/connectionDb.js'
import { DataTypes } from 'sequelize'

const bookModel = connection_db.define(
    'Book',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)

export default bookModel
