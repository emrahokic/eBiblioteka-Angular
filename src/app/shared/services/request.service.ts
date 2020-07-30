import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '../models/requests/request.enum';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class RequestService<T> {

  private URL: string;

  data = new BehaviorSubject<T>(null);
  constructor(private http: HttpClient, api: string) {
    this.URL = Request.URL_SERVER + api;
  }

  get(): Observable<T[]> {
    return this.http
      .get<T[]>(  this.URL );
  }

  getById(id: number): T {

    // @ts-ignore
    console.log(this.URL);
    return null;
  }

  insert(data: any): T {
    return null;
  }

  update(id: number, data: any): T {
    return null;
  }

  delete(id: number): void {

  }
}
