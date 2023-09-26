import { Component, OnInit } from '@angular/core';
import {windowWhen} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private previousScrollPosY=0;

  constructor() { }

  ngOnInit(): void {
    this.handleTitle();
    this.handleTextScroll();
    this.handleHorizontalScroll();
    this.handleButton3();
    this.handleImgDisplay();
  }

  redirect1() {
    window.open('https://www.instagram.com/p/Cu2I_95I9dt/?img_index=1','_blank');
  }

  redirect2() {
    window.open('https://www.instagram.com/p/Cu2I2imoKJw/?img_index=1','_blank');
  }

  redirect3() {
    window.open('https://www.instagram.com/p/Cu2It37IchT/?img_index=1','_blank');
  }

  redirectInsta() {
    window.open('https://www.instagram.com/ammarguerite/','_blank');
  }

  private handleTitle() {
    document.addEventListener("scroll", (e) => {
      let lastKnownScrollPosition = window.scrollY/window.innerHeight;
      if( lastKnownScrollPosition < 1){
        document.getElementById('title')!.style.transform = `translate(-50%, -50%) translateZ(0) scale(${Math.exp(lastKnownScrollPosition*5)})`;

        document.getElementById('title')!.style.display = 'inherit'
        document.getElementById('background')!.style.display = 'inherit'
        document.getElementById('logo')!.style.opacity = '0'
      }
      else{
        document.getElementById('title')!.style.display = 'none'
        document.getElementById('background')!.style.display = 'none'
        document.getElementById('logo')!.style.opacity = '1'
      }

    })
  }

  private handleTextScroll() {
    document.addEventListener("scroll", (e) => {
      let lastKnownScrollPosition = window.scrollY/window.innerHeight;
      if (lastKnownScrollPosition > 1 && lastKnownScrollPosition <2.5){
        document.getElementById("textScroll1")!.style.transform = `translateX(${(lastKnownScrollPosition-2)*10}vw)`;
        document.getElementById("textScroll2")!.style.transform = `translateX(${(lastKnownScrollPosition-1)*-10}vw)`;
        document.getElementById("textScroll3")!.style.transform = `translateX(${(lastKnownScrollPosition-2.5)*10}vw)`;
        document.getElementById("textScroll4")!.style.transform = `translateX(${(lastKnownScrollPosition-1)*-10}vw)`;
      }
    })
  }

  private getPositionVerticale() {
    return window.scrollY || window.pageYOffset;
  }

  private handleHorizontalScroll() {

    let h = document.getElementById("horizontal");
    window.addEventListener("scroll",(e)=>{
      let currentPosY = this.getPositionVerticale();
      if (currentPosY >= 2600){
        h!.style.position="sticky";
        h!.style.top= "-100px";
      }
      if(currentPosY > 2690 && currentPosY < 4990){
        if (currentPosY > this.previousScrollPosY){
          // position actuelle plus basse que la précédente : on descend
          h!.scrollLeft += h!.scrollWidth/3500*(currentPosY-this.previousScrollPosY)
        }else{
          // sinon on monte
          h!.scrollLeft -= h!.scrollWidth/3500*(this.previousScrollPosY-currentPosY);
        }
      }
      if (currentPosY >= 5000){
        h!.style.position="relative";
        h!.style.top= "2500px";
      }
      this.previousScrollPosY = currentPosY;
    })
  }

  // ne fonctionne pas
  private handleButton3() {
    document.addEventListener("mouseup", (e) => {
      if (e!.button === 1){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
      return true;
    });

  }

  private handleImgDisplay() {
    //const paulBleu3 = document.getElementById('paul_bleu_3');
    const instaLinks = document.querySelector('#instaLink .wrapper');

    window.addEventListener('scroll', (e) =>{
     /* if (paulBleu3!.classList.contains('hidden') && this.getPositionVerticale() >= 1200){
        paulBleu3!.classList.add('visible');
        paulBleu3!.classList.remove('hidden');
      }*/

      if (!instaLinks!.classList.contains('instaLinksAnimated') && this.getPositionVerticale() >= 7200){
        instaLinks!.classList.add('instaLinksAnimated')
      }
    })
  }
}
