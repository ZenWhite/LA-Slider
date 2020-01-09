'use strict';

class Slider {
	constructor(block, slide = 'img') {
		this.sliderBlock = document.querySelector(block);
		this.slides = this.sliderBlock.querySelectorAll(slide);
		this.arrowLeft = '<div class="arrow-left"> < </div>';
		this.arrowRight = '<div class="arrow-right"> > </div>';
		this.circlesBlock = '<div class="circle-block"></div>';
		this.content = '<div class="content"></div>';
		this.currentIndex = 0;

		this.render();
		this.eventsListener();
	}
	render() {
		this.sliderBlock.innerHTML = '';
		this.sliderBlock.classList.add('la-slider');

		this.slides.forEach(item => {
			this.sliderBlock.append(item);
			item.classList.add('la-slide');
			item.classList.add('fade');
		});

		this.showAndHide();

        this.sliderBlock.innerHTML += this.arrowLeft;
		this.sliderBlock.innerHTML += this.arrowRight;
		this.sliderBlock.innerHTML += this.circlesBlock;

		for( let i = 0; i < this.slides.length; i++ ) {
			let block = `<div class="circle" data-index="${i}"></div>`;
			this.sliderBlock.querySelector('.circle-block').innerHTML += block;
		}

		this.sliderBlock.querySelectorAll('.circle')[this.currentIndex].classList.add('active-circle');
	}
	showAndHide() {
		this.slides.forEach(item => {
			item.classList.add('hide');
		    this.slides[this.currentIndex].classList.remove('hide');
		});
	}
	eventsListener() {
		this.sliderBlock.addEventListener('click', e => {
			if( e.target.classList.contains('arrow-right') ) {
			    this.currentIndex++;

			    if( this.currentIndex >= this.slides.length ) this.currentIndex = 0;

			    this.showAndHide();
		        this.render();
			}
			if( e.target.classList.contains('arrow-left') ) {
				this.currentIndex--;

				if( this.currentIndex < 0 ) this.currentIndex = this.slides.length - 1;

				this.showAndHide();
		        this.render();
			}
			if( e.target.classList.contains('circle') ) {
				this.currentIndex = e.target.dataset.index; 

				this.showAndHide();
		        this.render(); 
			}
		});
	}
}