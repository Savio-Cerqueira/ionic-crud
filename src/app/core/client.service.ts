import { environment } from './../../environments/environment';
import { ClientModel } from './client.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

const URL = environment.mockServer + '/clients';

const HEADERS = {
  headers :  new HttpHeaders({
  'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Array<ClientModel>> | Observable<any> {
    return this.http.get(URL)
      .pipe(
        map((res) => {

          console.log('json response ok!');
          return res;

        }),
        catchError((error) => {

          console.error(error);
          return throwError(error);

        })
      );
  }

  getCLientById(id: string): Observable<ClientModel> | Observable<any> {
    const url = `${URL}/${id}`;
    return this.http.get(url)
      .pipe(
        map((res) => {

          console.log('json response ok!');
          return res;

        }),
        catchError((error) => {

          console.error(error);
          return throwError(error);

        })
      );
  }

  addClient(clientData: ClientModel) {
    return this.http.post(URL, clientData)
      .pipe(
        map((res) => {

          console.log('post successfull');
          return res;

        }),
        catchError((error) => {

          console.error(error);
          return throwError(error);

        })
      );
  }

  deleteClient(id: string) {
    const url = `${URL}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res) => {

          console.log('delete successfull');
          return res;

        }),
        catchError((error) => {

          console.error(error);
          return throwError(error);

        })
      );
  }

  editClient(clientData: ClientModel, id: string) {
    const url = `${URL}/${id}`;
    const body = {...clientData};
    return this.http.put(url, clientData, HEADERS).
      pipe(
        map((res) => {

          console.log('put successfull');
          return res;

        }),
        catchError((error) => {

          console.error(error);
          return throwError(error);

        })
      );
  }
}
