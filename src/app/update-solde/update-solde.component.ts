import { TokenStorageService } from './../_services/token-storage.service';
import { AgentService } from './../_services/Agent.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-solde',
  templateUrl: './update-solde.component.html',
  styleUrls: ['./update-solde.component.css']
})
export class UpdateSoldeComponent implements OnInit {

  username=window.sessionStorage.getItem("username");
  errorMessage:String;
  numTel:string;
  solde:number;
  client={

    userName:"",
    firstName:"",
    lastName:'',
    email:'',
    phoneNumber:'',

  }
  constructor(private agentService:AgentService,
    private tokenService :TokenStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
     
    if(this.tokenService.getToken()==null){
      this.router.navigate(['/home']); 
    }
    
}
 

  addClientFormSubmited(){


    this.agentService.updateSold(
      this.numTel,
      this.solde
      ).subscribe(
        {
          next: data => {
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
            console.log(err.error.message);
          
          }
         
        }
      )

  }

  reloadPage(): void {
    window.location.reload();


}
}
