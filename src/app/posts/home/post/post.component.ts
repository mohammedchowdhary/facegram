import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../../post.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from '../../posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
@Input() post: Post;
isLoading = false;
loggedInUserId: string;
isLiked = false;
isShowComments = false;
  constructor(private authService: AuthService, private postsService: PostsService) { }

  ngOnInit() {
    this.loggedInUserId = this.authService.getUserId();
    console.log(this.loggedInUserId);
    this.post.likes.forEach(like => {
      if (like === this.loggedInUserId) {
        this.isLiked = true;
      }
    });
  }

  onCreateComment(form: NgForm) {
    console.log(form.value.comment);
    this.postsService.addComment(form.value.comment, this.post.postId);
    form.reset();
    this.isShowComments = false;

  }

  onLikeUnlike() {
    this.isLiked = !this.isLiked;
    this.postsService.likeUnlike(this.post.postId);
  }
  onToggleComment() {
    this.isShowComments = true;
  }
}
