import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private httpClient: HttpClient) {   }

  getDatosDeGit(){
    return this.httpClient.get("https://api.github.com/users/fedefna");
  }
}
