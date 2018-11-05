const { Client } = require("pg");
var client;
const connstring;
async function login(req, res) {
  try {
    client = new Client({ connectionString: String(req.body.conn) });
    connstring = String(req.body.conn);
    await client.connect();
    res.status(200).json({ logged: true });
  } catch (error) {
    console.log(error);
  }
}

async function column_concat(req, res) {
  try {
    client = new Client({connectionString: connstring});
    await client.connect();
    let result = client.query(`SELECT STRING_AGG(COLUMN_NAME, ',') FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = $1 AND TABLE_NAME = $2 AND NOT (udt_name='geometry')`, [req.params.schema, req.params.table_name]);
    res.send({ result: result});
  } catch (error) {
    console.log(error);
  }
}

async function st_asgeojson(req, res) {
  try {
    client = new Client({connectionString: connstring});
    await client.connect();
    let result = client.query(`select string_agg('st_asgeojson('||column_name||')::json as geom',',') from information_schema.columns 
    where table_schema = $1 and table_name = $2 and udt_name='geometry'"`, [req.params.schema, req.params.table_name]);
    res.send({ result: result});
  } catch (error) {
    console.log(error);
  }
}

async function save(req, res) {
  
}


module.exports = {
  column_concat: column_concat,
  login: login,
  st_asgeojson: st_asgeojson
}