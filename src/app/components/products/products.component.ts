import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from 'src/app/carts.service';
import { Product } from 'src/app/product';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService,private _cartService:CartsService ,private _ActivatedRoute:ActivatedRoute,private _Router:Router) {}
currentPath:string = ''
searchTerm:string = ''
isLoading:boolean = true
  products: any[] = [];
  categories: any[] = [];
  updateCart(event:Event,product:Product){
    event.stopPropagation()
    this._cartService.updateCart(product,1)
  }
  stop(event:Event){
    console.log('heart');
    
    event.stopPropagation()
  }
  getAllProducts() {
    this.isLoading = true
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.isLoading = false
        this.products = response;
        console.log(response)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllCategories() {
    this._ProductsService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getByCategory(category:string){
    this.isLoading = true
    this._ProductsService.getByCategory(category).subscribe({
      next:(response)=>{
        this.isLoading = false
        this.products = response
        
      }
    })
  }
  employed:any[] = []
  allEmps:any[] = []
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getEmps()
  }
  getEmps(){
    this._ProductsService.getAllEmps().subscribe({
      next:(response)=>{
        this.allEmps = response.Employees
        console.log(this.allEmps);
        this.employed = this.allEmps.filter(emp => emp.Status == "employed")
        console.log(this.employed);
        
      }
    })
  }
  
}
