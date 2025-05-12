import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new BehaviorSubject<boolean>(false);
  authStatus = this._authStatus.asObservable();
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    let url = `${environment.baseUrl}/api/Admin/Login`;
    return this.http.post<LoginResponse>(url,loginRequest).pipe(tap(loginResult => 
    {
      if (loginResult.success)
        {
          localStorage.setItem("JwtToken", loginResult.token);
          this.setAuthStatus(true);
        }
    }
    ));
    
  }

  private setAuthStatus(value:boolean){
    this._authStatus.next(value);
  }

  logout ()
  {
    localStorage.removeItem("JwtToken");
    this.setAuthStatus(false);
  }

  isAuthenticated() : boolean
  {
    return localStorage.getItem("JwtToken")!=null;
  }
}