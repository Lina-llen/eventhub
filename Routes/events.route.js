import express from 'express'
import  EventsController from '../Controllers/events.controller.js'

const router = express.Router();


router.get('/', EventsController.getAll)

router.get('/:id', EventsController.getById)

router.patch('/:id', EventsController.update)

router.post("/", EventsController.insert)

router.delete("/:id", EventsController.deleteEvent);

export default router;