const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iyoftgt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client
      .db('clinic_admin')
      .collection('clinicservices');

    app.get('/clinicservice', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const clinicservices = await cursor.toArray();
      res.send(clinicservices);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Clinic!');
});

app.listen(port, () => {
  console.log(`Clinic App listening on port ${port}`);
});
