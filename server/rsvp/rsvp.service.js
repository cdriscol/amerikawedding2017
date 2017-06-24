import GoogleSpreadsheet from 'google-spreadsheet';
import config from '../config';

export function findRowByCodeAsync(code) {
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

          const match = rowData.find(r => r.code === code);
          if (match) resolve(match);
          else reject(new Error('Code match not found'));
        });
      }
    });
  });
}

export function updateRowByCodeAsync(code, { count }) {
  return findRowByCodeAsync(code)
    .then(row => {
      const updateRow = row;
      updateRow.rsvpcount = count;
      return new Promise((resolve, reject) => {
        updateRow.save(err => {
          if (err) reject(err);
          else resolve(updateRow);
        });
      });
    });
}
