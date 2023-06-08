import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../_services/Agent.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Agent} from './../interfaces/Agent';
@Component({
  selector: 'app-agent-profil',
  templateUrl: './agent-profil.component.html',
  styleUrls: ['./agent-profil.component.css']
})
export class AgentProfilComponent implements OnInit {

  id = window.sessionStorage.getItem('username');

  agent: Agent ={
    id_agent: 0 ,
    adresse:'',
    date_naissance:new Date(),
    email:'',
    first_auth: false,
    nom:'',
    num_matriculation:'',
    num_pattente:'',
    num_piece_identite:'',
    num_tel:'',
    password:'',
    piece_identite:'',
    prenom:'',
    role:'',
    username:'',
  };
    constructor(
      private router: Router,
      private agentService: AgentService,
      private tokenStorage:TokenStorageService
    ) {}
    ngOnInit(): void {
      if(this.tokenStorage.getToken()==null){
        this.router.navigate(['/login']); 
      } else {
        
   this.agentService.getAgentHasFirstAuth(this.id).subscribe({
      next: data => {
        console.log(data);
        this.agent=data;
         
      },
      error: err => {
        console.log("erreur avec api while getting client");
      }
    });
  
    this.agentService.getAgent(this.id).subscribe({
      next: data => {
        console.log(data);
        this.agent=data;
               
      },
      error: err => {
        console.log("erreur avec api while getting client");
      }
    });
  
  }
   }

}
