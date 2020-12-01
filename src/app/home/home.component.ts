import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any;

  constructor(private router: Router, private http: HttpClient) {
    router.events.subscribe((val) => {
      this.http
        .get('http://localhost:3001/displayProducts')
        .subscribe((res) => {
          this.productList = res as string;
        });
    });
  }

  ngOnInit(): void {}

  addProduct() {
    this.router.navigate(['add']);
  }

  getProducts() {}
}
