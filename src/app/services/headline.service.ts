import { Injectable } from '@angular/core';
import {Headline} from '../models/headline';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor() { }

  async getHeadlineWitchId(idHeadline: string) {
    return new Promise<Headline>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(idHeadline).get().then(
        (docRef) => {
          resolve(docRef.data() as Headline);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlinesWitchText(value: string) {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').where('title', '>=', value).where('title', '<=', value + 'uf8ff').onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Headline);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlinesWitchIdEditor(idEditor: string) {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').where('idEditor', '==', idEditor).onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Headline);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getHeadlines() {
    return new Promise<Headline[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('headlines').orderBy('date', 'desc').onSnapshot(
        (docRef) => {
          const result: Headline[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Headline);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async addNewHeadline(headline: Headline) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(headline.id).set(Object.assign({}, headline)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async likeHeadline(headline: Headline) {
    const tmpH = headline;
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(headline.id).update(
        {
          likes: headline.likes.includes(localStorage.getItem('id')) ? firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id')) : firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('id')),
          disLikes: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id'))
        }
      ).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async disLikeHeadline(headline: Headline) {
    const tmpH = headline;
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('headlines').doc(headline.id).update(
        {
          disLikes: headline.disLikes.includes(localStorage.getItem('id')) ? firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id')) : firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('id')),
          likes: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('id'))
        }
      ).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
