import db from '../Config/db.js'

async function getAll() {
    const [rows] = await db.query("SELECT us_id, us_username, us_email FROM users");
    return rows;
}

async function getById(id) {
    const [rows] = await db.query("SELECT us_id, us_username, us_email FROM users WHERE us_id = ?", [id]);
    return rows;
}

async function getByLogin(login) {
    const [rows] = await db.query("SELECT us_username, us_email, us_password FROM users WHERE us_username = ?", [login]);
    return rows[0];
}

async function update(id, user) {
    const updated = await db.query("UPDATE users SET us_username = ?, us_email=? WHERE us_id=?",
        [user.us_username, user.us_email, id]);
    return updated;
}

async function insert(user) {
    const [rows] = await db.query("INSERT INTO users (us_username, us_email, us_password) VALUES (?, ?, ?)", [user.username, user.email, user.password]);
    return rows;
}

async function deleteUser(id) {
    const [rows] = await db.query("DELETE FROM users WHERE us_id = ?", [id]);
    return rows;
}

export default {
    getAll,
    getById,
    getByLogin,
    update,
    insert,
    deleteUser
}