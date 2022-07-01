import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class MarvelService {

  PUBLIC_KEY = '4759e937d086d4a6a6bf200cf769af00';
  PIVATE_KEY = 'c4bfb6b11064e8d273f49fe42451747b0d18ba82';
  HASH = 'EF0B2E5D8C5FDCC6962BB9390964A672';
  URL_API_INICIO = `https:gateway.marvel.com/v1/public/characters/`;
  URL_API_FIN = `?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH.toLowerCase()}`;


  constructor(private http: HttpClient) { }

  public obtenerFoto(personajeid:string){
    console.log("Obtener foto");
    let get=this.URL_API_INICIO+personajeid+this.URL_API_FIN;
    console.log(get);
    return this.http.get(get);
    // return this.http.get(get)
    //   .pipe(
    //     map(
    //       (data:any)=>
    //         data.data.results.thumbnail.path
    //       )
    //   );
  }
}
