const { Pool } = require('pg');
const userDB = process.env.USERDB || 'postgres';
const passDB = process.env.PASSDB || '1234';
const database = process.env.DB || 'likeme';
const hostDB = process.env.HOSTDB || 'localhost';
const portDB = process.env.PORTDB || 5432;
const pool = new Pool({
    user: userDB,
    password: passDB,
    database: database,
    host: hostDB,
    port: portDB,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 2000
});
const conexion = async()=>{
    let client;
    try{
        client = await pool.connect();
        return client;
    }catch(err){
        console.error("Error de conexion", err);
    }
}

const agregar = async(dato)=>{
    let client = await conexion();
    try{
        const consulta = {
            text: "INSERT INTO posts(usuario, url, descripcion) VALUES($1, $2, $3)",
            values: dato
        };
        const result = await client.query(consulta);
        return result;

    }catch(err){
        console.error("Error de al registrar post en BD", err);
    }finally{
        client.release();
    }
}
const consultar = async()=>{
    let client = await conexion();
    try{
        const consulta = {
            text: "SELECT id, usuario, url, descripcion, likes FROM posts"
        }
        const result = await client.query(consulta);
        return result.rows;
    }catch(err){
        console.error("Error al consultar posts en BD",err);
    }finally{
        client.release();
    }
};
const like = async(id)=>{
    const client = await conexion(); 
    try{
        const consulta = {
            text: "UPDATE posts SET likes = likes + 1 WHERE id = $1",
            values: [id]
        }
        const result = await client.query(consulta);
        return result;
    }catch(err){
        console.error("Error al crear like DB")
    }
};


module.exports = { agregar, consultar, like };