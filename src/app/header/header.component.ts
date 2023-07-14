import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(private dataService: DataStorageService, private authService: AuthService) {}
  
  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !user ? false : true;
    //this.isAuthenticated = !!user;
   });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataService.storeRecipes();
  }

  onFetchData() {
    this.dataService.fetchRecipes();;
  }

  onLogout() {
    this.authService.logout();
  }
}
