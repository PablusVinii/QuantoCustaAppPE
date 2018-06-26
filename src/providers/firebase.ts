import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseProvider {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  //Save user on firestore
  saveUser(data) {
    return this.afs.collection('Users').doc(data.$key).update(data);
  }


  //Create user on firestore
  postUser(data) {
    return this.afs.collection('Users').doc(data.uid).set(data);
  }

  //Create order on firestore
  postOrder(data) {
    return this.afs.collection('Orders').add(data);
  }

  //Get current user from uid
  getCurrentUser(uid) {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Users', ref => ref.where('uid', '==', uid))
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }

  //Get products
  getProducts() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Products')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }

  getFrios() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Frios')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }
  getCarnes() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Carnes')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }
  getCongelados() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Congelados')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }
  getHortifruti() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Hortifruti')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }
  getMercearia() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Mercearia')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }
  getMercados() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Mercados')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }
  getBebidas() {
    const collection: AngularFirestoreCollection<any> = this.afs.collection('Bebidas')
    const collection$: Observable<any> = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      });
    return collection$;
  }


}