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

async function saveWorkspace(req, res) {
 try {
  client = new Client({
   connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
  });
  await client.connect();
  console.log(req.body);
  client
   .query(
    `INSERT INTO workspace(name, logged_user, height, width, x_max, x_min, y_max, y_min, description, save_date, capas) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
     req.body.name,
     req.body.logged_user,
     req.body.height,
     req.body.width,
     req.body.x_max,
     req.body.x_min,
     req.body.y_max,
     req.body.y_min,
     req.body.description,
     req.body.date,
     req.body.capas
    ]
   )
   .then(() => {
    res.sendStatus(201);
   })
   .catch(e => console.error(e.stack));
 } catch (error) {
  console.log(`Save workspace error: ${error}`);
 }
}

async function getWsCount(req, res) {
 try {
  client = new Client({
   connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
  });

  await client.connect();
  client
   .query("SELECT COUNT(*) FROM workspace WHERE logged_user = $1;", [
    req.params.user
   ])
   .then(c => {
    if (c.rows[0].count > 0) res.status(200).send(c.rows[0]);
    else res.status(200).send(false);
   });
 } catch (error) {}
}

async function initial(req, res) {
 try {
  client = new Client({
   connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
  });

  await client.connect(err => {
   if (err) {
    client.end();
    console.log(err.message);
    res.status(400).json(err.message);
   } else {
    // obteniendo el último workspace si lo hay
    client
     .query(
      "SELECT layer FROM workspace WHERE logged_user = $1 ORDER BY id DESC LIMIT 1;",
      ["usr_p3bd2"]
     )
     .then(layer => {
      console.log(layer.rows[0].layer);
      res.status(200).send(layer.rows[0].layer);
     });
   }
  });
 } catch (error) {
  console.log("Error: " + error);
 }
}

async function update(req, res) {
 try {
  client = new Client({
   connectionString: `postgresql://${req.body.user}:${req.body.password}@${
    req.body.host
   }/${req.body.dbname}`
  });
  var query;
  console.log(req.body);
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
      })
      .catch(e => console.error(e.stack));
    });
   }
  });
 } catch (error) {
  console.log("Error: " + error);
 }
}

async function searchByName(req, res){
  try {
    client = new Client({
      connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
     });
     await client.connect();
     client.query("SELECT * FROM workspace WHERE name = $1", [req.params.name])
     .then(result => {res.status(200).send(result.rows[0]); })
     .catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

async function searchByDate(req, res){
  try {
    client = new Client({
      connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
     });
     await client.connect();
     client.query("SELECT * FROM workspace WHERE save_date = $1", [req.params.date])
     .then(result => res.status(200).send(result.rows[0]));
  } catch (error) {
    console.log(error);
  }
}

async function searchByDescription(req, res){
  try {
    client = new Client({
      connectionString: `postgresql://usr_p3bd2:usr_p3bd2@p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com/p3bd2`
     });
     await client.connect();
     client.query("SELECT * FROM workspace WHERE description = $1", [req.params.description])
     .then(result => res.status(200).send(result.rows[0]));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
 loginLocal: loginLocal,
 loginDBLink: loginDBLink,
 initial: initial,
 update: update,
 saveWorkspace: saveWorkspace,
 getWsCount: getWsCount,
 searchByName: searchByName,
 searchByDate: searchByDate,
 searchByDescription: searchByDescription
};
