import express from 'express'
import UsersController from '../Controllers/users.controller.js'

const router = express.Router();


router.get('/', UsersController.getAll)

router.get('/:id', UsersController.getById)

router.patch('/:id', UsersController.update)

router.post("/", UsersController.insert)

router.delete("/:id", UsersController.deleteUser);

export default router;