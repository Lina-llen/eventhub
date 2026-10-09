import UsersModel from '../Models/users.model.js'
import bcrypt from 'bcrypt';

async function getAll(req,res) {
    try {
        const users = await UsersModel.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des users"})
    }
}

async function getById(req,res) {
    try {
        const id = req.params.id;
        const users = await UsersModel.getById(id);
        if (users.length === 0) {
            return res.status(404).json({error : "L'utilisateur n'existe pas"});
        }
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({error: "Une erreur est survenue lors de la récupération du user"})
    }
}

async function update(req,res) {
    try {
        const id = req.params.id;
        const body = req.body;
        
        let userToUpdate = await UsersModel.getById(id);
        if (userToUpdate.length === 0) {
            return res.status(404).json({error : "L'utilisateur n'existe pas"})
        }
        userToUpdate = userToUpdate[0];

        if(body.username){
            userToUpdate.us_username = body.username;
        }
        
        if(body.email){
            userToUpdate.us_email = body.email;
        }

        const updated = await UsersModel.update(id, userToUpdate)
        res.json({message: "Votre modification a bien été effectué", user : userToUpdate});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Une erreur est survenu lors de la modification du user"})
    }
}

async function insert(req,res) {
    try {
        const body = req.body;
        body.password = bcrypt.hashSync(body.password, 10);

        const inserted = await UsersModel.insert(body);
        res.status(201).json(inserted)
    } catch (error) {
        res.status(500).json({error: "Une erreur est survenu lors de l'insertion du user"})   
    }
}

async function deleteUser(req,res) {
    try {
        const id = req.params.id;
        const user = await UsersModel.getById(id);
        if (user.length === 0) {
            return res.status(404).json({error : "L'utilisateur n'existe pas !"})
        }
        const deleted = await UsersModel.deleteUser(id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({error: "Une erreur est survenu lors de la suppression du user"})   
        
    }
}

export default {
    getAll,
    getById,
    update,
    insert,
    deleteUser
}
