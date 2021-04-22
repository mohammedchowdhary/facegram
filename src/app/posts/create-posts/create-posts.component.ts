import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
  imagePreview: any;
  imageFile: File;
  imageData: any;
  form: FormGroup;
  private postId: string;
  private mode = 'create';
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.imageData = this.postsService.getImageData();
    this.imagePreview = this.imageData.imagePreview;
    this.imageFile = this.imageData.imageFile;
    this.form = new FormGroup({
      caption: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onSavePost() {
    this.form.patchValue({ image: this.imageFile });
    this.form.get('image').updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.caption,
        this.form.value.image
      );
    }
  }

}
