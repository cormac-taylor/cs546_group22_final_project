import * as validation from '../utilities/validation.js';
import bcrypt from 'bcrypt';

const exportedMethods = {
    /* Hashes provided plaintext password */
    async hashPassword(plainTextPass){
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainTextPass, saltRounds);
        
        return hash;
    },
}

export default exportedMethods;