/* ===== app/auth.service.ts ===== */
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { Auth0Config }     from '../consts/auth0-config';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Auth0 options object
  options = {
    auth: {
      params: {
        connection_scopes: {
          'google-oauth2': ['email profile https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose']
        }
      }
    }
  };
  // Configure Auth0
  lock = new Auth0Lock(Auth0Config.AUTH0_CLIENT_ID, Auth0Config.AUTH0_DOMAIN, this.options);

  //Store profile object in auth class
  userProfile: Object;
  picSize: string = '?sz=36';
  redirectUrl: string;

  constructor() {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('google_token', authResult.accessToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
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
}