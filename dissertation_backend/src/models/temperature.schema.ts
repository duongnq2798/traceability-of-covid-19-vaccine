import * as mongoose from 'mongoose'

export const TemperatureSchema = new mongoose.Schema({
    temperature: String,
    humidity: String,
    sensorName: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})