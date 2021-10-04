import * as mongoose from 'mongoose'

export const TemperatureSchema = new mongoose.Schema({
    temperature: String,
    humidity: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})