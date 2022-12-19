import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import * as AuthAction from '../store/auth.actions';
import { User } from "../user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expireDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthAction.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expireDate: expireDate,
    redirect : true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthAction.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthAction.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  ///SIGNUP///////////////////
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthAction.SIGNUP_START),
    switchMap((signupAction: AuthAction.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.fireBaseAPIKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );
  ///LOGIN//////////////////////////////
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthAction.LOGIN_START),
    switchMap((authData: AuthAction.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.fireBaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(ofType(AuthAction.AUTO_LOGIN),map(() => {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpireDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return { type: 'DUMMY' };
    }

    const loadedUser = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpireDate));
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
      this.authService.setLogoutTimer(expirationDuration);
      return new AuthAction.AuthenticateSuccess(
        {
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expireDate: new Date(userData._tokenExpireDate),
          redirect : false
        });
      // const expirationDuration = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
      // this.autoLogout(expirationDuration )
    }
    return { type: 'DUMMY' };
  }));

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(ofType(AuthAction.LOGOUT), tap(() => {
    this.authService.clearLogoutTimer();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(ofType(AuthAction.AUTHENTICATE_SUCCESS),tap((authSuccessAction : AuthAction.AuthenticateSuccess) => {
    if(authSuccessAction.payload.redirect){
      this.router.navigate(['/']);
    }
  })
  );
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) { }
}
