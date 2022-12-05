import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/aler.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { authResponseData, AuthService } from './auth.service';

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
  @ViewChild(PlaceHolderDirective) alertHost : PlaceHolderDirective
  constructor(private authService : AuthService , private router : Router , private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onHandleError(){
    this.error = null;
  }
  onSwitchMode(){
    this.isloginmode = !this.isloginmode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid){
      return
    }
    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading = true;

    let authObs : Observable<authResponseData>;
    if (this.isloginmode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email,password)
    }
    authObs.subscribe(
      resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },errorMessage => {
      this.error = errorMessage;
      console.log(errorMessage);
      this.showErrorHandle(errorMessage);
      this.isLoading = false;
    }
    );
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
  }
}
