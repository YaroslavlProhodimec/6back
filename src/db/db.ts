import {MongoClient} from 'mongodb';
import {BlogType} from "../types/blog/output";

const mongoUri =
    // process.env.mongoURI ||
    'mongodb://0.0.0.0:27017'

const client = new MongoClient(mongoUri);

const db = client.db('node-blog')

export const blogCollection = db.collection<BlogType>('blog')


export const postCollection = db.collection('post')

export  async function runDb() {
    try {
        await client.connect()
         // await client.db('products').command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch (e){
        console.log(`${e}`)
        await client.close()
    }
}