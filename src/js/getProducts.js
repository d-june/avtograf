const PRODUCTS_URL="https://6516ddca09e3260018ca6b32.mockapi.io/products";
const productsContainer = document.querySelector('.new-products__wrapper')

const getProducts = async () => {
    const response = await fetch(PRODUCTS_URL);

    if(!response.ok) {
        productsContainer.insertAdjacentHTML('beforeend', `
        <div> Простите, произошла ошибка и мы не смогли загрузить товары...
        </div>`);
        throw new Error('Ошибка в получении товаров')
    }

    const products = await response.json()
    products.forEach(product => {
        const productContent = `
		<article class="new-products__item item-new-products" data-pid='${product.id}'>
			<div class="item-new-products__icons">
				<div class="item-new-products__${product.group === 'main' ? 'delivery' : product.group === 'new' ? 'new' : product.group === 'promotion' && 'promotion'} ${product.group === 'main' && '_icon-delivery'}">
                ${product.group === 'main' ? 'бесплатно' : product.group === 'new' ? 'новинка' : product.group === 'promotion' && 'акция'}</div>
				<div class="item-new-products__status status " data-class-modif="item-new-products__status">
                <div class="status__current _icon-heart"></div>
                <ul class="status__list">
                    <li class="status__item status__item_like _icon-heart-fill" data-status="like"></li>
                    <li class="status__item status__item_neutral _icon-heart-fill" data-status="neutral"></li>
                    <li class="status__item status__item_dislike _icon-heart-broken-fill" data-status="dislike"></li>
                </ul>
                </div>
			</div>
			<div class="item-new-products__content">
			<div class="item-new-products__picture-ibg">
				<img src="${product.imageUrl}" alt="шлифовальный диск" class="item-new-products__image">
			</div>
			<h3 class="item-new-products__title">${product.title}</h3>
			<div class="item-new-products__price">${product.price.toLocaleString('ru-RU')} р.</div>
			<button class="item-new-products__button btn"><div class="item-new-products__icon _icon-cart"></div><div class="item-new-products__text">В корзину</div></button>
			</div>						
		</article>
		`						
        productsContainer.insertAdjacentHTML('beforeend', `
        <div class="new-products__slide swiper-slide">
		    <div class="swiper-slide__column">${productContent}
            </div>
        </div>`);
    });
}

getProducts()

