import { addToCartWithFfyEffect, deleteFromCart, minusProduct, plusProduct } from './cart.js';

import {addToLovely, clearLovely, deleteFromLovely} from './lovely.js'

document.addEventListener("click", documentActions);

function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.classList.contains('header__contacts-block-title')) {
        document.querySelector('.contacts').classList.add('active');
    } else if (!targetElement.closest('.contacts') || targetElement.classList.contains('contacts__top') ||  targetElement.closest('.contacts__top')) {
        document.querySelector('.contacts').classList.remove('active');
    }

    if (targetElement.classList.contains('header__catalog-title')) {
        document.querySelector('.menu-catalog').classList.add('active');
    } else if (!targetElement.closest('.menu-catalog') || targetElement.closest('.menu-catalog__close')) {
        document.querySelector('.menu-catalog').classList.remove('active');
    }


    if (targetElement.classList.contains('item-new-products__button') ||  targetElement.closest('.item-new-products__button')) {
        const productId = targetElement.closest('.new-products__item').dataset.pid;
        addToCartWithFfyEffect(targetElement.closest('.item-new-products__button'), productId);
        e.preventDefault();
    }

    if (targetElement.classList.contains('header__cart') || targetElement.closest('.header__cart')) {
        if (document.querySelector('.cart-list').children.length > 0) {
            document.querySelector('.header__cart').classList.add('_active-cart');
        }
        e.preventDefault();
    } 
	
	if (targetElement.closest('.cart-header__top') || (!targetElement.closest('.cart-header__list') && !targetElement.classList.contains('item-new-products__button') && !targetElement.closest('.header__cart'))) {
        document.querySelector('.header__cart').classList.remove('_active-cart');
    }

    if (targetElement.classList.contains('cart-list__delete')) {
        const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
        deleteFromCart(productId);
        e.preventDefault();
    }

	if (targetElement.classList.contains('cart-list__item_minus')) {
		e.preventDefault();
		const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
        minusProduct(productId);
    }

	if (targetElement.classList.contains('cart-list__item_plus') ) {
		e.preventDefault();
		const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
        plusProduct(productId);
    }

	if (targetElement.classList.contains('header__burger-icon') || targetElement.closest('.header__burger-icon')) {
        document.querySelector('.header__bottom-content').classList.toggle('active');
    } 

	if (targetElement.classList.contains('status__current') ||  targetElement.closest('.status__current')) {
        targetElement.closest('.status').classList.toggle('active');
    } 

	if (targetElement.classList.contains('status-header__icon') || targetElement.closest('.status-header__icon')) {
        if (document.querySelector('.status-list').children.length > 0) {
            document.querySelector('.header__status').classList.add('_active-status');
        }
        e.preventDefault();
    } 
	
	if (targetElement.closest('.status-header__top') || (!targetElement.closest('.status-header__list') && !targetElement.classList.contains('status__item_like') && !targetElement.closest('.header__status'))) {
        document.querySelector('.header__status').classList.remove('_active-status');
    }

	if (targetElement.classList.contains('status__item_like')) {
		e.preventDefault();
		const productId = targetElement.closest('.new-products__item').dataset.pid;
		const currentStatus = targetElement.closest('.new-products__item').querySelector('.status__current');
		currentStatus.classList = 'status__current status__current_like _icon-heart-fill'
		targetElement.closest('.status').classList.remove('active');
        addToLovely(targetElement, productId);
    } 

	if (targetElement.classList.contains('status-list__delete')) {
        const productId = targetElement.closest('.status-list__item').dataset.lovelyPid;
        deleteFromLovely(targetElement, productId);
        e.preventDefault();
    }

	if (targetElement.classList.contains('status-header__button')) {
        clearLovely();
        e.preventDefault();
    }
}

