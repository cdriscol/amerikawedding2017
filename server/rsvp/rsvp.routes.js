import { Router } from 'express';
import * as RsvpController from './rsvp.controller';
const router = new Router();

router.route('/rsvp/:code').get(({ params: { code } }, res) => {
  return RsvpController
    .rsvpAsync(code)
    .then(r => { res.json(r); })
    .catch(() => res.status(404).send());
});

router.route('/rsvp/:code').post(({ body, params: { code } }, res) => {
  return RsvpController
    .createRsvpAsync(code, body)
    .then(r => { res.json(r); })
    .catch(() => res.status(404).send());
});

export default router;
