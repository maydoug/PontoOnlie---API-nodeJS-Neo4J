require('dotenv').config();
/* const nanoid = require('nanoid'); */
import { v4 as uuidv4 } from 'uuid';

const neo4j = require('neo4j-driver');
const {
    db_url,
    db_username,
    db_password,
    db_database,
} = process.env

const driver = neo4j.driver(db_url, neo4j.auth.basic(db_username, db_password));
const session = driver.session({ db_database });

const findAll = async () => {
    const result = await session.run(`Match (u:User) return u`)
    return result.records.map(i => i.get('u').properties)
}

const findById = async (id) => {
    const result = await session.run(`MATCH (u:User {id : '${id}'}) return u limit 1`)
    return result.records[0].get('u').properties
}

const create = async (user) => {
    const pk_id = uuidv4();
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var hora = String(data.getHours());
    var min = String(data.getMinutes());
    var dataAtual = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + min;
    await session.run(`CREATE (u:User {id : '${pk_id}', name: '${user.name}', email: '${user.email}', password: '${user.password}', createdAt: '${dataAtual}' }) return u`)
    return await findById(pk_id)
}

const findByIdAndUpdate = async (id, user) => {
    const result = await session.run(`MATCH (u:User {id : '${id}'}) SET u.name= '${user.name}', u.email= '${user.email}', u.password= '${user.password}' return u`)
    return result.records[0].get('u').properties
}

const findByIdAndDelete = async (id) => {
    await session.run(`MATCH (u:User {id : '${id}'}) DELETE  u`)
    return await findAll()
}

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete
}