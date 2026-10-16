import UsersModel from '../Models/users.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

async function register(req,res) {
    try {
        const body = req.body;
        if (!body.username || !body.email || !body.password) {
            return res.status(403).json({error: "Le username, l'email et le password sont obligatoires"});
        }

        body.password = bcrypt.hashSync(body.password, 10);
        const inserted = await UsersModel.insert(body);
        res.status(201).json(inserted);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de l'inscription"});
    }
}

async function login(req,res) {
    try {
        const body = req.body;
        if (!body.username || !body.password) {
            return res.status(403).json({error: "Le login et le password sont obligatoires"});
        }

        const user = await UsersModel.getByLogin(body.username);
        if (!user) {
            return res.status(403).json({error: "Identifiants incorrects"});
        }

        const compare = bcrypt.compareSync(body.password, user.us_password);
        if (!compare) {
            return res.status(403).json({error: "Identifiants incorrects"});
        }

        const token = jwt.sign(
            {user: {id: user.us_id, username: user.us_username, email: user.us_email}},
            process.env.JWT_SECRET,
            {"expiresIn": "1h"}
        );
        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la connexion"});
    }
}

export default {
    register,
    login
}
