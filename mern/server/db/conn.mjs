import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

function isConnected() {
  return !!conn&& !!conn.topology && conn.topology.isConnected()
}
if(isConnected) {
  console.log("connection exists")
}

let db = conn.db("AnchorLease");

export default db;