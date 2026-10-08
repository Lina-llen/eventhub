import ParticipantsModel from '../Models/participants.model.js'

async function getAll(req,res) {
    try {
        const participants = await ParticipantsModel.getAll();
        res.json(participants);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des participants"})
    }
}

async function getByUserId(req,res) {
    try {
        const userID = req.params.userID;
        const participants = await ParticipantsModel.getByUserId(userID);
        res.json(participants);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des événements de l'utilisateur"})
    }
}

async function getByEventId(req,res) {
    try {
        const eventID = req.params.eventID;
        const participants = await ParticipantsModel.getByEventId(eventID);
        res.json(participants);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des participants de l'événement"})
    }
}

async function insert(req,res) {
    try {
        let userID = req.body.user;
        let eventID = req.body.event;
        if (!userID) {
            userID = req.body.userID;
        }
        if (!eventID) {
            eventID = req.body.eventID;
        }
        if (!userID || !eventID) {
            return res.status(403).json({error: "L'utilisateur (user) et l'événement (event) sont obligatoires !"});
        }
        await ParticipantsModel.insert(userID, eventID);
        res.status(201).json({message: "L'utilisateur a bien été inscrit à l'événement", user: userID, event: eventID});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de l'inscription du participant"});
    }
}

async function deleteParticipant(req,res) {
    try {
        const userID = req.params.userID;
        const eventID = req.params.eventID;
        const deleted = await ParticipantsModel.deleteParticipant(userID, eventID);
        if (deleted.affectedRows === 0) {
            return res.status(404).json({error: "Cette inscription n'existe pas"});
        }
        res.json({message: "L'utilisateur a bien été désinscrit de l'événement"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la désinscription du participant"});
    }
}

export default {
    getAll,
    getByUserId,
    getByEventId,
    insert,
    deleteParticipant
}
