import EventsModel from '../Models/events.model.js'

async function getAll(req,res) {
    try {
        const events = await EventsModel.getAll();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des events"})
    }
}

async function getById(req,res) {
    try {
        const id = req.params.id;
        const events = await EventsModel.getById(id);
        if (events.length === 0) {
            return res.status(404).json({error: "L'event n'existe pas !"});
        }
        res.json(events[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération du event"})
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        let eventToUpdate = await EventsModel.getById(id);
        if (eventToUpdate.length === 0) {
            return res.status(404).json({ "error": "L' event n'existe pas !" });
        }
        eventToUpdate = eventToUpdate[0];
        if (body.title) {
            eventToUpdate.ev_title = body.title;
        }
        if (body.date) {
            eventToUpdate.ev_date = body.date;
        }
        if (body.description) {
            eventToUpdate.ev_description = body.description;
        }
        if (body.location) {
            eventToUpdate.ev_location = body.location;
        }
        await EventsModel.update(id, eventToUpdate);
        res.json({
            message: "Votre event à bien été modifié",
            event: {
                ev_id: eventToUpdate.ev_id,
                ev_title: eventToUpdate.ev_title,
                ev_description: eventToUpdate.ev_description,
                ev_date: eventToUpdate.ev_date,
                ev_location: eventToUpdate.ev_location
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la modification de l'event" });
    }
}

async function insert(req,res){
    try {
        const body = req.body;
        if (!body.title || !body.owner) {
            return res.status(403).json({error : "Le titre et le owner sont obligatoire !"})
        }

        const inserted = await EventsModel.insert(body);
        res.status(201).json(inserted);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Erreur lors de l'insertion de l'event"});
    }
}


async function deleteEvent(req,res) {
    try {
        const id = req.params.id;
        const event = await EventsModel.getById(id);
        if (event.length === 0) {
            return res.status(404).json({error : "L'event n'existe pas !"})
        }
        const deleted = await EventsModel.deleteEvent(id);
        res.json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Une erreur est survenu lors de la suppression du event"})   
        
    }
}

export default {
    getAll,
    getById,
    update,
    insert,
    deleteEvent
}   