import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticatedUser: Observable<firebase.User | null>;

  constructor(private auth: AngularFireAuth) {
    this.authenticatedUser = auth.authState;
  }

  authenticate(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.auth.signOut();
  }

  resetPassword(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email);
  }
}
