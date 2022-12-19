import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError,tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthAction from './store/auth.actions';

export interface authResponseData {
    idToken	:string,
    email: string,
    refreshToken : string,
    expiresIn :string,
    localId	:string,
    registered? : boolean
}

@Injectable({
    providedIn : 'root'
})
export class AuthService {

    // user = new BehaviorSubject<User>(null);
    private tokenExpiration : any;

    constructor (private http : HttpClient, private router : Router,private store : Store<fromApp.AppState>){}

    // signup(email : string , password : string){
    //     return this.http.post<authResponseData>
    //     ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.fireBaseAPIKey,
    //     {
    //         email : email,
    //         password : password,
    //         returnSecureToken : true
    //     }
    //     ).pipe(
    //         catchError(this.handleError),
    //         tap(resData => {
    //        this.handleAuthenticate(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    //     })
    //     );
    // }

    // login(email : string , password : string){
    //     return this.http.post<authResponseData>
    //     ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.fireBaseAPIKey,
    //     {
    //         email : email,
    //         password : password,
    //         returnSecureToken : true
    //     }
    //     ).pipe(catchError(this.handleError),
    //     tap(resData => {
    //         this.handleAuthenticate(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    //      })
    //      );
    // }

    // autoLogin(){
    //    const userData:{
    //     email : string,
    //     id : string,
    //     _token : string,
    //     _tokenExpireDate : string
    //    } = JSON.parse(localStorage.getItem('userData'));

    //    if(!userData){
    //     return;
    //    }

    //    const loadedUser = new User(userData.email,
    //                                userData.id,
    //                                userData._token,
    //                                new Date(userData._tokenExpireDate));
    //     if(loadedUser.token){
    //         // this.user.next(loadedUser);
    //         this.store.dispatch(new AuthAction.AuthenticateSuccess({email: loadedUser.email,userId: loadedUser.id,token: loadedUser.token,expireDate: new Date(userData._tokenExpireDate) }))
    //         const expirationDuration = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
    //         this.autoLogout(expirationDuration )
    //     }
    // }

    // logOut(){
    //     // this.user.next(null);
    //     this.store.dispatch(new AuthAction.Logout());
    //     // this.router.navigate(['/auth']);
    //     localStorage.removeItem('userData');
    //     if(this.tokenExpiration){
    //         clearTimeout(this.tokenExpiration);
    //     }
    //     this.tokenExpiration = null;
    // }

    setLogoutTimer(expirationDuration : number){
        this.tokenExpiration = setTimeout(()=>{
            this.store.dispatch(new AuthAction.Logout());
        },expirationDuration);
    }

    clearLogoutTimer(){
        if(this.tokenExpiration){
            clearTimeout(this.tokenExpiration);
            this.tokenExpiration = null;
        }
    }

    // private handleAuthenticate(
    //     email : string,
    //     userId : string,
    //     token : string,
    //     expiresIn : number
    // ){
    //     const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    //     const user = new User(email , userId , token , expireDate);
    //     // this.user.next(user);
    //     this.store.dispatch(new AuthAction.AuthenticateSuccess({email:email,userId:userId,token:token,expireDate:expireDate}))
    //     this.autoLogout(expiresIn * 1000)
    //     localStorage.setItem('userData', JSON.stringify(user));
    // }

    // private handleError(errorRes : HttpErrorResponse){
    //     let errorMessage = 'Unknown Error';
    //         if(!errorRes.error || !errorRes.error.error){
    //             return throwError(errorMessage);
    //         }
    //         switch(errorRes.error.error.message){
    //             case 'EMAIL_EXISTS':
    //             errorMessage = 'Email Exist Already';
    //             break;
    //             case 'EMAIL_NOT_FOUND' :
    //             errorMessage = 'Email Not Found';
    //             break;
    //             case 'INVALID_PASSWORD' :
    //             errorMessage = 'Invalid Password';
    //             break;
    //         }
    //         return throwError(errorMessage);
    // }
}
