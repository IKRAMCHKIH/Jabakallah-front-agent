import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Virement } from '../interfaces/virement';
import { AgentService } from '../_services/Agent.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-list-courrier',
  templateUrl: './list-courrier.component.html',
  styleUrls: ['./list-courrier.component.css']
})
export class ListCourrierComponent implements OnInit,OnChanges  {

  filteredVirements: Virement[];
  listVirement:Virement[];
  adresse:String;
  stateOptions = [
    { value: 'En cours', color: 'yellow' },
    { value: 'Bien reçu', color: 'green' }
  ];

  searchTerm: string;
  
  constructor(private router: Router,private agentService :AgentService,private tokenStorage:TokenStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('searchTerm')) {
      this.updateFilteredList();
    }
  }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['/login']); 
    }else{
      const adressAccess = window.sessionStorage.getItem("username");
      this.adresse = adressAccess;
      this.agentService.GetListVirement(this.adresse).subscribe({
        next: data => {
          console.log(data);
          this.listVirement = data;
          this.filteredVirements = data;
        },
        error: err => {
          console.log("erreur while fetching list facture");
        }
      }); 
    }
   
  }
  saveVirement(virement: Virement) {

    this.agentService.updateAgent(virement.ref,virement.state).subscribe({
      next: data => {
        console.log('Virement mis à jour avec succès:', data);
      },
      error: err => {
        console.log('Erreur lors de la mise à jour du virement:', err);
      }
    });

  }

  deleteVirement(virement: Virement) {

    this.agentService.deletVirment(virement.ref).subscribe({
      next: data => {
        console.log('Virement mis à jour avec succès:', data);
      },
      error: err => {
        console.log('Erreur lors de la mise à jour du virement:', err);
      }
    });
    
  }

  filterVirements(): Virement[] {
    if (!this.searchTerm || this.searchTerm.trim() === "") {
      return this.filteredVirements;
    } else {
      return this.filteredVirements.filter(
        virement => virement.ref && virement.ref.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  updateFilteredList() {
    this.listVirement = this.filterVirements();
  }
  
  
  

}
