// import { MongoClient } from "mongodb";

// const connectionString = process.env.ATLAS_URI || "";

// const client = new MongoClient(connectionString);

// let conn;
// try {
//   console.log("Connecting to MongoDB Atlas...");
//   conn = await client.connect();
// } catch(e) {
//   console.error(e);
// }

// function isConnected() {
//   return !!conn&& !!conn.topology && conn.topology.isConnected()
// }
// if(isConnected) {
//   console.log("connection exists")
// }

// let db = conn.db("AnchorLease");

// export default db;

import { MongoClient } from "mongodb";

const uri = process.env.ATLAS_URI || ""; // Replace with your database URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db("AnchorLease"); // Return the database instance
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Call connectToDatabase() to establish the connection and get the database instance
const db = await connectToDatabase();

export default db;

