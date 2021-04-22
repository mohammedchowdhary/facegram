import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const Backend_Url = environment.apiUrl + '/friends/';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  sendFriendRequest(userId: string) {
    const uId = {
      userId: userId
    };
    return this.http.post<any>(Backend_Url, uId);
  }

  receivedRequests() {
    return this.http.get<{total: number, result: any}>(Backend_Url + 'requests');
  }

  acceptRequest(userId: string) {
    return this.http.post(Backend_Url + 'accept/' + userId, userId);
  }

  getFriends() {
    return this.http.get<{message: string, friends: []}>(Backend_Url + 'friends');
  }

  getSentRequests() {
    return this.http.get<{message: string, sentRequests: any}>(Backend_Url + 'sentrequest');
  }

  cancelRequest(userId: string) {
    const uId = {
      id: userId
    };
    return this.http.post<{message: string}>(Backend_Url + 'cancelrequest', uId);
  }

  denyRequest(userId: string) {
    const uId = {
      id: userId
    };
    return this.http.post<{message: string}>(Backend_Url + 'denyrequest', uId);
  }

  removeFriend(userId: string) {
    const uId = {
      id: userId
    };
    return this.http.post<{message: string}>(Backend_Url + 'remove', uId);
  }

}
