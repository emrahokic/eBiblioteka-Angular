import {Component, Input, OnInit } from '@angular/core';
import {Knjiga} from '../../../shared/models/knjiga';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit{

  @Input() book: Knjiga;
  constructor() { }

  ngOnInit(): void {
  }


}
