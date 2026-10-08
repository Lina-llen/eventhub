import db from '../Config/db.js'

async function getAll() {
    const [rows] = await db.query(
        "SELECT comments.co_id, comments.co_comment, comments.co_user, comments.co_event, users.us_username, events.ev_title FROM comments INNER JOIN users ON users.us_id = comments.co_user INNER JOIN events ON events.ev_id = comments.co_event"
    );
    return rows;
}

async function getById(id) {
    const [rows] = await db.query(
        "SELECT comments.co_id, comments.co_comment, comments.co_user, comments.co_event, users.us_username, events.ev_title FROM comments INNER JOIN users ON users.us_id = comments.co_user INNER JOIN events ON events.ev_id = comments.co_event WHERE comments.co_id = ?",
        [id]
    );
    return rows;
}

async function insert(comment) {
    const [result] = await db.query(
        "INSERT INTO comments (co_comment, co_user, co_event) VALUES (?, ?, ?)",
        [
            comment.comment,
            comment.user,
            comment.event
        ]
    );
    return result;
}

async function update(id, text) {
    const [result] = await db.query(
        "UPDATE comments SET co_comment = ? WHERE co_id = ?",
        [text, id]
    );
    return result;
}

async function deleteComment(id) {
    const [result] = await db.query(
        "DELETE FROM comments WHERE co_id = ?",
        [id]
    );
    return result;
}

export default {
    getAll,
    getById,
    insert,
    update,
    deleteComment
}
