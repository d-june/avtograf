import Swiper, { Navigation, Autoplay, Pagination, EffectCoverflow } from 'swiper';

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}

// Инициализация слайдеров
function initSliders() {
	bildSliders();

	if (document.querySelector('.hero-main__slider')) { 
		new Swiper('.hero-main__slider', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			pagination: {
				el: '.swiper-slide__pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + ( (index + 1)) + "</span>";
				},
			},
			
			navigation: {
				prevEl: '.swiper-slide__prev',
				nextEl: '.swiper-slide__next',
			},
		});
	}

	if (document.querySelector('.new-products__slider')) { 
		new Swiper('.new-products__slider', { 

			modules: [Navigation, EffectCoverflow],
			effect: "coverflow",
			observer: true,
			observeParents: true,
  			grabCursor: true,
  			spaceBetween: 32,
  			slidesPerView: 4,
  			coverflowEffect: {
				rotate: 0,
    			depth: 0,
				slideShadows: 0,
				scale: 0.85,
				stretch: 22,
  			},

			navigation: {
				prevEl: '.swiper-slide__prev',
				nextEl: '.swiper-slide__next',
			},

			
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 21,
				},
				375: {
					slidesPerView: 2,
					spaceBetween: 21,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 21,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 21,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
			},
			
		});
	}

	if (document.querySelector('.brands-main__slider')) { 
		new Swiper('.brands-main__slider', { 
			modules: [Navigation, EffectCoverflow, Autoplay],
			effect: "coverflow",
			observer: true,
			observeParents: true,
  			grabCursor: true,
  			spaceBetween: 32,
			loop: true,
  			slidesPerView: 7,
  			coverflowEffect: {
				rotate: 0,
    			depth: 0,
				slideShadows: 0,
				scale: 0.95,
				stretch: -3,
  			},
			  autoplay: {
				delay: 1500,
				disableOnInteraction: false,
			},


			navigation: {
				prevEl: '.swiper-slide__prev',
				nextEl: '.swiper-slide__next',
			},

			// Брейкпоинты
		
			breakpoints: {
				320: {
					slidesPerView: 3.5,
					spaceBetween: 25,
				},
				500: {
					slidesPerView: 4.5,
					spaceBetween: 20,
				},
				650: {
					slidesPerView: 5,
					spaceBetween: 25,
				},
				768: {
					slidesPerView: 6,
					spaceBetween: 25,
				},
				992: {
					slidesPerView: 6,
					spaceBetween: 25,
				},
				1268: {
					slidesPerView: 7,
					spaceBetween: 32,
				},
			},
		
		});
	}
}

window.addEventListener("load", function (e) {
	initSliders();
});