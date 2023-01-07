import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }


  singOut():void{
    window.localStorage.clear();
  }


  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string{
     return localStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(user:any): void{
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():any{
    return JSON.parse(localStorage.getItem(USER_KEY)!);
  }

  public saveIdUser(user: any) {
    window.localStorage.removeItem("id_user");
    window.localStorage.setItem("id_user", JSON.stringify(user));
  }

  public getIdUser() {
    return JSON.parse(localStorage.getItem("id_user")!);
  }

}
