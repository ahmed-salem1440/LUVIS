import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Product } from 'src/app/product';
import { CartsService } from 'src/app/carts.service';
import { ProductsService } from 'src/app/products.service';
defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService,private _ActivatedRoute:ActivatedRoute,private _CartsService:CartsService){}
  @ViewChild('overlay') overlay!:ElementRef;
  @ViewChild('productImage') productImage!:ElementRef;
  @ViewChild('imageContainer') imageContainer!:ElementRef;
  zooming(e:any){
    let imageWith = this.imageContainer.nativeElement.offsetWidth
    let imageHeight = this.imageContainer.nativeElement.offsetHeight
    this.overlay.nativeElement.style.display = 'block'
    this.overlay.nativeElement.style.backgroundImage  = `url('${this.product.image}')`
    const parentRect = this.imageContainer.nativeElement.getBoundingClientRect()
    let x = e.pageX
    let y = e.pageY
    let posX = ((x - this.imageContainer.nativeElement.offsetLeft) / imageWith) * 100;
    let posY = ((y - this.imageContainer.nativeElement.offsetTop) / imageHeight) * 100;
    this.overlay.nativeElement.style.backgroundPosition =`${posX.toFixed(2)}%  ${posY.toFixed(2)}%`
  }
  hidezooming(){
    this.overlay.nativeElement.style.display = 'none'
  }
  isLoading:boolean = true
  currentId:string = ''
  product:Product = {    
    category:'' ,
    description:'' ,
    id:'' ,
    image:'' ,
    price:'' ,
    rating:{rate:'' ,count:'' },
    title:'' 
  };
  productQuantity:number = 1
  produtRating:number = 0
  solidStars:any[] = [] 
  halfStar:boolean = false
  emptyStar:any[] = []
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      this.currentId = params.get('id')!
      this.getDetails()
    }
  })

}
getDetails(){
  this._ProductsService.getProductDetails(this.currentId).subscribe({
    next:(response)=>{
      this.isLoading = false
      this.product = response
      this.produtRating = Number(response.rating.rate)
      this.solidStars = Array(Math.floor(this.produtRating)).fill(0).map((x, i) => i + 1);
      this.emptyStar = Array(5 - Math.ceil(this.produtRating)).fill(0).map((x, i) => i + 1);
      if(this.produtRating%1 !==0){
        this.halfStar = true
      }
    }
  })
}
updateCart(product:any,quantity:number){
this._CartsService.updateCart(product,quantity)
}
}
