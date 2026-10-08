import express from 'express'
import CommentsController from '../Controllers/comments.controller.js'

const router = express.Router();

router.get('/', CommentsController.getAll)

router.get('/:id', CommentsController.getById)

router.post('/', CommentsController.insert)

router.patch('/:id', CommentsController.update)

router.delete('/:id', CommentsController.deleteComment)

export default router;
