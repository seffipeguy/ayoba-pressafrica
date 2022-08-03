import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Editor} from '../models/editor';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }

  async getEditorWitchId(id: string) {
    return new Promise<Editor>((resolve, reject) => {
      firebase.firestore().collection('editors').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Editor);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getEditorsWitchIdCoverage(idCoverage: string) {
    return new Promise<Editor[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('editors').where('idCoverage', '==', idCoverage).onSnapshot(
        (docRef) => {
          const result: Editor[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Editor);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getEditors() {
    return new Promise<Editor[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('editors').onSnapshot(
        (docRef) => {
          const result: Editor[] = [];
          docRef.forEach(function(doc) {
            result.push(doc.data() as Editor);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async addNewEditor(editor: Editor) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('editors').doc(editor.id).set(Object.assign({}, editor)).then(
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
