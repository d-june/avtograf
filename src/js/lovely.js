
let lovelyProductsList = []

const statusList = document.querySelector('.status-list');
const status = document.querySelector('.status-header');
const statusIcon = status.querySelector('.status-header__icon');

if (JSON.parse(localStorage.getItem('lovely'))) {
	lovelyProductsList = JSON.parse(localStorage.getItem('lovely'));
}

const renderLovelyBody = () => {
	JSON.parse(localStorage.getItem('lovely')).map(lovelyProduct => {
		const lovelyProductContent = `
		<a href="404.html" class="status-list__image-ibg"><img src=${lovelyProduct.imageUrl} alt=${lovelyProduct.title}></img></a>
		<div class="status-list__body">
			<a href="404.html" class="status-list__title">${lovelyProduct.title}</a>
            <div class="status-list__price">${new Intl.NumberFormat('ru-RU').format(lovelyProduct.price)} руб.</div>

		</div>
		<button class="status-list__delete _icon-heart-fill"></button>`;
	
		statusList.insertAdjacentHTML('beforeend', `<div class="status-list__item-wrapper"><li data-lovely-pid="${lovelyProduct.id}" class="status-list__item">${lovelyProductContent}</li></div>`);
	})
}

const getLovelyProducts = () =>  {
	
	if(JSON.parse(localStorage.getItem('lovely')) && JSON.parse(localStorage.getItem('lovely')).length > 0) {
		statusIcon.insertAdjacentHTML('beforeend', `<span>${JSON.parse(localStorage.getItem('lovely')).length}</span>`);
		renderLovelyBody()
	}
}

document.addEventListener("DOMContentLoaded", getLovelyProducts);


export function addToLovely(targetElement, productId) {

	const product = document.querySelector(`[data-pid="${productId}"]`);
		const cartProductImageUrl = product.querySelector('.item-new-products__image').src;
		const cartProductTitle = product.querySelector('.item-new-products__title').innerHTML;
		const cartProductPrice = product.querySelector('.item-new-products__price').innerHTML;

        if(JSON.parse(localStorage.getItem('lovely'))) {
			const lovelyProductExist = JSON.parse(localStorage.getItem('lovely')).find(prod => prod.id === productId)
			if(lovelyProductExist) {
				return
			}
		}
        

		lovelyProductsList.push({id: productId, 'imageUrl': cartProductImageUrl, 'title': cartProductTitle, 'price': cartProductPrice.split(' ')[0].split('&nbsp;').join(''), 'quantity': 1})
		

		localStorage.setItem('lovely', JSON.stringify(lovelyProductsList));

		statusList.innerHTML=''

        renderLovelyBody()

		if(localStorage.getItem('lovely')) {
			statusIcon.innerHTML = `<span>${JSON.parse(localStorage.getItem('lovely')).length}</span>`;
		} else {
			statusIcon.insertAdjacentHTML('beforeend', `<span>${JSON.parse(localStorage.getItem('lovely')).length}</span>`);
		}

	} 

export function deleteFromLovely(productButton, productId) {
	if(window.confirm('Удалить товар из избранного?')) {

		const newLovelyList = JSON.parse(localStorage.getItem('lovely')).filter(lovelyItem => lovelyItem.id !== productId);
		localStorage.setItem('lovely', JSON.stringify(newLovelyList));
		statusList.innerHTML=''
		lovelyProductsList = []

		renderLovelyBody()

		if(JSON.parse(localStorage.getItem('lovely')) && JSON.parse(localStorage.getItem('lovely')).length > 0) {
			statusIcon.innerHTML =  `<span>${JSON.parse(localStorage.getItem('lovely')).length}</span>`;
		} else {
			statusIcon.innerHTML = ''
		}
	}
}


export function clearLovely() {
	if(window.confirm('Очистить список?')) {
		const newLovelyList = [];
		localStorage.setItem('lovely', JSON.stringify(newLovelyList));
		statusList.innerHTML=''
		lovelyProductsList = []

		renderLovelyBody()

		statusIcon.innerHTML =  '';
	}
}
