import { Db } from '../types'

const { DB_TYPE } = process.env;

let db: Db;

switch (DB_TYPE) {
    case 'firebase':
        db = require('./dbs/firebase');
        break;
    default:
        db = require('./dbs/firebase');
        break;
}

export default db;