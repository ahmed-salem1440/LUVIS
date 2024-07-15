import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartNumber:any = this._CartsService.cartCount.getValue();  
  ngOnInit(): void {    
  }
  constructor(private _CartsService:CartsService){
    this._CartsService.cartCount.subscribe({
      next:(newValue)=>{
        this.cartNumber = newValue
      }
    })
  }
  
  
}
