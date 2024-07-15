import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/product';
import {BehaviorSubject, Observable} from 'rxjs'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartsService implements OnInit{
  cartCount = new BehaviorSubject(0)
  localCart = localStorage.getItem('userCart')
  ngOnInit(): void {
    if(this.localCart){
      this.cartCount.next(JSON.parse(this.localCart))
    }
  }
  constructor(private _HttpClient:HttpClient,private _ToastrService:ToastrService ) {
    if(localStorage.getItem('userCart')){
      this.cartCount.next(JSON.parse(localStorage.getItem('userCart')!).length)
    }
  }
  updateCart(product:Product,quantity:number){
    let modifiedItem = {
      product:product,
      quantity:quantity
    }
    let userCart = [];
    if(localStorage.getItem('userCart')){
      userCart = JSON.parse(localStorage.getItem('userCart')!)
      if(userCart.find((item:any) => item.product.id === modifiedItem.product.id)){
        if(quantity !== 0 ){
          userCart[userCart.indexOf(userCart.find((item:any) => item.product.id === modifiedItem.product.id))] = modifiedItem
        }else{
          userCart = userCart.filter((item:any)=> item.product.id  !== modifiedItem.product.id)
        }
      }else{
        userCart.push(modifiedItem)
      }
    }else{
      userCart.push(modifiedItem)
    }

    localStorage.setItem('userCart',JSON.stringify(userCart))
    console.log(userCart);
    this.cartCount.next(userCart.length)
    console.log(this.cartCount.getValue());
    this._ToastrService.success('Your Cart Updeted Successfully')
  }
  getTime(){
    let time = new Date()
    return time.getFullYear().toString()+ '-' + time.getMonth().toString()+ '-' + time.getDay().toString()

  }
  reshapeCart(){
    let localCart = JSON.parse(localStorage.getItem('userCart')!)
    let reshaped = localCart.map((item:any)=>{
      return {productId:item.product.id , quantity:item.quantity}
    })
    return reshaped
    
  }
  sendCart():Observable<any>{
    let cart = {
      userId:3,
      date:this.getTime(),
      products:this.reshapeCart()
  }
  return this._HttpClient.post('https://fakestoreapi.com/carts',cart)
  }

}
