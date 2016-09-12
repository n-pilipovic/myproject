/* ===== app/auth.service.ts ===== */
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { GoogleConfig }     from '../consts/google-config';

@Injectable()
export class Auth {

  // We need this after google redirect with code in query params
  tokenData = ''.concat('redirect_uri=', GoogleConfig.REDIRECT_URL, '&grant_type=authorization_code', '&client_id=', GoogleConfig.CLIENT_ID, '&client_secret=', GoogleConfig.CLIENT_SECRET);

  //Store profile object in auth class
  userProfile: Object;
  picSize: string = '?sz=36';

  constructor() {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    // this.lock.on("authenticated", (authResult) => {
    //   localStorage.setItem('id_token', authResult.idToken);
    //   localStorage.setItem('google_token', authResult.accessToken);

    //   // Fetch profile information
    //   this.lock.getProfile(authResult.idToken, (error, profile) => {
    //     if (error) {
    //       // Handle error
    //       alert(error);
    //       return;
    //     }
    //     localStorage.setItem('profile', JSON.stringify(profile));
    //     this.userProfile = profile;
    //   });
    // });
  }

  public login() {
    // Call the method to redirect to google for getting access token.
    this.getAccess();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('google_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };

  private getAccess() {
    window.location.href = this.createTokenUrl();
  }

  private createTokenUrl():string {
    var retUrl = GoogleConfig.AUTH_URL;
    retUrl = retUrl.concat('scope=', GoogleConfig.AUTH_SCOPE,
                           '&client_id=', GoogleConfig.CLIENT_ID,
                           '&response_type=', GoogleConfig.RESPONSE_TYPE,
                           '&state=', GoogleConfig.APP_STATE,
                           '&redirect_uri=', GoogleConfig.REDIRECT_URL,
                           '&access_type=', GoogleConfig.ACCESS_TYPE);
    return retUrl;
  }
}