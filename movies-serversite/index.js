const express = require ('express')
const cors = require ("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT|| 5000;

//middleware
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gamza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gamza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const favoriteCollection = client.db('moviesDB').collection('favorite')
    const addMovieCollection = client.db('moviesDB').collection('addMovie')
    const comingMovieCollection = client.db('moviesDB').collection('coming-movies')
    const cartoonMovieCollection = client.db('moviesDB').collection('cartoon-movies')
        // add movie post
app.post ('/coming-movies',async(req,res)=>{
  const newMovies = req.body;
  console.log(newMovies)
  const result =await comingMovieCollection.insertOne(newMovies)
 
  res.send(result)
})
  // GET coming soon movies
  app.get('/coming-movies', async (req, res) => {
    const movies = await comingMovieCollection.find().toArray();
    console.log(movies)
    res.send(movies);
  });



        // cartoon movie post
app.post ('/cartoon-movies',async(req,res)=>{
  const newMovies = req.body;
  console.log(newMovies)
  const result =await cartoonMovieCollection.insertOne(newMovies)
 
  res.send(result)
})
  // GET cartoon soon movies
  app.get('/cartoon-movies', async (req, res) => {
    const movies = await cartoonMovieCollection.find().toArray();
    console.log(movies)
    res.send(movies);
  });

    // add movie post
app.post ('/add',async(req,res)=>{
    const newMovies = req.body;
console.log(newMovies)
    const result =await addMovieCollection.insertOne(newMovies)
   
    res.send(result)
})
  // GET route to fetch movies
  app.get('/add', async (req, res) => {
    const {search}= req.query
    let option ={}
    if(search){
      option = {title:{$regex:search,$options:"i"}}
    }
   
    console.log(search)
    const movies = await addMovieCollection.find(option).toArray();
    res.send(movies);
  });

   //details
   app.get('/add/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const movie = await addMovieCollection.findOne(query);
    res.send(movie);
});
// app.get('/add/:id',async(req,res)=>{
//   const id = req.params.id;
//   const query = {_id: new ObjectId(id)}
//   const result= await addMovieCollection.findOne(query)
//   res.send(result)
// })

// update
app.patch('/add/:id',async(req,res)=>{
  const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const updateMovie= req.body
  const updatedDoc = {
    $set:{
       poster: updateMovie.poster,
         title:updateMovie.title,
         genre : updateMovie.genre,
         duration :updateMovie.duration,
         release :updateMovie.release,
         summary :updateMovie.summary,
    }
  }
  const result= await addMovieCollection.updateOne(query,updatedDoc)
  res.send(result)
})

//add delete
app.delete('/add/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await addMovieCollection.deleteOne(query);
  res.send(result);
})



// // post
app.post ('/favorites',async(req,res)=>{
    const newMovie = req.body;
    console.log(newMovie)
    const result =await favoriteCollection.insertOne(newMovie)
   
    res.send(result)
})

  // GET route to fetch movies
  app.get('/favorites/:email', async (req, res) => {
    const email =req.params.email
    const query = {email:email}
    const movies = await favoriteCollection.find(query).toArray();
    res.send(movies);
  });
//   //details
  app.delete('/favorites/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const movie = await favoriteCollection.deleteOne(query);
    res.send(movie);
});


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged ok your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("movies server is running on 5000")
})
// server running 

app.listen(port,()=>{
    console.log('movies server running on port 5000')
})