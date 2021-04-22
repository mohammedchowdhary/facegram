import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, IUserResponse } from './search.class';
import { environment } from '../../environments/environment';
const Backend_Url = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  public search(filter: {email: string} = {email: ''}, page = 1): Observable<IUserResponse> {
    return this.http.get(Backend_Url)
    .pipe(
      tap((response: IUserResponse) => {
        console.log(response.results);
        response.results = response.results.map(user => new User(user._id, user.email))
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          .filter(user => user.email.includes(filter.email));
        return response;
      })
      );
  }
}
