import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../_services/Agent.service';
import { Client } from 'src/app/interfaces/Client';
import { TokenStorageService } from '../_services/token-storage.service';
import {Agent} from './../interfaces/Agent';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit {
  
  clients:Client[];
  errorMessage: any;
  numberOfLines: number;
  constructor(private AgentService:AgentService,private router: Router, private tokenStorage:TokenStorageService) { }


 
  ngOnInit(): void {

    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['login']);
    }else{
      this.AgentService.findAllClient().subscribe({
        next: data => {
          this.clients=data;
          console.log(data);
          this.numberOfLines = this.clients.length;
        },
        error: err => {
          this.errorMessage = err.error.message;
         
        }
       
      });
    }
     
    console.log(this.clients);
  }
}
