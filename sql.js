import mysql from 'mysql2/promise';
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paint_by_number',
});

export default {
    insert: {
        image: async (imageData) => {
            const uuid = uuidv4();
            const [results] = await connection.query(
                'INSERT INTO image (uid, image) VALUES (?, ?);',
                [uuid, imageData]
            );

            return results;
        }
    }
}
