import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FriendService } from './friend-request/friend.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userId: string;
  loggedInUserId: string;
  loggedInUserPage = true;
  user: User;
  isFriend = false;
  isRequestSent = false;
  isRequestReceived = false;
  userUpdateSubs: Subscription;
  friends = [];
  requestsPending = [];
  posts: Post[];
  postSub: Subscription;
  constructor(private route: ActivatedRoute,
    private friendService: FriendService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private postsService: PostsService) { }

  ngOnInit() {
    this.friendService.getFriends()
    .subscribe(responseData => {
      this.friends = responseData.friends;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.loggedInUserPage = false;
          this.userId = paramMap.get('id');
          this.friends.forEach(friend => {
            if (friend._id === this.userId) {
              console.log(this.userId);
              this.isFriend = true;
            }
          });
          this.friendService.getSentRequests()
          .subscribe(requestsData => {
            requestsData.sentRequests.forEach(requests => {
              if (this.userId === requests.requested._id) {
                this.isRequestSent = true;
              }
            });
          });
          this.friendService.receivedRequests()
          .subscribe(response => {
            response.result.forEach(receivedReq => {
              if (this.userId === receivedReq.requester._id) {
                this.isRequestReceived = true;
              }
            });
          });
          this.userService.getUser(this.userId);
          this.userUpdateSubs = this.userService.getUserUpdateListner()
          .subscribe(user => {
            this.user = user;
          });
          this.userService.getUserPost(this.userId);
          this.posts = this.userService.posts;
        } else {
          this.loggedInUserId = this.authService.getUserId();
          this.loggedInUserPage = true;
          this.userService.getUser(this.loggedInUserId);
          this.userUpdateSubs = this.userService.getUserUpdateListner()
          .subscribe(user => {
            this.user = user;
          });
          this.userService.getUserPost(this.loggedInUserId);
          this.posts = this.userService.posts;
        }
      });
    });
  }

  onSendFriendrequest() {
    this.friendService.sendFriendRequest(this.userId)
    .subscribe(response => {
      this.isRequestSent = true;
    });
  }

  onCancelRequest() {
    this.friendService.cancelRequest(this.userId).subscribe(response => {
      this.isRequestSent = false;
    });
  }

  onAcceptRequest() {
    this.friendService.acceptRequest(this.userId).subscribe(accept => {
      this.isRequestReceived = false;
      this.isFriend = true;
    });
  }
  visitPosts() {

    if (this.loggedInUserPage) {
      this.router.navigate(['/user', 'posts']);
    } else {
      this.router.navigate(['/user', this.userId, 'posts']);
    }
  }
  ngOnDestroy() {
    this.userUpdateSubs.unsubscribe();
    // this.postSub.unsubscribe();
  }

}
