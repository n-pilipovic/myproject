import { Config } from '../models/auth-config';


export const GoogleConfig: Config = {
    CLIENT_ID: '535134144664-agc4f53eru744e2ljsj436g1od2ee8ul.apps.googleusercontent.com', 
    CLIENT_SECRET: 'ZrjoH9FLJC27U8NJ5fbFQHB-', 
    REDIRECT_URL: 'https://localhost:4040/app/auth',
    AUTH_SCOPE: 'email profile https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose',
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth?',
    TOKEN_URL: 'https://www.googleapis.com/oauth2/v4/token',
    ACCESS_TYPE: 'offline',
    RESPONSE_TYPE: 'code',
    APP_STATE: 'home'
}