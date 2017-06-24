import GoogleSpreadsheet from 'google-spreadsheet';
import config from '../config';

export function rsvpAsync() {
  return Promise.resolve({
    message: 'coming soon!',
  });
}

export function createRsvpAsync() {
  return new Promise((resolve, reject) => {
    const sheet = new GoogleSpreadsheet(config.sheets.rsvpId);
    sheet.useServiceAccountAuth(config.sheets.creds, err1 => {
      if (err1) {
        reject(err1);
      } else {
        sheet.getRows(1, (err, rowData) => {
          if (!err) {
            const firstRow = rowData[0];
            firstRow.rsvpcount = 1;
            firstRow.save(err2 => {
              if (err2) reject(err2);
              resolve(rowData);
            });
          } else {
            reject(err);
          }
        });
      }
    });
  });
}
