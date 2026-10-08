import db from '../Config/db.js'

async function getAll() {
    const [rows] = await db.query(
        "SELECT participants.pa_user, participants.pa_event, users.us_username, events.ev_title FROM participants INNER JOIN users ON users.us_id = participants.pa_user INNER JOIN events ON events.ev_id = participants.pa_event"
    );
    return rows;
}

async function getByUserId(userID) {
    const [rows] = await db.query(
        "SELECT participants.pa_user, participants.pa_event, events.ev_title, events.ev_description, events.ev_date, events.ev_location FROM participants INNER JOIN events ON events.ev_id = participants.pa_event WHERE participants.pa_user = ?",
        [userID]
    );
    return rows;
}

async function getByEventId(eventID) {
    const [rows] = await db.query(
        "SELECT participants.pa_user, participants.pa_event, users.us_username, users.us_email FROM participants INNER JOIN users ON users.us_id = participants.pa_user WHERE participants.pa_event = ?",
        [eventID]
    );
    return rows;
}

async function insert(userID, eventID) {
    const [result] = await db.query(
        "INSERT INTO participants (pa_user, pa_event) VALUES (?, ?)",
        [userID, eventID]
    );
    return result;
}

async function deleteParticipant(userID, eventID) {
    const [result] = await db.query(
        "DELETE FROM participants WHERE pa_user = ? AND pa_event = ?",
        [userID, eventID]
    );
    return result;
}

export default {
    getAll,
    getByUserId,
    getByEventId,
    insert,
    deleteParticipant
}
