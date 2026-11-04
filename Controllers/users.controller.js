import eventsModel from '../Models/events.model.js';
import commentModel from '../Models/comments.model.js';
import ParticipantsModel from '../Models/participants.model.js';
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

async function getMe(req,res){
    try {
        const users = await UsersModel.getById(req.user.id);
        if (users.length === 0) {
            return res.status(404).json({error: "L'utilisateur n'existe pas"});
        }

        const user = users[0];
        const events = await eventsModel.getByUserId(user.us_id);
        const comments = await commentModel.getByUserId(user.us_id);
        const participations = await ParticipantsModel.getByUserId(user.us_id);
        user.events = events;
        user.comments = comments;
        user.participations = participations;
        res.json(user);
    } catch(error) {
        res.status(500).json({error : "Une erreur est survenue lors de la récupération de profile"})
    }
}

async function resetPassword(req,res){
    try {
        const {old_password, new_password, confirm_password} = req.body;
        if (!old_password || !new_password || !confirm_password) {
            return res.status(400).json({error: "L'ancien mot de passe, le nouveau mot de passe et sa confirmation sont obligatoires"});
        }
        if (new_password !== confirm_password) {
            return res.status(400).json({error: "La confirmation du nouveau mot de passe ne correspond pas"});
        }

        const user = await UsersModel.getPasswordById(req.user.id);
        if (!user) {
            return res.status(404).json({error: "L'utilisateur n'existe pas"});
        }

        const verifyPassword = await bcrypt.compare(old_password, user.us_password);
        if (!verifyPassword) {
            return res.status(403).json({error: "Ancien mot de passe incorrect"});
        }

        const hashPassword = await bcrypt.hash(new_password, 10);
        await UsersModel.updatePassword(user.us_id, hashPassword);
        res.status(201).json({message: "Votre mot de passe a bien été modifié"});
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la modification du mot de passe"});
    }
}


export default {
    getAll,
    getById,
    update,
    insert,
    deleteUser,
    getMe,
    resetPassword
}
