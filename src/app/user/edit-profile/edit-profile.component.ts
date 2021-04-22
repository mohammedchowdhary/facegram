import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { mimeType } from 'src/app/posts/create-posts/mime-type.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  imagePreview: any;
  userId: string;
  userUpdateSubs: Subscription;
  user: User;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null),
      gender: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.userService.getUser(this.userId);
    this.userUpdateSubs = this.userService.getUserUpdateListner()
    .subscribe(user => {
      this.user = user;
      this.form.setValue({
        name: this.user.name,
        description: this.user.description,
        image: this.user.profile_pic,
        gender: this.user.gender
      });
      this.imagePreview = this.user.profile_pic;
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveInfo() {
    if (this.form.invalid) {
      return;
    } else {
      this.userService.editProfile(
        this.userId,
        this.form.value.name,
        this.form.value.description,
        this.form.value.gender,
        this.form.value.image
      );
      this.form.reset();
    }
  }

}
