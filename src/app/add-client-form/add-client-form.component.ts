import { TokenStorageService } from './../_services/token-storage.service';
import { AgentService } from './../_services/Agent.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const AgentHasntChangedPassword = false;
@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {
  clientAdded: boolean = false;
  
  username=window.sessionStorage.getItem("username");
  AgentHasFirstAuthentication :Boolean;
  errorMessage:String;
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
    
    if(this.tokenService.getToken()!=null){
    this.agentService.getAgentHasFirstAuth(this.username).subscribe({
      next: data => {
        console.log(data);
        if(data==AgentHasntChangedPassword){
          this.router.navigate(['changePassword']); 
        }
      
      },
      error: err => {
        console.log("erreur while getting firstauth")
      }
    });
  }
}
 

  addClientFormSubmited(){


    this.agentService.saveClient(
      this.client.userName,
      this.client.firstName,
      this.client.lastName,
      this.client.email,
      this.client.phoneNumber
      ).subscribe(
        {
          next: data => {
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
            console.log(err.error.message);
          6
          }
         
        }
      )
      this.clientAdded = true;
  }

  reloadPage(): void {
    window.location.reload();


}
  }
