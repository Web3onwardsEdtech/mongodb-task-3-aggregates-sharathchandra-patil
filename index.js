const { MongoClient } = require('mongodb');

async function matchStage() {
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('MoviesDB');
    const collection = database.collection('Movies');
    const movies=[
        {
            title:"the matrix",
            release_date:"2024-09-09",
            popularity:50
        },
        {
            title:"Ghost",
            release_date:"2024-09-09",
            popularity:40
        },
        {
            title:"the",
            release_date:"2024-09-09",
            popularity:80
        }
    ];
    const result=await collection.insertMany(movies);
    console.log(`${result.insertedCount} movies inserted`);
    const match = await collection.aggregate([
      { $match: { popularity: { $gt: 50 } } }
    ]).toArray();
    console.log('Matched Movies:', match);
  } finally {
    await client.close();
  }
}

matchStage().catch(console.dir);