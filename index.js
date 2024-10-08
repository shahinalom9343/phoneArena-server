const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// mongodb driver code
const uri =
  "mongodb+srv://phoneArena:eZPCi4vKtf8iIAyU@cluster0.43teffq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const userCollection = client.db("phoneArena").collection("users");
    const productCollection = client.db("phoneArena").collection("products");

    // post a new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const newUser = await userCollection.insertOne(user);
      res.send(newUser);
    });

    // get all products
    app.get("/products", async (req, res) => {
      const search = req.query.search;
      const pages = parseInt(req.query.pages);
      const size = parseInt(req.query.size);
      const filter = req.query;
      const query = {
        // ProductName: { $regex: `${search}`, $options: "i" },
      };
      const options = {
        sort: {
          Price: filter.sort === "asc" ? 1 : -1,
        },
      };
      const result = await productCollection
        .find(query, options)
        .skip(pages * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Phone Arena Server is Running");
});

app.listen(port, (req, res) => {
  console.log(`Phone Arena Server is running on PORT: ${port}`);
});
