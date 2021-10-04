import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title="KalyonPV";
  isAuthenticated = true;

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout():void{
    this.tokenService.signOut();
    this.router.navigateByUrl('/login');
  }

}
