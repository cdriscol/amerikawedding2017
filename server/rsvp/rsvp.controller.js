import * as service from './rsvp.service';
export const rsvpAsync = (code) => service.findRowByCodeAsync(code);
export const createRsvpAsync = (code, opts) => service.updateRowByCodeAsync(code, opts);
