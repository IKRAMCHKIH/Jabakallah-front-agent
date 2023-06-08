import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/Client';
import { AgentService } from '../_services/Agent.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-agent-list-component',
  templateUrl: './agent-list-component.component.html',
  styleUrls: ['./agent-list-component.component.css']
})
export class AgentListComponentComponent implements OnInit {
   
  clients:Client[];
  errorMessage: any;
  constructor(private AgentService:AgentService,private router: Router, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['login']);
    }else{
      this.AgentService.findAllClient().subscribe({
        next: data => {
          this.clients=data;
          console.log(data);
        },
        error: err => {
          this.errorMessage = err.error.message;
         
        }
       
      });
    }
     
    console.log(this.clients);
  }
 

   }
