## Get Phone Numbers

A function that wraps around the Google Sheets API, providing data from selected cells only 
if the correct password is provided. 

> **WARNING** Don't use this for highly sensitive data. It's open to brute force attacks.
> However, it's fine if you just want information to be inaccessible to the average snooper or robot

## Deploying to Google Cloud Functions

1. Create a Google Cloud project (or use and existing one)
2. In Google Cloud Console, go to `APIs & Services > Credentials` and create an API Key and restrict 
   access to the Google Sheets API
3. In Google Cloud Console, go to `IAM & Admin > Service Accounts` and make a note of the 
   App Service default service account (should be PROJECT_ID@appspot.gserviceaccount.com)
4. Go to the Google Sheets and share the spreadsheet with the service account from step 3 (read-only access)
5. Deploy the code from this repo using Google Cloud Functions and add the relevant environment variables:
   - `SPREADSHEET_ID`: You'll find this in the URL when you open it in Google sheets
   - `API_KEY`: The API Key created in step 2
   - `CLUB_PASSWORD`: Whatever you want your "top secret" password to be  

> NOTE: If you use the Google Cloud project for other things, it might be better to create a new service account and
> use that for the identity of the function ([see here for more info][1])

[1]: https://cloud.google.com/functions/docs/securing/function-identity
