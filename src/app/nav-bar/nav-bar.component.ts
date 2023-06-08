import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:Boolean=false;
  constructor(private router: Router, private tokenStorage:TokenStorageService) {}

  ngOnInit(): void {
      this.isLoggedIn= (this.tokenStorage.getToken()!=null);
     

   
  }

  onLogout() {
      this.router.navigate(['/home']);
      this.tokenStorage.signOut();
      window.location.reload();    }

  
  

}
