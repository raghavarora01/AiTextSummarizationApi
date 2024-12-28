import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const pool = mysql.createPool({
     host: process.env.MYSQL_ADDON_HOST,
     port: process.env.MYSQL_ADDON_PORT,
     user:process.env.MYSQL_ADDON_USER,
     database: process.env.MYSQL_ADDON_DB,
     password: process.env.MYSQL_ADDON_PASSWORD
})
pool.query('SELECT * FROM TextSummarization', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
});
export default pool;