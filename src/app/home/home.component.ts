import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {DOCUMENT} from "@angular/common";
import Lenis from '@studio-freight/lenis'
import {AnimationOptions} from "ngx-lottie";

//ScrollTrigger.normalizeScroll(true)
//gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private previousScrollPosY=0;
  @ViewChild('horizontalScrollSection',{static:true}) horizontalScrollSection: ElementRef<HTMLDivElement> | undefined;
  optionsLottie: AnimationOptions = {
    path: 'https://lottie.host/4a1c3ea9-52da-4371-9060-456895d91fac/8qooHba5uv.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

   mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

  ngOnInit(): void {
    this.handleTitle();
    this.handleTextScroll();
    this.handleImgDisplay();

    if (!this.mobileCheck()){
      this.handleHorizontalScroll();
      this.handleSmoothScroll();
    }
  }

  private handleSmoothScroll(){
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  }

  private handleHorizontalScroll(){
/*    let smoother = ScrollSmoother.create({
      wrapper:'body',
      content:'body',smooth:2,
      effects:true
    })*/

    const horizontalScrollContainer = document.getElementById('horizontalScrollContainer');
    let amountToScroll = horizontalScrollContainer!.offsetWidth - window.innerWidth*1.7;

    const tween = gsap.to(horizontalScrollContainer,{
      x:-amountToScroll
    })

    ScrollTrigger.create({
      trigger:'#horizontal',
      start:"top -15%",
      end:"+=" +amountToScroll,
      pin:true,
      animation:tween,
      scrub:1,
      //markers:true
    })
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
        document.getElementById('title')!.style.
          transform = `translate(-50%, -50%) scale(${Math.max(1,lastKnownScrollPosition*5)})`;
        document.getElementById('title')!.style.
            fontSize = `${Math.exp(lastKnownScrollPosition*5)+10}vw`

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

  private handleImgDisplay() {
    //const paulBleu3 = document.getElementById('paul_bleu_3');
    const instaLinks = document.querySelector('#instaLink .wrapper');

    window.addEventListener('scroll', (e) =>{
     /* if (paulBleu3!.classList.contains('hidden') && this.getPositionVerticale() >= 1200){
        paulBleu3!.classList.add('visible');
        paulBleu3!.classList.remove('hidden');
      }*/

      if (!instaLinks!.classList.contains('instaLinksAnimated') &&
        this.getPositionVerticale() >= window.innerHeight*7){
        instaLinks!.classList.add('instaLinksAnimated')
      }
    })
  }
}
