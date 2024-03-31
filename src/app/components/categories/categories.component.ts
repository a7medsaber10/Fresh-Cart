import { ProductService } from 'src/app/services/product.service';
import { itemData } from './../../interfaces/categories-and-brands';
import { Component, OnInit } from '@angular/core';
ProductService

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categoriesList:itemData[] = [];
  isLoading:boolean = false;

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllCategories();
  }
  getAllCategories() {
    this._ProductService.getAllCategories().subscribe({
      next: (response) => {
        this.isLoading = false
        this.categoriesList = response.data
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }
}
