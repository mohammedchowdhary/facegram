import { Component, OnInit } from '@angular/core';
import { FriendService } from './friend.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {
requestsPending = [];
friends = [];
  constructor(public friendService: FriendService) { }

  ngOnInit() {
    this.friendService.receivedRequests()
    .subscribe(response => {
      this.requestsPending = response.result;
    });

    this.friendService.getFriends()
    .subscribe(responseData => {
      this.friends = responseData.friends;
    });
  }

  onAcceptRequest(userId: string) {
    this.friendService.acceptRequest(userId).subscribe(accept => {
      const updatedrequestsPending = this.requestsPending.filter(request => request.requester._id !== userId);
      this.requestsPending = updatedrequestsPending;
    });
  }

  onDenyRequest(userId: string) {
    this.friendService.denyRequest(userId).subscribe(denied => {
      const updatedrequestsPending = this.requestsPending.filter(request => request.requester._id !== userId);
      this.requestsPending = updatedrequestsPending;
    });
  }

  onRemoveFriend(userId: string) {
    this.friendService.removeFriend(userId).subscribe(removed => {
      const updatedFriends = this.friends.filter(friend => friend._id !== userId);
      this.friends = updatedFriends;
    });
  }

}
