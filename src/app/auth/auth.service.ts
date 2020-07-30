import {Injectable} from '@angular/core';
import {RequestService} from '../shared/services/request.service';
import {Korisnik} from '../shared/models/korisnik';
import {Request} from '../shared/models/requests/request.enum';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {SessionUser} from './session-user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AuthService {

  user = new BehaviorSubject<SessionUser>(null);

  private  authService: RequestService<Korisnik>;
  private tokenExpTimer: any;
  constructor(private  http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.authService = new RequestService<Korisnik>(this.http, Request.AUTH);
  }

  login(email: string, pass: string, rememberMe: boolean): Observable<Korisnik> {
    return this.http.get<Korisnik>(
      Request.URL_SERVER + Request.AUTH, { headers: new HttpHeaders().append('Authorization', 'Basic ' + btoa(email + ':' + pass))})
      .pipe( catchError( this.handleError ), tap(res => {
        this.handleAuth(res, rememberMe);
      }));
  }
  private handleAuth(data: Korisnik, rememberMe: boolean): void {
    const helper = new JwtHelperService();

    const token = helper.decodeToken(data.token);
    const roles = token.role;
    const expDate = new Date(token.exp * 1000);
    // tslint:disable-next-line:max-line-length
    const  user = new SessionUser( roles, data.email, data.korisnickoIme, data.ime, data.prezime, data.bibliotekaNaziv, data.slika, data.token, expDate);
    this.user.next(user);
    // console.log(expiresIn * 1000);
    if (rememberMe){
      const expiresIn =  expDate.getTime() - new Date().getTime() ;
      this.autoLogout(expiresIn );

      localStorage.setItem('userData', JSON.stringify(user));
    }
    const redirectRoute = this.route.snapshot.queryParams.redirectRoute ? this.route.snapshot.queryParams.redirectRoute : '/dashboard';

    this.router.navigate([redirectRoute]);
  }

  autoLogin(): void {
    // tslint:disable-next-line:max-line-length
    const data: {
      BibliotekaNaziv: string,
      Email: string,
      Ime: string,
      KorisnickoIme: string,
      Prezime: string,
      Role: string,
      Slika: string,
      _JWT: string,
      _tokenExpirationDate: Date } = JSON.parse(localStorage.getItem('userData'));


    if (!data) {
      return;
    } else {
      // tslint:disable-next-line:max-line-length
      const loadedUser = new SessionUser(data.Role, data.Email, data.KorisnickoIme, data.Ime, data.Prezime, data.BibliotekaNaziv, data.Slika, data._JWT, data._tokenExpirationDate);
      if (loadedUser) {
        this.user.next(loadedUser);
        const expDuration = new Date (loadedUser.ExpDate).getTime() - new Date().getTime();

        this.autoLogout(expDuration);

      }
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth/login']);
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpTimer =  setTimeout( () => { this.logout(); }, expirationDuration);
  }
  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password'; break;

    }

    return  throwError(errorMessage);
  }
}
