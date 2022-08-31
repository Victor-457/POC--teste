import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setObject(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string) {

    const ret: any = localStorage.getItem(key);
    const value = JSON.parse(ret);

    return value;

  }

  existsObject(key: string): boolean {

    const ret: any = localStorage.getItem(key);

    return (ret != null);

  }

}
