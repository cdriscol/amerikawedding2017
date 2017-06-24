import { Router } from 'express';
import * as RsvpController from '../controllers/rsvp.controller';
const router = new Router();

router.route('/rsvp').get((req, res) => RsvpController.rsvpAsync().then(r => res.json(r)));

function rsvpPost({ body }, res) {
  return RsvpController
    .createRsvpAsync()
    .then(r => res.json(r))
    .catch(err => res.status(400).send(err));
}
router.route('/rsvp').post(rsvpPost);

export default router;
