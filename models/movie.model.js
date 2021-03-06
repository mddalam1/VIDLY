const Joi = require('joi')
const pool = require('../databases/db')

const movieSchema = Joi.object({
    title : Joi.string().min(2).max(255).required(),
    genre_id : Joi.number().required(),
    numberinstock : Joi.number().min(0).required(),
    dailyrentalrate : Joi.number().min(0).required()
})

const validateMovie = (movie) => movieSchema.validate(movie)

const checkMovie = async id => {
    try {
        const {rows,rowCount} = await pool.query(`SELECT * from movies WHERE id=${id};`)
        if(rowCount === 0) return false
        return rows[0]
    } catch ({name, message}) {
        console.error(`${name} : ${message}`)
    }
}

module.exports.validateMovie = validateMovie
module.exports.checkMovie = checkMovie
