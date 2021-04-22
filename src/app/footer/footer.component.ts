import { Component, OnInit } from '@angular/core';

import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postsService.createImagePreview(file);

  }
}
