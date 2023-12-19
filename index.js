const pg = require('pg')
const client = new pg.Client('postgres://localhost/block31_backend')
const cors = require('cors')
const express = require('express');
const app = express();

app.use(cors())

app.get('/api/petshop', async (req, res, next) => {
    try {
        const SQL=`
            SELECT *
            FROM petshop
        `
        const response = await client.query(SQL)
        console.log(response)
        res.send(response.rows)
    } catch(error) {
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("connected to database")
    const SQL = `
        DROP TABLE IF EXISTS petshop;
        CREATE TABLE petshop(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
        INSERT INTO petshop (name) VALUES ('Sally');
        INSERT INTO petshop (name) VALUES ('Fido');
    `

    await client.query(SQL)
    console.log("table created")

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

}

init()




