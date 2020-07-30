import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  userName = ' ';
  isShowing = false;
  userImage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.user.value != null;
    if (this.isAuth){
      this.userName = this.authService.user.value.Email;
      this.userImage = this.authService.user.value.Slika;
    }
  }

}
