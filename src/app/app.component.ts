import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PostsService } from './posts/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private postsService: PostsService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.postsService.getPosts();
    this.postsService.getLoggedInUserId();
  }

}
