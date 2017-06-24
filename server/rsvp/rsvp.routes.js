import { Router } from 'express';
import logger from '../util/logger';
import * as RsvpController from './rsvp.controller';
const router = new Router();

const handleError = (res, e) => {
  logger.error(e);
  if (e.message.indexOf('not found') > -1) res.status(404).send();
  else res.status(500).send();
};

router.route('/rsvp/:code').get(({ params: { code } }, res) => {
  return RsvpController
    .rsvpAsync(code)
    .then(r => { res.json(r); })
    .catch(handleError.bind(null, res));
});

router.route('/rsvp/:code').post(({ body, params: { code } }, res) => {
  return RsvpController
    .createRsvpAsync(code, body)
    .then(r => { res.json(r); })
    .catch(handleError.bind(null, res));
});

export default router;
