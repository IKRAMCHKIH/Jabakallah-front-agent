import { TokenStorageService } from './../_services/token-storage.service';
import { AgentService } from './../_services/Agent.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const AgentHasntChangedPassword = false;
@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {
   phoneNumber : "";
   solde: number;
   typecompte: number;
  //  compte={
  //   solde: "",
  //   typecompte: ""
  // }

  compteAdded: boolean = false;
  
  username=window.sessionStorage.getItem("username");
  AgentHasFirstAuthentication :Boolean;
  errorMessage:String;

  constructor(private agentService:AgentService,
    private tokenService :TokenStorageService,
    private router: Router
    , private activatedRoute: ActivatedRoute
    ) { 
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.phoneNumber = this.router.getCurrentNavigation().extras.state.phoneNumber;
          console.log('creeeeeeeeeeeeeeeeesi: ', this.phoneNumber);
        }
      });
    }

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
  console.log('creeeeeeeeeeeeeeeeesi: ', this.phoneNumber);

}
 

  addCompteFormSubmited(){console.log("bbbbbbbbbbbbb",this.phoneNumber);
    console.log(this.solde);
    
    this.agentService.saveCompte(
      this.phoneNumber,
      this.typecompte,
      this.solde
     
         
          ).subscribe(
            
               {
                  next: data => {
                 console.log("aaaaaaaaaaaaaaaaaaaa",this.phoneNumber);

                  },
                  error: err => {
                    this.errorMessage = err.error.message;
          console.log(err.error.message);
   
                  }
                 
                }
              )
              this.compteAdded = true;
    
    

    // this.agentService.saveCompte(
    //   this.c.userName,
    //   this.client.firstName,
    //   this.client.lastName,
    //   this.client.email,
    //   this.client.phoneNumber
    //   ).subscribe(
    //     {
    //       next: data => {
    //         this.reloadPage();
    //       },
    //       error: err => {
    //         this.errorMessage = err.error.message;
    //         console.log(err.error.message);
    //       6
    //       }
         
    //     }
    //   )
      // this.clientAdded = true;
  }

//   reloadPage(): void {
//     window.location.reload();


// }

}
