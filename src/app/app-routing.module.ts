import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './posts/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { SearchComponent } from './search/search.component';
import { FriendRequestComponent } from './user/friend-request/friend-request.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FriendsListComponent } from './user/friends-list/friends-list.component';
import { PostsComponent } from './user/posts/posts.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'createpost', component: CreatePostsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user/edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/friends', component: FriendsListComponent, canActivate: [AuthGuard]},
  {path: 'user/posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user/:id/posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'friendrequest', component: FriendRequestComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
