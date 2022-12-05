import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  isAuthenticated = false;
  private userSub : Subscription;

  constructor (private http : HttpClient,
               private dataService : DataStorageService,
               private authService : AuthService){}
  
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout(){
    this.authService.logOut();
  }

  onSaveData(){
    this.dataService.storeRecipe();
  }

  onFetchData(){
    this.dataService.fetchData().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
