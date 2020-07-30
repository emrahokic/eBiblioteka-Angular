import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router, } from '@angular/router';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer: MatDrawer;
  isLogedIn = false;
  user = '';
  userImage = '';
  isSmallScreen: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private  auth: AuthService, private  breakpointObserver: BreakpointObserver) { }

  ngAfterViewInit(): void {

    setTimeout(() => {
    if (this.route.snapshot.firstChild){
      this.drawer.open();
    }else{
      this.drawer.close();
    }}, 500);
    }
  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 450px)').subscribe(obs => {
      this.isSmallScreen = obs.matches;
    });
    this.auth.user.subscribe(user => {
      if (user){
        this.isLogedIn = true;
        this.user = user.Ime + ' ' + user.Prezime;
        this.userImage = user.Slika;
      }
    });
  }
  onBtnClickClose(): void {

    this.drawer.opened = false;
  }

  onBtnClick(): void {
    if (this.drawer.opened){
      // this.drawer.toggle().finally(() => {
      //   this.drawer.toggle();
      // });
      return;
    }


    this.drawer.toggle();
  }

  onLogout(): void {
    this.auth.logout();
    this.isLogedIn = false;
    this.user = '';
  }
}
