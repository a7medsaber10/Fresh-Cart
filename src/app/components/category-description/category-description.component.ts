import { ProductService } from 'src/app/services/product.service';
import { itemData } from './../../interfaces/categories-and-brands';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-description',
  templateUrl: './category-description.component.html',
  styleUrls: ['./category-description.component.css']
})
export class CategoryDescriptionComponent implements OnInit{
  categoryId: string = '';
  isLoading: boolean = false;
  categoryDetails: itemData = {
    _id: '',
    name: '',
    slug: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  constructor(private _ProductService:ProductService, private _ActivatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getCategoryById();
    this.getCategoryDetails();
  }

  getCategoryById(){
    this._ActivatedRoute.params.subscribe(params => this.categoryId = params['id']);
  }

  getCategoryDetails() {
    this._ProductService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.categoryDetails = response.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }
}
