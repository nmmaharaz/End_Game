import { MongoClient, ServerApiVersion } from "mongodb"

export default function dbConnect(collectionName: string) {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.DB_NAME).collection(collectionName)
}
