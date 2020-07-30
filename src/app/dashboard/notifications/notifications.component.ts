import {Component, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../../shared/services/request.service';
import {Notifikacija} from '../../shared/models/notifikacija';
import {Request} from '../../shared/models/requests/request.enum';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {Helper} from '../../shared/helper';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class NotiService {
  emitter = new Subject<number>();
  data = new BehaviorSubject<Notifikacija[]>(null);
  item = new BehaviorSubject<Notifikacija>(null);
  constructor() {
  }
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


  data: Notifikacija[] = [];
  constructor(private http: HttpClient, private notiService: NotiService, private datePipe: DatePipe) {
  }

  compareDate(x: Date): boolean {
    console.log('hi');
    return this.datePipe.transform(x, 'yyyy-MM-dd') ===  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  getLenght(): number{
    return this.data.filter(x => this.compareDate(x.datum)).map(x => x).length;
  }

  ngOnInit(): void {
    this.notiService.data.subscribe(res => {
      this.data.push(...res);
      this.notiService.emitter.next(this.getLenght());
    });

    this.notiService.item.subscribe(res => {
      if (res){
        this.data.splice(0, 0, res);
        this.notiService.emitter.next(this.getLenght());

      }
    });

  }

}
