import { itemData } from './../../interfaces/categories-and-brands';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  brandsList: itemData[] = []
  isLoading: boolean = false

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getAllBrands()
  }

  getAllBrands() {
    this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.isLoading = false
        this.brandsList = response.data
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }
}
