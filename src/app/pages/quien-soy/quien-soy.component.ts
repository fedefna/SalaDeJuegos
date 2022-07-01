import { Component, OnInit } from '@angular/core';
import { GithubServiceService } from 'src/app/services/github-service.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {
  public datosDeGit: any;
  
  constructor(private git: GithubServiceService) { }

  ngOnInit(): void {
    this.datosDeGit= {avatar_url:"../../../favicon.ico"};
    this.git.getDatosDeGit().subscribe((result) => {
      this.datosDeGit = result;
    })

  }

}
