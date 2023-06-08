import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidden: boolean;
 
  successMessage: string = "";

    insertForm: FormGroup;
    Username: FormControl;
    Password: FormControl;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private tokenStorage: TokenStorageService
    ) {}

  ngOnInit(): void {
      this.hidden = true;

      if(this.tokenStorage.getToken()!=null){
        this.router.navigate(['home']); 
      }else{
      }

        // Initialize Form Controls
        this.Username = new FormControl('', [Validators.required]);
        this.Password = new FormControl('', [Validators.required]);

        // Initialize FormGroup using FormBuilder
        this.insertForm = this.fb.group({
            Username: this.Username,
            Password: this.Password,
        });


    }
    submitAdminLogInForm(){

        const logIn = this.Username.value;
        const password = this.Password.value;
        this.authService.login(logIn, password).subscribe({
          next: data => {
            console.log(data)
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveAgent(data);
            window.sessionStorage.setItem("username", logIn);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAgent().roles;
            this.router.navigate(['home']);
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
         
        });

  
  }
  reloadPage(): void {
    window.location.reload();


}

}
