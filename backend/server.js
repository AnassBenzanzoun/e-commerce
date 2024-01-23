const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
// Connection URL
const url = "mongodb://mongo:27017"; // Update the host to use the service name
const dbName = "myproject";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/tableData", async (req, res) => {
  try {
    await waitForMongo();
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("documents");

    // Fetch data from MongoDB
    const data = await collection.find({}).toArray();

    // Send the data to the client
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

// Function to implement retry logic for MongoDB connection
async function waitForMongo() {
  const maxRetries = 30;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB is ready");
      return;
    } catch (err) {
      console.log(
        `Waiting for MongoDB... Retrying in 1 second (Attempt ${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      retries++;
    }
  }

  throw new Error("Unable to connect to MongoDB");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
