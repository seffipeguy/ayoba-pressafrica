import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const ayoba = getAyoba(); // Initialisation

const testAyoba = 0;
let userData: any;
let android: any;

function getAyoba() {
  const userAgent: any = navigator.userAgent || navigator.vendor || window;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return null;
  }

  if (/android/i.test(userAgent)) {
    try {
      return this.android;
    } catch (error) {
      return null;
    }
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) ) {
    return null; // todo
  }

  return 'unknown';
}

function onNicknameChanged(nickname){

  if(this.testAyoba === 0){
    let jid = this.userData.jid = this.getURLParameter('jid');
    if(jid==null) {
      jid=localStorage.getItem('jid');
    }

    localStorage.setItem('ayoba-tel', this.ayoba.getMsisdn());
    localStorage.setItem('ayoba-name', nickname);

    this.userData.lg = this.ayoba.getLanguage();
    this.userData.tel= this.ayoba.getMsisdn();
    this.userData.jid=jid;
    this.userData.lat=0;
    this.userData.lon=0;
    this.userData.nom=nickname;

    this.testAyoba = 1;
  }
}


function getURLParameter(sParam): any
{
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  for(let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
}
