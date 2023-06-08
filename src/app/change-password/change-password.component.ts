import { ChangePasswordRequestAgent } from './../interfaces/ChangePasswordRequestAgent';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../_services/Agent.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username= window.sessionStorage.getItem("username");

  changePasswordRequestAgent:ChangePasswordRequestAgent={
   username:this.username,
   newPassword:"",
  }
  constructor(
    private router: Router,
    private agentService: AgentService,
    private tokenStorage:TokenStorageService
  ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['/login']); 
    }
  }


  changePasswordClicked(){
    this.agentService.ChangePassword(this.changePasswordRequestAgent).subscribe({
      next: data => {
        this.router.navigate(['home']);
      },
      error: err => {
        console.log("erreur while changing password");
      }
    }); 

  }


}
