import { Compte } from "./Compte";

export interface Client {

        id_user: number;
        username:String;
        nom:String;
        prenom: String;
        numTel: String;
        email:String;
        password: String;
        firstAuth: Boolean;
        compte: Compte;
        role: String;
}