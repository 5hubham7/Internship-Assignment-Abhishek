import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  addProduct() {
    this.router.navigate(['add']);
  }

  getProducts() {
    this.productList = [
      {
        id: 1,
        name: 'Shubham',
        category: 'A',
        price: 1000,
        quantity: 10,
        active: 'yes',
      },
      {
        id: 2,
        name: 'Pavan',
        category: 'A',
        price: 3000,
        quantity: 10,
        active: 'yes',
      },
    ];
  }
}
