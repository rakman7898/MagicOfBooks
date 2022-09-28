import { Component, OnInit } from '@angular/core';
import { Books } from '../Books';
import { RestService } from '../rest.service';
import { Users } from '../Users';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  constructor(private rs:RestService) { }
  userCompleted:Users[]=[];
   booksCompleted:Books[]=[];
   completedElements:Books[]=[];
   completedBooks:number[]=[];
   success!:boolean;
   i:number=0;
   j:number=0;

  ngOnInit(): void {
    this.success=this.rs.getMessage();
    console.log(this.success);
    this.rs.getBooks().subscribe((response:any)=>{
      console.log(response);
      this.booksCompleted=response;
      console.log(this.booksCompleted);
    });
    this.rs.getUsers().subscribe((response:any)=>{
      console.log(response);
      this.userCompleted=response;
      console.log(this.userCompleted);
      console.log(this.booksCompleted);
      console.log(this.userCompleted[this.rs.getUserLogIn()]["id"]);
      this.completedBooks=this.userCompleted[this.rs.getUserLogIn()]['Completed'];
      console.log(this.completedBooks);
      for(this.i=0;this.i<this.completedBooks.length;this.i++){
        for(this.j=0;this.j<this.booksCompleted.length;this.j++){
          if(this.completedBooks[this.i]==this.booksCompleted[this.j]["id"])
            {
              this.completedElements.push(this.booksCompleted[this.j]);
            }
        }
      }
    });
  }

}
