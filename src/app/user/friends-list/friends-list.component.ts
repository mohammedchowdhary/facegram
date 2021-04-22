import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend-request/friend.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  friends = [];

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.friendService.getFriends()
    .subscribe(responseData => {
      this.friends = responseData.friends;
      console.log(this.friends);
    });
  }

  onRemoveFriend(userId: string) {
    this.friendService.removeFriend(userId).subscribe(removed => {
      const updatedFriends = this.friends.filter(friend => friend._id !== userId);
      this.friends = updatedFriends;
    });
  }

}
