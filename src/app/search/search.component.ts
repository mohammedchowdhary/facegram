import { Component, OnInit } from '@angular/core';
import { User } from './search.class';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;
  constructor( private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.usersForm = new FormGroup({
      userInput: new FormControl(null)
    });

      this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.searchService.search({email: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => this.filteredUsers = users.results);
  }

  displayFn(user: User) {
    if (user) { return user.email; }
  }
}
