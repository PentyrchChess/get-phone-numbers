const {google} = require('googleapis');

exports.getPhoneNumbers = (req, res) => {
  
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    }
    
  
    if (req.query.password !== process.env.CLUB_PASSWORD){
      res.status(401).send({ error : "Invalid Password"});
      return;
    }
      
    google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
    .then(auth => {
            const sheets = google.sheets({version: 'v4', auth });
            return sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SPREADSHEET_ID,
                key: process.env.API_KEY,
                range: 'Contacts!A1:G'})
            })
    .then(function(response) {  
        res.status(200).send(response.data.values);
    }, function(response) {
        res.status(500).send({ error : response});
    })
    .catch(err =>
        res.status(500).send({ error : err})
    );
};