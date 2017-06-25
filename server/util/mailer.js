import SparkPost from 'sparkpost';
import config from '../config';
import logger from '../util/logger';

export default function sendEmailAsync({ subject, body }) {
  const client = new SparkPost(config.sparkpostKey);
  const recipients = config.email.split(',').map(address => ({ address }));
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
