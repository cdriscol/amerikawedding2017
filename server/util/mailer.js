import SparkPost from 'sparkpost';
import config from '../config';
import logger from '../util/logger';
const client = new SparkPost(config.sparkpostKey);

const recipients = config.email.split(',').map(address => ({ address }));
export default function sendEmailAsync({ subject, body }) {
  return client.transmissions.send({
    content: {
      from: 'noreply@amerikawedding2017.com',
      subject,
      text: body,
    },
    recipients,
  })
    .then(data => {
      logger.log('sendEmail', data);
    })
    .catch(err => {
      logger.error('sendEmail', err);
    });
}
