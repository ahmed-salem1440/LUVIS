import { BehaviorSubject } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { CartsService } from 'src/app/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartsService: CartsService,private _ToastrService:ToastrService , private _Router:Router) {}
  @ViewChild('checkout') checkout!:ElementRef
  
  totalPrice:number = 0
  userCart: any[] = [];
  ngOnInit(): void {
    this.getItems();
    // this.isCartEmpty()
  }
  input: string = '';
  getItems() {
    const storedItems = localStorage.getItem('userCart')
    this.userCart = storedItems?  JSON.parse(storedItems):[];
    console.log(`user cart ${this.userCart}`);
    
    this.totalPrice = 0
    for(let i =0 ; i<this.userCart.length;i++){
      this.totalPrice += this.userCart[i].product.price * this.userCart[i].quantity
    }
  }
  updateCart(product: any, quantity: number) {
    this._CartsService.updateCart(product, quantity);
    this.getItems();
  }
  isCartEmpty():boolean{
     var isEmpty:boolean = this.userCart.length ===0
     console.log(isEmpty);
     return isEmpty
  }
  deleteCart(){
    localStorage.removeItem('userCart')
    this._CartsService.cartCount.next(0)
    this.getItems();
  }
  addUserOrder(){
    let userOrders = localStorage.getItem('userOrders')
    let ordersArray:any[] = []
    if(userOrders){
      ordersArray = JSON.parse(userOrders)
      ordersArray.unshift(JSON.parse(localStorage.getItem('userCart')!))
    }else{
      ordersArray.push(JSON.parse( localStorage.getItem('userCart')!))
    }
    localStorage.setItem('userOrders',JSON.stringify(ordersArray))
    console.log(JSON.parse(localStorage.getItem('userOrders')!));
    
  }
  sendCart(){
    this.checkout.nativeElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
    this._CartsService.sendCart().subscribe({
      next:(response)=>{
    this.checkout.nativeElement.innerHTML = 'Checkout <i class="fa-solid fa-circle-check"></i>'
    this._ToastrService.success('Your order has been sent successfully')
    this.addUserOrder()
    this._CartsService.cartCount.next(0)
    localStorage.removeItem('userCart')
    this._Router.navigate(['/orders'])
  }
})
  }
}
