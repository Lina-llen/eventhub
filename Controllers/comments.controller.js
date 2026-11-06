import CommentsModel from '../Models/comments.model.js'

async function getAll(req,res) {
    try {
        const comments = await CommentsModel.getAll();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des commentaires"})
    }
}

async function getById(req,res) {
    try {
        const id = req.params.id;
        const comments = await CommentsModel.getById(id);
        if (comments.length === 0) {
            return res.status(404).json({error: "Le commentaire n'existe pas !"});
        }
        res.json(comments[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération du commentaire"})
    }
}

async function insert(req,res) {
    try {
        const { comment: commentText, event: eventID } = req.body ?? {};
        const userID = req.user?.id;
        if (!userID) {
            return res.status(401).json({error: "L'utilisateur doit être connecté pour ajouter un commentaire."});
        }
        if (!commentText?.trim() || !eventID) {
            return res.status(400).json({error: "Le commentaire (comment) et l'événement (event) sont obligatoires !"});
        }

        const inserted = await CommentsModel.insert({
            comment: commentText.trim(),
            user: userID,
            event: eventID
        });
        res.status(201).json(inserted);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de l'ajout du commentaire"});
    }
}

async function update(req,res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const commentText = body.comment;
        if (!commentText) {
            return res.status(403).json({error: "Le texte du commentaire est obligatoire !"});
        }

        const comments = await CommentsModel.getById(id);
        if (comments.length === 0) {
            return res.status(404).json({error: "Le commentaire n'existe pas !"});
        }

        await CommentsModel.update(id, commentText);
        res.json({message: "Votre commentaire a bien été modifié", comment: commentText});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la modification du commentaire"});
    }
}

async function deleteComment(req,res) {
    try {
        const id = req.params.id;
        const comments = await CommentsModel.getById(id);
        if (comments.length === 0) {
            return res.status(404).json({error: "Le commentaire n'existe pas !"});
        }

        const deleted = await CommentsModel.deleteComment(id);
        res.json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la suppression du commentaire"});
    }
}

export default {
    getAll,
    getById,
    insert,
    update,
    deleteComment
}
