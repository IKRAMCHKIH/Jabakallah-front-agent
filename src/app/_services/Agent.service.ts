import { ChangePasswordRequestAgent } from './../interfaces/ChangePasswordRequestAgent';
import { Client } from '../interfaces/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Virement } from '../interfaces/virement';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class AgentService {
    private agentUrl: string;
	private clientUrlVirement: string;
	// tslint:disable-next-line: indent
	constructor(private http: HttpClient) {
		// tslint:disable-next-line: indent
		this.agentUrl = 'http://localhost:8080/api/auth/';
		this.clientUrlVirement='http://localhost:8080/virement/';
		
	}

  public saveClient(
	username:String,
	nom:String,
	prenom:String,
	numTel:String,
	email:String,

	
	) {
		return this.http.post(this.agentUrl + 'client/add',
		 {
			username,nom,prenom,email,numTel
		},
		
		{responseType: 'text'}
		);
	}
	public saveCompte(
		
		numTel:String,
		typecompte:number,
		solde:number,
	
		
		) {
			return this.http.post(this.agentUrl + 'createbankAccount',
			 {
				typecompte,numTel,solde
			},
			
			{responseType: 'text'}
			);
		}


	public updateAgent(ref:String, state:String){

		return this.http.post(`${this.clientUrlVirement}updateState/${ref}/${state}`,
  		 {responseType: 'text'}
   
  );

	}
	

  public findAllClients(): Observable<Client[]> {
		return this.http.get<Client[]>(
			'http://localhost:8080/adminController/listClients'
	
		);


}
public deleteClient(clientId: number): Observable<any> {
  return this.http.delete(`${this.agentUrl}/deleteClient/${clientId}`);
}

public deletVirment(ref: String): Observable<any> {
	return this.http.delete(`${this.clientUrlVirement}deleteVirment/${ref}`);
  }

public ChangePassword(
	changePasswordRequestAgent:ChangePasswordRequestAgent
){

   return this.http.post(this.agentUrl + "agent/changePassword",
   changePasswordRequestAgent,
   {responseType: 'text'}
   
  );
}

public getAgentHasFirstAuth(
	username:string
){
	return this.http.post<any>(this.agentUrl + "agent/changedPassword",username,httpOptions)
}

public getAgent(
	username:string,
){

	return this.http.post<any>(this.agentUrl+"getAgent",
	username,
	httpOptions)
}
public findAllClient(): Observable<any[]> {
	return this.http.get<any[]>(
		"http://localhost:8080/api/auth/listClients"
			);
}

public GetListVirement(
	adresse:String
  ) :Observable<any[]>{
   console.log("j'ai entré paid");
   return this.http.get<any[]>(this.clientUrlVirement+`listviremetAgent/${adresse}`,httpOptions);
  }

  public updateSold(numTel: string, solde: number) {
	console.log("updateSold");
	return this.http.post(this.agentUrl + 'updateSold?numTel=' + numTel + '&solde=' + solde, {});
  }
  public saveVirement(

	montant: String,
	ribSrc: String,
	ribDest: String,
	state: String,
	date: String,
	ownerphone:String,
	cin:String,

) {
	return this.http.post<Virement>("http://localhost:8080/virement/effectuerVirement",
		{
			montant,
			ribSrc,
			ribDest,
			state,
			date,
			ownerphone,
			cin
			
		},
		httpOptions
	);
}
}
