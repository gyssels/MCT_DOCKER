// Load module dependencies

import * as mongodb from 'mongodb';
const mongoose = mongodb.MongoClient;
import * as fs from 'fs';
import * as path  from 'path';
import catModel from '../models/cats.model';


export async function seedDB (dbURL) {
  try {
   
    console.log('Opening database connection:', dbURL);
    let db = await mongoose.connect(dbURL);

    // Do the actual stuff...
    await resetCollection(db, 'cats', __dirname+'/cats.json');
  
    console.log('Closing database connection');
    await db.close();
  } catch (err) {
    console.error(err);
   // process.exit(1);
  }
}

/**
 * Reset the contents of a collection in database.
 *
 * Rebuilds a collection in database from scratch, loading a set
 * of new documents from a JSON file.
 *
 * @param  {Object} db - Handler of database connection
 * @param  {string} dbCollectionName - Name of collection in database
 * @param  {string} fileName - Path to JSON file with dataset
 * @throws  {Object} - Generic Error object
 */

async function resetCollection (db, dbCollectionName, fileName) {
  try {
    // 1. Drop existing collection, if exists
    console.log('Deleting collection:', dbCollectionName);
    try {
     // await db.collection(dbCollectionName).drop();
     await catModel.remove({})
    } catch (err) {
      // Ignore the error message issued by Mongoose
      // if the collection doesn't exist;
      // not very elegant, but it's quick and it works... ;-)
      if (err.message !== 'ns not found') {
        throw err;
      }
    }

    // 2. Load data from JSON files in the server
    console.log('Reading JSON file:', fileName);
    let data = fs.readFileSync(fileName, 'utf8');
    let jsonDataset = JSON.parse(data);

    // 3. Insert fresh new documents in the collection
    console.log('Inserting docs in collection:', dbCollectionName);  
    //const documents = jsonDataset[fileCollectionName];
    const documents = jsonDataset;
    //await db.collection(dbCollectionName).insertMany(documents);
    await catModel.collection.insertMany(documents);
  } catch (err) {
    throw err;
  }
}