import GoogleSpreadsheet from 'google-spreadsheet';
import config from '../config';

const transformRow = gRow => ({
  code: gRow.code,
  names: gRow.names,
  size: Number(gRow.partysize),
  count: Number(gRow.rsvpcount),
  attending: gRow.rsvpattending && gRow.rsvpattending.split(','),
  message: gRow.rsvpmessage,
});

export function findRowByCodeAsync(code, { transform = true } = {}) {
  return new Promise((resolve, reject) => {
    const sheet = new GoogleSpreadsheet(config.sheets.rsvpId);
    sheet.useServiceAccountAuth(config.sheets.creds, err1 => {
      if (err1) {
        reject(err1);
      } else {
        sheet.getRows(1, (err, rowData) => {
          if (err) {
            reject(err);
            return;
          }

          const match = rowData.find(r => r.code.toUpperCase() === code.toUpperCase());
          if (match) resolve(transform ? transformRow(match) : match);
          else reject(new Error('Code match not found'));
        });
      }
    });
  });
}

export function updateRowByCodeAsync(code, { count = 0, message = '', attending = [] }) {
  return findRowByCodeAsync(code, { transform: false })
    .then(row => {
      const updateRow = row;
      updateRow.rsvpcount = count;
      updateRow.rsvpmessage = message;
      updateRow.rsvpattending = attending.join(', ');
      return new Promise((resolve, reject) => {
        updateRow.save(err => {
          if (err) reject(err);
          else resolve(transformRow(updateRow));
        });
      });
    });
}
