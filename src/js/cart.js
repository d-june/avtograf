import {enumerate} from './enumerate.js'

const cartList = document.querySelector('.cart-list');
const cart = document.querySelector('.cart-header');
const cartIcon = cart.querySelector('.cart-header__icon');

let cartProductsList = []

if (JSON.parse(localStorage.getItem('products'))) {
	cartProductsList = JSON.parse(localStorage.getItem('products'));
}

export const renderCartBody = () => {
	JSON.parse(localStorage.getItem('products')).map(cartProduct => {
		const cartProductContent = `
		<a href="404.html" class="cart-list__image-ibg"><img src=${cartProduct.imageUrl} alt=${cartProduct.title}></img></a>
		<div class="cart-list__body">
			<a href="404.html" class="cart-list__title">${cartProduct.title}</a>
			<div class="cart-list__about">
				<div class="cart-list__quantity"><div class="cart-list__item_minus" ${cartProduct.quantity === 0 && "disabled"}>-</div><span>${cartProduct.quantity}</span> шт.<div class="cart-list__item_plus">+</div></div>
				<div class="cart-list__price">${new Intl.NumberFormat('ru-RU').format(cartProduct.price)} руб.</div>
			</div>
		</div>
		<button class="cart-list__delete"></button>`;
	
		cartList.insertAdjacentHTML('beforeend', `<div class="cart-list__item-wrapper"><li data-cart-pid="${cartProduct.id}" class="cart-list__item">${cartProductContent}</li></div>`);
	})
}


export const renderCartOrder = () => {
	const cartOrder = document.querySelector('.cart-header__order');

	let totalPrice = 0;
	if(JSON.parse(localStorage.getItem('products'))) {
		JSON.parse(localStorage.getItem('products')).forEach(cartProduct => {
			totalPrice = totalPrice + Number(cartProduct.price) * Number(cartProduct.quantity)
		});
		cartOrder.innerHTML = `
			<div class="cart-header__quantity">${JSON.parse(localStorage.getItem('products')).length} ${enumerate(JSON.parse(localStorage.getItem('products')).length, ["товар", "товара", "товаров"])}</div>
			<div class="cart-header__payment">
				<div>К оплате:</div>
				<div class="cart-header__total-price">${new Intl.NumberFormat('ru-RU').format(totalPrice)} руб.</div>
			</div>
		`
	}
	
}

export const getCartProducts = () =>  {
	const cart = document.querySelector('.cart-header');
	const cartIcon = cart.querySelector('.cart-header__icon');
	
	if(JSON.parse(localStorage.getItem('products')) && JSON.parse(localStorage.getItem('products')).length > 0) {
		cartIcon.insertAdjacentHTML('beforeend', `<span>${JSON.parse(localStorage.getItem('products')).length}</span>`);
		renderCartBody()
		renderCartOrder()
	}
}

document.addEventListener("DOMContentLoaded", getCartProducts);


export function addToCartWithFfyEffect(productButton, productId) {

	if (!productButton.classList.contains('_hold')) {
		productButton.classList.add('_hold');
		productButton.classList.add('_fly');
		productButton.classList.add('loading');

		const cart = document.querySelector('.header__cart');
		const product = document.querySelector(`[data-pid="${productId}"]`);
		const productImage = product.querySelector('.item-new-products__image');

		const productImageFly = productImage.cloneNode(true);

		const productImageFlyWidth = productImage.offsetWidth;
		const productImageFlyHeight = productImage.offsetHeight;
		const productImageFlyTop = productImage.getBoundingClientRect().top;
		const productImageFlyLeft = productImage.getBoundingClientRect().left;

		productImageFly.setAttribute('class', '_flyImage-ibg');
		productImageFly.style.cssText =
			`
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
		`;

		document.body.append(productImageFly);

		const cartFlyLeft = cart.getBoundingClientRect().left;
		const cartFlyTop = cart.getBoundingClientRect().top;

		productImageFly.style.cssText =
			`
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity:0;
		`;

		productImageFly.addEventListener('transitionend', function () {
			if (productButton.classList.contains('_fly')) {
				productImageFly.remove();
				addToCart(productButton, productId);
				productButton.classList.remove('_fly');
				productButton.classList.remove('loading');
			}
		});
	}
}

export function addToCart(productButton, productId) {

	const product = document.querySelector(`[data-pid="${productId}"]`);
		const cartProductImageUrl = product.querySelector('.item-new-products__image').src;
		const cartProductTitle = product.querySelector('.item-new-products__title').innerHTML;
		const cartProductPrice = product.querySelector('.item-new-products__price').innerHTML;

		if(JSON.parse(localStorage.getItem('products'))) {
			const existProductIndex = cartProductsList.findIndex(cartProduct => cartProduct.id === productId)
			if(existProductIndex !== -1) {
				cartProductsList[existProductIndex].quantity = cartProductsList[existProductIndex].quantity + 1
			} else {
				cartProductsList.push({id: productId, 'imageUrl': cartProductImageUrl, 'title': cartProductTitle, 'price': cartProductPrice.split(' ')[0].split('&nbsp;').join(''), 'quantity': 1})
			}
		} else {
			cartProductsList.push({id: productId, 'imageUrl': cartProductImageUrl, 'title': cartProductTitle, 'price': cartProductPrice.split(' ')[0].split('&nbsp;').join(''), 'quantity': 1})
		}

		localStorage.setItem('products', JSON.stringify(cartProductsList));

		cartList.innerHTML=''

		renderCartBody()
		renderCartOrder()

		if(localStorage.getItem('products')) {
			cartIcon.innerHTML = `<span>${JSON.parse(localStorage.getItem('products')).length}</span>`;
		} else {
			cartIcon.insertAdjacentHTML('beforeend', `<span>${JSON.parse(localStorage.getItem('products')).length}</span>`);
		}

		productButton.classList.remove('_hold');
	} 

export function deleteFromCart(productId) {
	if(window.confirm('Вы действительно хотите удалить товар?')) {
		const newCartList = JSON.parse(localStorage.getItem('products')).filter(cartItem => cartItem.id !== productId);
		localStorage.setItem('products', JSON.stringify(newCartList));
		cartList.innerHTML=''
		cartProductsList = []
	
		renderCartBody()
		renderCartOrder()
	
		if(JSON.parse(localStorage.getItem('products')) && JSON.parse(localStorage.getItem('products')).length > 0) {
			cartIcon.innerHTML =  `<span>${JSON.parse(localStorage.getItem('products')).length}</span>`;
		} else {
			cartIcon.innerHTML = ''
		}
	}

	
}

export function minusProduct(productId) {
	if(JSON.parse(localStorage.getItem('products'))) {
		const existProductIndex = cartProductsList.findIndex(cartProduct => cartProduct.id === productId)
		if(existProductIndex !== -1) {
			cartProductsList[existProductIndex].quantity = cartProductsList[existProductIndex].quantity - 1
		}
	}

	cartList.innerHTML=''
	localStorage.setItem('products', JSON.stringify(cartProductsList));

	renderCartBody()
	renderCartOrder()

	if(JSON.parse(localStorage.getItem('products')) && JSON.parse(localStorage.getItem('products')).length > 0) {
		cartIcon.innerHTML =  `<span>${JSON.parse(localStorage.getItem('products')).length}</span>`;
	} else {
		cartIcon.innerHTML = ''
	}
}

export function plusProduct(productId) {
	if(JSON.parse(localStorage.getItem('products'))) {
		const existProductIndex = cartProductsList.findIndex(cartProduct => cartProduct.id === productId)
		if(existProductIndex !== -1) {
			cartProductsList[existProductIndex].quantity = cartProductsList[existProductIndex].quantity + 1
		}
	}

	cartList.innerHTML=''
	localStorage.setItem('products', JSON.stringify(cartProductsList));

	renderCartBody()
	renderCartOrder()

	if(JSON.parse(localStorage.getItem('products')) && JSON.parse(localStorage.getItem('products')).length > 0) {
		cartIcon.innerHTML =  `<span>${JSON.parse(localStorage.getItem('products')).length}</span>`;
	} else {
		cartIcon.innerHTML = ''
	}
}
