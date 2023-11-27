window.onload = function () {
	let preloader = document.querySelector('.preloader');
	setTimeout(function () {
		preloader.classList.add('hide-preloader');
	}, 200);
	
	setTimeout(function () {
		preloader.classList.add('preloader-hidden')
	}, 950);
}

