import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/aler.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { authResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthAction  from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{

  isloginmode = true;
  isLoading = false;
  error : string = null;
  private closeSub : Subscription;
  private storeSub : Subscription;
  @ViewChild(PlaceHolderDirective) alertHost : PlaceHolderDirective
  constructor(private authService : AuthService , private router : Router , private componentFactoryResolver : ComponentFactoryResolver, private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error){
        this.showErrorHandle(this.error);
      }
    });
  }

  onHandleError(){
    // this.error = null;
    this.store.dispatch(new AuthAction.ClearError());
  }
  onSwitchMode(){
    this.isloginmode = !this.isloginmode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // this.isLoading = true;

    // let authObs : Observable<authResponseData>;
    if (this.isloginmode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthAction.LoginStart({email:email,password:password}));
    } else {
      // authObs = this.authService.signup(email,password)
      this.store.dispatch(new AuthAction.SignupStart({email:email,password:password}));
    }
    // authObs.subscribe(
    //   resData => {
    //   console.log(resData);
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // },errorMessage => {
    //   this.error = errorMessage;
    //   console.log(errorMessage);
    //   this.showErrorHandle(errorMessage);
    //   this.isLoading = false;
    // }
    // );
    form.reset();
  }

  private showErrorHandle(message : string){
    const alrtCmpFactory =this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewCointainerRef = this.alertHost.viewContainerRef;
    hostViewCointainerRef.clear();

    const componentRef = hostViewCointainerRef.createComponent(alrtCmpFactory);
    componentRef.instance.message= message;
    this.closeSub = componentRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe();
      hostViewCointainerRef.clear();
    })
  }

  ngOnDestroy() {
      if(this.closeSub){
        this.closeSub.unsubscribe();
      }
      if(this.storeSub){
        this.storeSub.unsubscribe();
      }
  }
}
