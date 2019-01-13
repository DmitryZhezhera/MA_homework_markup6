class Carousel {
    constructor(el) {
        this.el = el;
        this.currentIndex = 0;
        this.slidesMargin = 0;
        this.initElements();
        this.initCarousel();
        this.listenEvents();
    }

    initElements() {
        this.elements = {
            prev: this.el.querySelector('[data-prev]'),
            next: this.el.querySelector('[data-next]'),
            slides: this.el.querySelector('.slides'),
        };
    }

    initCarousel() {
        this.initSlides();
    }

    checkIndex(index){
        let result=index;
        if (index < 0) result = this.slides.length - 1;
        if (index > this.slides.length - 1) result = 0;
        return result;    
    }

    initSlidesOrders(index){
        this.currentIndex = index;
        this.slides.forEach(element => {
            element.classList.remove('show');
        });
        
        this.slides[index].classList.add('show');
        this.slides[index].style.order=0;
        
        let index1=this.checkIndex(index+1);
        this.slides[index1].classList.add('show');
        this.slides[index1].style.order=1;

        let index2=this.checkIndex(index1+1);
        this.slides[index2].classList.add('show');
        this.slides[index2].style.order=2;
    }

    initSlides() {
        this.slides = this.el.querySelectorAll('.slide');
        this.initSlidesOrders(0);
    }

    listenEvents() {
        this.elements.prev.addEventListener('click', () => {
            this.currentIndex--;
            this.currentIndex = this.checkIndex(this.currentIndex);
            // this.slidesMargin += this.getSlideWidth(this.currentIndex - 1);
            // this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
            this.initSlidesOrders(this.currentIndex);
        });
        this.elements.next.addEventListener('click', () => {
            this.currentIndex++;
            this.currentIndex = this.checkIndex(this.currentIndex);
            // this.slidesMargin -= this.getSlideWidth(this.currentIndex);
            // this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
            this.initSlidesOrders(this.currentIndex);
        });
        console.log("this.currentIndex_",this.currentIndex);
    }

    getSlideWidth(index) {
        const slide = this.slides[index];
        const style = window.getComputedStyle(slide);
        const slideInnerSize = slide.getBoundingClientRect();
        return slideInnerSize.width
            + parseInt(style.marginLeft, 10)
            + parseInt(style.marginRight, 10);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(document.querySelector('.carousel'));
    console.dir(carousel);
});
