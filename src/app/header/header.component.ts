import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.actions';
import * as RecipeAction from '../recipes/store/recipe.actions';

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
               private authService : AuthService,
               private store : Store<fromApp.AppState>){}

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout(){
    // this.authService.logOut();
    this.store.dispatch(new AuthAction.Logout());
  }

  onSaveData(){
    // this.dataService.storeRecipe();
    this.store.dispatch(new RecipeAction.StoreRecipe());
  }

  onFetchData(){
    // this.dataService.fetchData().subscribe();
    this.store.dispatch(new RecipeAction.FetchRecipe());
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
