import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userOrders:any[] = []
  totalPrice:any[] = []

  ngOnInit(): void {
    this.userOrders = JSON.parse(localStorage.getItem('userOrders')!)
    console.log(this.userOrders);
    for(let i = 0;0<this.userOrders.length;i++){
      let orderPrice = 0
      for(let j=0;j<this.userOrders[i].length;j++){
        orderPrice += this.userOrders[i][j].product.price*this.userOrders[i][j].quantity
      }
      this.totalPrice.push(orderPrice)
    }

  }

}
