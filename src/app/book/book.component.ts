import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';  

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title = "";
  author = "";
  books: Book[] =[];
  constructor() { }

  ngOnInit(): void {
    let oldBooks = localStorage.getItem("books")
    this.books = oldBooks?  JSON.parse(oldBooks): [];
  }
  addNewBooks():void{
    if(this.title.trim().length && this.author.trim()){
      let book: Book = {
        id: Date.now(),
        title: this.title,
        author: this.author
      }
      this.books.push(book);
      this.title = "";
      this.author ="";
      localStorage.setItem("books", JSON.stringify(this.books));
    }
  }
  
  deleteBooks(id: number):void{
    this.books = this.books.filter(book => book.id != id)
    localStorage.setItem("books", JSON.stringify(this.books));
  }

}
