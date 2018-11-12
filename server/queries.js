const { Client } = require("pg");
var client;
let connstring;
let dblinkString;
async function loginDBLink(req, res) {
  try {
    client = new Client({ connectionString: String(req.body.conn) });
    dblinkString = String(req.body.conn);
    await client.connect();
    res.status(200).json({ logged: true });
  } catch (error) {
    console.log(error);
  }
}

async function loginLocal(req, res) {
  try {
    client = new Client({
      connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
    });
    connstring = `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`;
    await client.connect();
    res.status(200).json({ logged: true });
  } catch (error) {
    console.log(error);
  }
}

async function column_concat(req, res) {
  try {
    client = new Client({ connectionString: connstring });
    await client.connect();
    let result = client.query(
      `SELECT STRING_AGG(COLUMN_NAME, ',') FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = $1 AND TABLE_NAME = $2 AND NOT (udt_name='geometry')`,
      [req.params.schema, req.params.table_name]
    );
    res.send({ result: result });
  } catch (error) {
    console.log(error);
  }
}

async function st_asgeojson(req, res) {
  try {
    client = new Client({ connectionString: connstring });
    await client.connect();
    let result = client.query(
      `select string_agg('st_asgeojson('||column_name||')::json as geom',',') from information_schema.columns 
    where table_schema = $1 and table_name = $2 and udt_name='geometry'"`,
      [req.params.schema, req.params.table_name]
    );
    res.send({ result: result });
  } catch (error) {
    console.log(error);
  }
}

async function save(req, res) {}

async function initial(req, res) {
  try {
    console.log(req.body);
    client = new Client({
      connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
    });
    //await client.connect();
    var colums_desc;
    var colums_geom;
    var query;
    await client.connect(err => {
      if (err) {
        client.end();
        console.log(err.message);
        res.status(400).json(err.message);
      } else {
        const query1 =
          `select string_agg(column_name,',') from information_schema.columns 
            where table_schema='` +
          req.body.schema +
          `' and table_name='` +
          req.body.geotabla +
          `' and not(udt_name='geometry')`;
        const query2 =
          `select string_agg('st_asgeojson('||column_name||')::json as geom',',') from information_schema.columns 
            where table_schema='` +
          req.body.schema +
          `' and table_name='` +
          req.body.geotabla +
          `' and udt_name='geometry'`;
        client.query(query1).then(data => {
          this.colums_desc = data.rows;
        });
        client.query(query2).then(data2 => {
          this.colums_geom = data2.rows;
          query =
            `select ` +
            this.colums_desc[0].string_agg +
            `,st_xmin(geom) xmin,st_xmax(geom) xmax,st_ymin(geom) ymin,st_ymax(geom) ymax,` +
            this.colums_geom[0].string_agg +
            ` from ` +
            req.body.schema +
            `.` +
            req.body.geotabla;

          client
            .query(query)
            .then(data3 => {
              res.status(200).json(data3.rows);
              client.end();
            })
            .catch(e => console.error(e.stack));
        });
      }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

module.exports = {
  column_concat: column_concat,
  loginLocal: loginLocal,
  loginDBLink: loginDBLink,
  st_asgeojson: st_asgeojson,
  initial: initial
};
