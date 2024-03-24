const express = require("express");
const app = express();

//cors is a protocol that allows server to access (or not) one's website resources (route data, api requests, etc)
//We can provide cors with the "origin" argument as localhost or some URLs to allow a server to get data from it while other websites cannot.
const cors = require("cors");

//for connecting to our server
const pool = require("./db.js");
const { AodOutlined } = require("@mui/icons-material");

app.use(cors());
app.use(express.json()); //middleware that allows us to parse request.body as JSON.

/**ROUTES for CRUD operations**/

//Create a single streamer
app.post("/streamers", async (req, res) => {
    try {
        //body is the entire body we want to send in our request, it is not header information, it is the data portion.
        const {streamer_name, streamer_status, channel_link, channel_image_link} = req.body; //fill this object with the body of the request. (Which is a json object containing values for these keys.)
        
        //create our query for our pool.query to insert into our streamers table, into our four columns.
        //VALUES($1, $2, ...) which are placeholders for the values we will define that will be inserted into each of those columns (2nd set of parenthesis)
        //the values key will take in an array of values that will be used for the placeholders in the VALUES() statement.
        //The RETURNING statement will return the specified data we want to return, in this case we return all of the columns we inserted using *. (We can do something like RETURNING streamer_name to just return the streamer name after we insert.)
        const query = {
            text : "INSERT INTO streamers (streamer_name, streamer_status, channel_link, channel_image_link) VALUES($1, $2, $3, $4) RETURNING *",
            values : [streamer_name, streamer_status, channel_link, channel_image_link]
        };

        const newStreamerRes = await pool.query(query); //await response from query.
        res.json({'Created Streamer' : newStreamerRes.rows[0]}); //sends us a JSON response once our query completes. (newStreamerRes is the response we get back from the server, we just want the rows parameter from that response here.)
    }
    catch(error) {
        console.log(error.message);
    }
});

//Get all streamers
app.get("/streamers", async (req, res) => {
    try {
        //get all the streamers in our DB.
        const streamerList = await pool.query("SELECT * FROM streamers");
        res.json(streamerList.rows);
    }
    catch(err){
        console.error(err);
    }
});

//Get a single streamer (dynamic route)
app.get("/streamers/:id", async (req, res) => {
    try {
        //The parameters are the parameters passed in for our dynamic routes. 
        //Ie. For this route, id is dynamic. If we used a get request to '/streamers/2' This will print {id : '2'}
        //We can call our dynamic parameter whatever we want.
        console.log(req.params); //req.params is the parameters in the header. (Key value pair where id is the key and the id value is the value. (ie. id : 2))

        const {id} = req.params; //insert ID into our request parameters.
        const singleStreamer = await pool.query("SELECT * FROM streamers WHERE streamer_id = $1", [id]); //select from streamers table where the streamer id is the id passed in from our req.
        res.json(singleStreamer.rows[0]);
    }
    catch(err){
        console.error(err);
    }
});

//Update a single streamer
app.put("/streamers/:id", async (req, res) => {
    try {
        //To update, we need to include our id in our headers to specify what streamer_id to update in the DB.
        //We also need to have data in our req.body to allow us to change that specific streamer_id to the values we want for each column.  
        const {id} = req.params;
        const {streamer_name, streamer_status, channel_link, channel_image_link} = req.body;

        //Don't update if value for a specific column is null or empty.
        const updateStreamer = await pool.query(
            `UPDATE streamers 
                SET streamer_name = $2, 
                streamer_status = $3, 
                channel_link = $4, 
                channel_image_link = $5 
                WHERE streamer_id = $1;
            `, 
            [id, streamer_name, streamer_status, channel_link, channel_image_link]
        );

        //If a row was modified (rowCounter == 1)
        if(updateStreamer.rowCount == 1){
            res.json(`Streamer with streamer_id of ${id} was successfully modified.`);
        }
        else{
            res.json(`Row was not updated. Streamer with streamer_id of ${id} was not found in the table.`)
        }
    }
    catch(err){
        console.error(err);
    }
});

//Delete a streamer
app.delete("/streamers/:id", async (req, res) => {
    try{
        const {id} = req.params;

        //Get the to be deleted streamer row to display in console
        const getToBeDeletedStreamer = await pool.query(
            `SELECT * FROM streamers WHERE streamer_id = $1`, 
            [id]
        );
        
        //delete the row
        const deleteStreamer = await pool.query(
            `DELETE FROM streamers WHERE streamer_id = $1`,
            [id]
        );
        
        //rowCount is the number of rows affected by the last SQL statement.
        let rowCount = deleteStreamer.rowCount;

        if(rowCount == 0){
            res.json("No rows were deleted. The streamer_id does not exist in the database."); //if row was not found
        }
        else{
            res.json({deleted : getToBeDeletedStreamer.rows[0]}); //display the row that was deleted.
        }
    }
    catch(err){
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000.")
});