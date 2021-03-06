const Pool = require("pg").Pool;
require("dotenv").config();
const {Client} = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

const createUsersTable = `CREATE TABLE IF NOT EXISTS "users" (
	    ID  SERIAL PRIMARY KEY,
    	email character varying NOT NULL,
    	password character varying NOT NULL,
    	followers integer,
    	following integer,
		UNIQUE(email) )`;
const createUser1 =
	"INSERT INTO users(email, password, followers, following) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING";
const createUser2 =
	"INSERT INTO users(email, password, followers, following) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING";

pool.query(createUsersTable, (err, res) => {
	if (err) {
		console.log("could not create table USERS");
	}
	console.log(res);
	pool.query(createUser1, ["ahmer@123.com", "abcd", 0, 0], (err, res) => {
		if (!err) {
			console.log("Added user Ahmer");
		}
	});
	pool.query(createUser2, ["max@234.com", "1234", 0, 0], (err, res) => {
		if (!err) {
			console.log("Added user Max");
		}
	});
});

module.exports = {
	pool: pool,
};
