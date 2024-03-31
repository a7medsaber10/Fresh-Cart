import { ProductService } from 'src/app/services/product.service';
import { itemData } from './../../interfaces/categories-and-brands';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-description',
  templateUrl: './brand-description.component.html',
  styleUrls: ['./brand-description.component.css']
})
export class BrandDescriptionComponent implements OnInit{
  brandId: string = '';
  isLoading: boolean = false;
  brandDetails: itemData = {
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
    this.getBrandById();
    this.getBrandDetails();
  }

  getBrandById(){
    this._ActivatedRoute.params.subscribe(params => this.brandId = params['id']);
  }

  getBrandDetails() {
    this._ProductService.getBrandById(this.brandId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.brandDetails = response.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }

}

