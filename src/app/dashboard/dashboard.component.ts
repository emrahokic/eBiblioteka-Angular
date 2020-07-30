import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../shared/services/request.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Request} from '../shared/models/requests/request.enum';
import {MatDrawer} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Notifikacija} from '../shared/models/notifikacija';
import {NotiService} from './notifications/notifications.component';
import {DatePipe} from '@angular/common';
import {Helper} from '../shared/helper';

interface NavItems {
  Name: string;
  Icon: string;
  Path: string;
  Style: string;
}
const navChildStyle = 'padding-left:15px';
const navParentStyle = 'font-weight: bold';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  @ViewChild('drawer') drawer: MatDrawer;
  isSmallScreen: any;
  isOpened = true;
  private size: any;
  mode = '';
  typesOfShoes: NavItems[] = [
    {Name: 'Books', Icon: 'library_books', Path: 'books', Style: navParentStyle},
    {Name: 'Add Book', Icon: 'book', Path: '', Style: navChildStyle},
    {Name: 'Reservations', Icon: 'perm_contact_calendar', Path: '', Style: navChildStyle},
    {Name: 'Add Genre', Icon: 'local_activity', Path: '', Style: navChildStyle},
    {Name: 'Publishers', Icon: 'history_edu', Path: '', Style: navParentStyle},
    {Name: 'Add Publisher', Icon: 'history_edu', Path: '', Style: navChildStyle},
    {Name: 'Authors', Icon: 'contacts', Path: '', Style: navParentStyle},
    {Name: 'Add Author', Icon: 'account_box', Path: '', Style: navChildStyle},
    {Name: 'Members', Icon: 'person_pin', Path: '', Style: navParentStyle},
    {Name: 'Add Member', Icon: 'person_add', Path: '', Style: navChildStyle},
    {Name: 'Employees', Icon: 'assignment_ind', Path: '', Style: navParentStyle},
    {Name: 'Add Employee', Icon: 'group_add', Path: '', Style: navChildStyle},
    {Name: 'LOGOUT', Icon: 'login', Path: '/auth', Style: navParentStyle + ';margin-top:20px'}
  ];
  isNotificationOpen = false;
  private notifikacijaService: RequestService<Notifikacija>;

  // tslint:disable-next-line:max-line-length
  constructor(private datePipe: DatePipe, private notiService: NotiService, private auth: AuthService, private http: HttpClient, private  breakpointObserver: BreakpointObserver) {
    this.notifikacijaService = new RequestService<Notifikacija>(http, Request.NOTIFIKACIJA);
  }
  compareDate(x: Date): boolean {
    console.log('hi');
    return this.datePipe.transform(x, 'yyyy-MM-dd') ===  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.notifikacijaService.get().subscribe(res => {

      this.notiService.data.next(res);
      this.notiService.emitter.next( res.filter(x => this.compareDate(x.datum)).map(x => x).length);
    });

    this.breakpointObserver.observe(['(max-width: 450px), (max-width: 650px)']).subscribe(obs => {

      console.log(obs);
      if (obs.breakpoints['(max-width: 450px)']){
        this.isSmallScreen = obs.breakpoints['(max-width: 450px)'];
        this.isOpened = false;

        this.mode = this.isSmallScreen ? 'over' : 'side';
      }else{
        this.isSmallScreen = obs.breakpoints['(max-width: 450px)'];
        this.isOpened = false;
        this.mode = this.isSmallScreen ? 'over' : 'side';
      }
      if (obs.breakpoints['(max-width: 650px)']){
        this.isOpened = false;
      }else {
        this.isOpened = true;
      }
    });
  }

  ngOnDestroy(): void {
  }

  onNotificationSwitch(): void {
    this.isNotificationOpen = !this.isNotificationOpen;
  }
}
