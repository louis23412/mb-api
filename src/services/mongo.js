import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('Connected to database!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

export async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect() {
    await mongoose.disconnect()
}