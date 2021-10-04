import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  users: any;

  constructor(
    private main: MainService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.main.getUsers().subscribe(
      res=> {
        this.users = res;
        console.log(this.users);
     },
     err=>console.log("Error: "+err)
    );
  }


}
