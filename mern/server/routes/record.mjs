import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get('/', async (req, res) => {
  try {
    const collection = db.collection('posts'); // Use the db object to access the collection
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    username: req.body.username,
    title: req.body.title,
    file: req.body.file,
    price: req.body.price,
    
    start: req.body.start,
    end: req.body.end,

    distance: req.body.distance,
    address: req.body.address,

    pet_friendly: req.body.pet_friendly,
    gym: req.body.gym,
    kitchen: req.body.kitchen,

    description: req.body.description
  };
  let collection = await db.collection("posts");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      username: req.body.username,
      title: req.body.title,
      file: req.body.file,
      price: req.body.price,
      
      start: req.body.start,
      end: req.body.end,

      distance: req.body.distance,
      address: req.body.address,

      pet_friendly: req.body.pet_friendly,
      gym: req.body.gym,
      kitchen: req.body.kitchen,
      
      description: req.body.description
    }
  };

  let collection = await db.collection("posts");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("posts");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;