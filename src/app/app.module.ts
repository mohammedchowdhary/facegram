import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './posts/home/home.component';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatCardModule,
  MatFormFieldModule, MatInputModule,
  MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatProgressSpinnerModule,
  MatDialogModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SearchComponent } from './search/search.component';
import { FriendRequestComponent } from './user/friend-request/friend-request.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FriendsListComponent } from './user/friends-list/friends-list.component';
import { PostsComponent } from './user/posts/posts.component';
import { PostComponent } from './posts/home/post/post.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    HomeComponent,
    CreatePostsComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    FriendRequestComponent,
    EditProfileComponent,
    FriendsListComponent,
    PostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
