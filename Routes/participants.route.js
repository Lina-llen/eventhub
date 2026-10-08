import express from 'express'
import ParticipantsController from '../Controllers/participants.controller.js'

const router = express.Router();

router.get('/', ParticipantsController.getAll)

router.get('/user/:userID', ParticipantsController.getByUserId)

router.get('/event/:eventID', ParticipantsController.getByEventId)

router.post('/', ParticipantsController.insert)

router.delete('/:userID/:eventID', ParticipantsController.deleteParticipant)

export default router;