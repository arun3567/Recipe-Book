import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthAction from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'Recipe_Book';

  constructor (private authService : AuthService,private store : Store<fromApp.AppState>){}

  ngOnInit(){
      // this.authService.autoLogin();
      this.store.dispatch(new AuthAction.AutoLogin());
  }

}
