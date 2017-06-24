import { Router } from 'express';
import * as RsvpController from '../controllers/rsvp.controller';
const router = new Router();

router.route('/rsvp').get(RsvpController.rsvp);

export default router;
