import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3001/displayProducts').subscribe((res) => {
      this.productList = res as string;
    });
  }

  addProduct() {
    console.log(this.productList);
    this.router.navigate(['add']);
  }

  getProducts() {}
}
