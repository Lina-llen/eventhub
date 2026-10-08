import db from '../Config/db.js'

async function getAll() {
    const [rows] = await db.query("SELECT ev_id, ev_title, ev_description, ev_date, ev_location FROM events");
    return rows;
}

async function getById(id) {
    const [rows] = await db.query(
        "SELECT events.ev_id, events.ev_title, events.ev_description, events.ev_date, events.ev_location, events.ev_owner, users.us_username, users.us_email FROM events INNER JOIN users ON users.us_id = events.ev_owner WHERE events.ev_id = ?", 
        [id]
    );
    return rows;
}

async function update(id, event) {
    const [status] = await db.query(
        "UPDATE events SET ev_title = ?, ev_description = ?, ev_date = ?, ev_location = ? WHERE ev_id = ?",
        [event.ev_title, event.ev_description, event.ev_date, event.ev_location, id]
    );
    return status;
}

async function insert(event) {
    const inserted = await db.query(
        "INSERT INTO events (ev_title, ev_description, ev_date, ev_location, ev_owner) VALUES (?, ?, ?, ?, ?)",
        [event.title, event.description, event.date, event.location, event.owner]
    );
    return inserted;
}

async function deleteEvent(id) {
    const [rows] = await db.query("DELETE FROM events WHERE ev_id = ?", [id]);
    return rows;
}

export default {
    getAll,
    getById,
    update,
    insert,
    deleteEvent
}