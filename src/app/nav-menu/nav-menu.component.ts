import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
   
    isLoggedIn:Boolean=false;
    constructor(private router: Router, private tokenStorage:TokenStorageService) {}

    ngOnInit(): void {
        this.isLoggedIn= (this.tokenStorage.getToken()!=null);
       

     
    }

   
}
