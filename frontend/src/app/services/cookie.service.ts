import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  getCookie(name: string): string | undefined {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return undefined;
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  decodeWithBase64(encodedText: string): string {
    return Buffer.from(encodedText, 'base64').toString('utf8');
  }

  // Encode function using Base64 encoding
  encode_with_base64_room_and_host(str1: string, str2?: string): string {
    const delimiter = "|"; // Choose a delimiter that won't occur in your strings
    let text = str2 ? `${str1}${delimiter}${str2}` : `${str1}`;
    console.log(`Cookie Service: text: ${text}`);
    return Buffer.from(text).toString('base64');
  }

  splitString(inputString: string): { var1: string, var2: string } {
    const [var1, var2] = inputString.split('|');
    return { var1, var2 };
  }
}
