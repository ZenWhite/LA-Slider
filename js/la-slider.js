'use strict';

class Slider {
	constructor(block) {
		this.sliderBlock = document.querySelector(block);
		this.options = {
			slidesType: 'img',
		    mode: 'slick',
	        fadeSpeed: 650,
	        fade: false
		}
		this.slides = this.sliderBlock.querySelectorAll(this.options.slidesType);
		this.arrowLeft = '<div class="arrow-left"> < </div>';
		this.arrowRight = '<div class="arrow-right"> > </div>';
		this.circlesBlock = '<div class="circle-block"></div>';
		this.content = '<div class="content"></div>';
		this.currentIndex = 0;
		this.currentValue = 0;

		this.render();
		this.eventsListener();
	}
	render() {
		this.sliderBlock.innerHTML = '';
		this.sliderBlock.classList.add('la-slider');

		if(this.options.mode == 'default') {
			this.createElements(this.sliderBlock);
		} else {
			this.sliderBlock.innerHTML += this.content;
			this.createElements(this.sliderBlock.querySelector('.content'));
		}
	}
	showAndHide() {
		if(this.options.mode == 'default') {
			this.slides.forEach(item => {
			    item.classList.add('hide');
		        this.slides[this.currentIndex].classList.remove('hide');
		    });
		}
	}
	eventsListener() {
		this.sliderBlock.addEventListener('click', e => {
			if( e.target.classList.contains('arrow-right') ) {
			    if(this.options.mode == 'default') {
			    	this.currentIndex++;

			        if( this.currentIndex >= this.slides.length ) this.currentIndex = 0;

			        this.showAndHide();
		            this.render();
			    } else {
			    	this.currentIndex++;
			    	const contentBlock = this.sliderBlock.querySelector('.content');
			    	contentBlock.style.transform = `translateX(${this.currentValue -= 100}%)`;

			    
			    	if( ( Math.abs( this.currentValue ) / 100) >= this.slides.length ) {
			    		this.currentIndex = 0;
		                this.currentValue = 0;
		                contentBlock.style.transform = `translateX(${this.currentValue}%)`;
		                changeCirlce();
	                } else {
	                	changeCirlce();
	                }
			    }
			}
			if( e.target.classList.contains('arrow-left') ) {
				if(this.options.mode == 'default') {
					this.currentIndex--;

				    if( this.currentIndex < 0 ) this.currentIndex = this.slides.length - 1;

				    this.showAndHide();
		            this.render();
				} else {
					this.currentIndex--;
					const contentBlock = this.sliderBlock.querySelector('.content');
			    	contentBlock.style.transform = `translateX(${this.currentValue += 100}%)`;

			    	if( this.currentValue == 100 ) {
			    		this.currentIndex = this.slides.length - 1;
		                this.currentValue = -100 * (this.slides.length - 1);
		                contentBlock.style.transform = `translateX(${this.currentValue}%)`;
		                changeCirlce();
	                } else {
	                	changeCirlce();
	                }
				}
			}
			if( e.target.classList.contains('circle') ) {

				if(this.options.mode == 'default') {
					this.currentIndex = e.target.dataset.index; 

				    this.showAndHide();
		            this.render(); 
				}  else {

					if(e.target.dataset.index > this.currentIndex) {
						this.currentIndex = e.target.dataset.index;
					    const contentBlock = this.sliderBlock.querySelector('.content');
					    this.currentValue = 0;
			    	    contentBlock.style.transform = `translateX(${this.currentValue -= this.currentIndex * 100}%)`;
			    	    changeCirlce();
					} else if(e.target.dataset.index < this.currentIndex) {
						this.currentIndex = e.target.dataset.index;
					    const contentBlock = this.sliderBlock.querySelector('.content');
					    this.currentValue = 0;
			    	    contentBlock.style.transform = `translateX(${this.currentValue += this.slides.length - (this.currentIndex * 100) - this.slides.length}%)`;
			    	    changeCirlce();
					} else {
						changeCirlce();
					}
				}
			}
		});
		const changeCirlce = () => {
			this.sliderBlock.querySelectorAll('.circle').forEach( item => {
			    item.classList.remove('active-circle');
			    this.sliderBlock.querySelectorAll('.circle')[this.currentIndex].classList.add('active-circle');
			});
		}
	}
	createElements(elem) {
		this.slides.forEach(item => {
			elem.append(item);
			item.classList.add('la-slide');
			item.setAttribute('draggable', false);
			item.style.animation = `fade ${this.options.fadeSpeed}ms`;
			item.style.transitionDuration = `${this.options.fadeSpeed}ms`;
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
}