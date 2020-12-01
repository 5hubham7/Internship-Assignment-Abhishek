import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  postdata: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  backToHome() {
    this.router.navigate(['home']);
  }

  add(name: String, categories: String, price: String, quantity: String) {
    if (name == '' || categories == '' || price == '' || quantity == '') {
      alert('Field cannot be empty!');
    } else {
      let newProduct = {
        name: name,
        categories: categories,
        price: price,
        quantity: quantity,
      };
      this.http
        .post('http://localhost:3001/insertProduct', newProduct)
        .subscribe((data) => {
          this.postdata = data;
          console.log(data);
        });
      this.router.navigate(['home']);
    }
  }
}
