import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

 @Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls:  ['./auth.component.css']
 })
 export class AuthComponent implements OnDestroy {

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closeSub: Subscription;
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;


    constructor(private authService: AuthService, private router: Router) {}


     ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }    
     }


    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode) {
            authObs = this.authService.login(email, password);
        }
        else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe({
            next: (responseData: any) => {
                console.log("success: ", responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, error: (errorResponse: any) => {
                console.log("error: ", errorResponse);
                this.error = errorResponse;
                this.isLoading = false;
                this.showErrorAlert(errorResponse)
            }, complete: () => form.reset()
        })
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        //const alertComp = new AlertComponent(); don't work
       /*  const alertContainer = this.viewContainerRef.createComponent(
            AlertComponent
        ); */
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }

 }
