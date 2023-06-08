import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isLoggedIn:Boolean=false;
  constructor(
      private tokenService:TokenStorageService, 
    private router: Router,
    private tokenStorage:TokenStorageService,
      
      ) { }

  ngOnInit(): void {

    this.isLoggedIn= (this.tokenStorage.getToken()!=null);

  }
    onLogout() {
        this.router.navigate(['/home']);
        this.tokenStorage.signOut();
        window.location.reload();    }

}
