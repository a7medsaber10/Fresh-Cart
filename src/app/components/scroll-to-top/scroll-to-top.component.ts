import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent{

  showArrow: boolean = false

  @HostListener('window:scroll')
  onScroll() {
    window.scrollY > 280 ? this.showArrow = true : this.showArrow = false
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
