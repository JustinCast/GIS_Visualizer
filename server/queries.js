const { Client } = require("pg");
var client;

async function login(req, res) {
  try {
    client = new Client({ connectionString: String(req.body.conn) });

    await client.connect();
    res.status(200).json({ logged: true });
  } catch (error) {
    console.log(error);
  }
}
