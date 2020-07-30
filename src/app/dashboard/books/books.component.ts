import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../../shared/services/request.service';
import {Knjiga} from '../../shared/models/knjiga';
import {Request} from '../../shared/models/requests/request.enum';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css', '../../shared/box.css']
})
export class BooksComponent implements OnInit {

  books: Knjiga[] = [];
  private booksService: RequestService<Knjiga>;
  isLoading = true;
  constructor(private http: HttpClient) {
    this.booksService = new RequestService<Knjiga>(http, Request.KNJIGA);
  }

  ngOnInit(): void {
    this.booksService.get().subscribe(res => {
      this.books.push(...res);
      this.isLoading = false;
    });
  }

}
