import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/env/env';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  firebaseApp: FirebaseApp;
  firebaseDb: Firestore;

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firebaseDb = getFirestore(this.firebaseApp);
  }
}
