const creds = require('../../creds.json');

export default {
  port: process.env.PORT || 8000,
  gaTrackingId: 'UA-101617896-1',
  sheets: {
    creds,
    rsvpId: process.env.RSVP_ID,
  },
};
