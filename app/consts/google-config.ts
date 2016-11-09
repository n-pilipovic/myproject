import { Config } from '../models/auth-config';


export const GoogleConfig: Config = {
    CLIENT_ID: '535134144664-agc4f53eru744e2ljsj436g1od2ee8ul.apps.googleusercontent.com',
    CLIENT_SECRET: 'ZrjoH9FLJC27U8NJ5fbFQHB-',
    REDIRECT_URL: process.env.GMAIL_API_CALLBACK_URL,
    AUTH_SCOPE: 'email profile https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send',
    AUTH_URL: 'https://accounts.google.com/o/oauth2/auth?redirect_uri={callbackUrl}&response_type={responseType}&client_id={clientId}&scope={scopes}',
    TOKEN_URL: 'https://www.googleapis.com/oauth2/v4/token',
    USER_INFO_URL: 'https://www.googleapis.com/plus/v1/people/me',
    ACCESS_TYPE: 'offline',
    RESPONSE_TYPE: 'token',
    APP_STATE: 'home'
}