import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {NotiService} from '../notifications/notifications.component';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit {
  isAuth = false;

  @Output() onSideNaveSwitch = new EventEmitter<void>();
  @Output() onNotificationSwitchEM = new EventEmitter<void>();
  numberOfNotifications: number;
  constructor(private authService: AuthService, private notiService: NotiService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.user.value != null;
    this.notiService.emitter.subscribe(res => {
      this.numberOfNotifications = res;
    });
  }

  onBtnClick(): void {
    this.onSideNaveSwitch.emit();
  }

  onNotificationSwitch(): void {
    this.onNotificationSwitchEM.emit();
  }
}
