import * as service from './rsvp.service';
import sendEmailAsync from '../util/mailer';
export const rsvpAsync = (code) => service.findRowByCodeAsync(code);

export const createRsvpAsync = (code, opts) => {
  return service
    .updateRowByCodeAsync(code, opts)
    .then(r => {
      sendEmailAsync({
        subject: 'RSVP received!',
        body: JSON.stringify(opts, null, 4),
      });
      return r;
    });
};
