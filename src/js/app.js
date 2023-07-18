import * as flsFunctions from './modules/functions.js';

flsFunctions.isWebp();

const offset = el => {
	const rect = el.getBoundingClientRect();
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

const addActiveOnScroll = (selectors, elements) => {
	for (let i = 0; i < selectors.length; i++) {
		const selector = selectors[i];
		const selectorHeight = selector.offsetHeight;
		const selectorOffset = offset(selector).top;
		const selectorStart = 2;

		let selectorPoint = window.innerHeight - selectorHeight / selectorStart;
		if (selectorHeight > window.innerHeight) {
			selectorPoint = window.innerHeight - window.innerHeight / selectorStart;
		}
		if (
			pageYOffset > selectorOffset - selectorPoint &&
			pageYOffset < selectorOffset + selectorHeight
		) {
			addCLassOnScroll(elements[i]);
		}
	}
};

const animOnScroll = (selectors, replay = false) => {
	if (!selectors.length) return;
	selectors.forEach(selector => {
		const selectorHeight = selector.offsetHeight;
		const selectorOffset = offset(selector).top;
		const selectorStart = 2;

		let selectorPoint = window.innerHeight - selectorHeight / selectorStart;
		if (selectorHeight > window.innerHeight) {
			selectorPoint = window.innerHeight - window.innerHeight / selectorStart;
		}
		if (
			pageYOffset > selectorOffset - selectorPoint &&
			pageYOffset < selectorOffset + selectorHeight
		) {
			selector.classList.add('_anim');
		} else {
			if (replay) {
				selector.classList.remove('_anim');
			}
		}
	});
};

const addCLassOnScroll = i => {
	navLinksSelector.forEach(elem => {
		elem.classList.remove('_active');
	});
	if (i) {
		i.classList.add('_active');
	}
};

const setScrollIntoView = (e, selectors, i) => {
	e.preventDefault();
	selectors[i].scrollIntoView({
		block: 'start',
		inline: 'nearest',
		behavior: 'smooth'
	});
};

const closeModalOnClickLink = () => {
	if (
		iconBtnSelector.classList.contains('_active') &&
		headerBodySelector.classList.contains('_active')
	) {
		navLinksSelector.forEach(elem => {
			elem.addEventListener('click', e => {
				iconBtnSelector.classList.remove('_active');
				headerBodySelector.classList.remove('_active');
				document.body.classList.remove('_lock');
			});
		});
	}
};

// Header
// Burger menu
const promoSelector = document.querySelector('.promo');
const episodesSelector = document.querySelector('.episodes');
const aboutSelector = document.querySelector('.about');
const subscribeSelector = document.querySelector('.subscribe');
const reviewsSelector = document.querySelector('.reviews');

const iconBtnSelector = document.querySelector('.header__btn');
const headerBodySelector = document.querySelector('.header__body');
const navLinksSelector = document.querySelectorAll('.nav__link');

iconBtnSelector.addEventListener('click', e => {
	iconBtnSelector.classList.toggle('_active');
	headerBodySelector.classList.toggle('_active');
	if (iconBtnSelector.classList.contains('_active')) {
		document.body.classList.add('_lock');
	} else {
		document.body.classList.remove('_lock');
	}
	closeModalOnClickLink();
});

// scroll element

const sectionSelectors = [
	promoSelector,
	episodesSelector,
	aboutSelector,
	subscribeSelector,
	reviewsSelector
];

window.addEventListener('scroll', e => {
	animOnScroll(sectionSelectors);
	addActiveOnScroll(sectionSelectors, navLinksSelector);
});

animOnScroll(sectionSelectors);

navLinksSelector.forEach((link, i) => {
	link.addEventListener('click', e => {
		setScrollIntoView(e, sectionSelectors, i);
	});
});

// Open Episodes
let episodesState = true;
const btnAllEpisodesSelector = document.querySelector(
	'.episodes__btn > button'
);
const episodesItemsSelector = document.querySelectorAll('.episodes__item');

btnAllEpisodesSelector.addEventListener('click', e => {
	episodesState = !episodesState;
	if (episodesState === true) {
		episodesItemsSelector.forEach(elem => {
			if (
				elem.classList.contains('e3') ||
				elem.classList.contains('e2') ||
				elem.classList.contains('e1')
			) {
				elem.classList.add('_active');
			}
		});
		btnAllEpisodesSelector.textContent = 'View all episodes';
	} else {
		episodesItemsSelector.forEach(elem => {
			if (
				elem.classList.contains('e3') ||
				elem.classList.contains('e2') ||
				elem.classList.contains('e1')
			) {
				elem.classList.remove('_active');
			}
		});
		btnAllEpisodesSelector.textContent = 'Hide all episodes';
	}
});
//
const subscribeFormSelector = document.querySelector('.subscribe__form');
const nameFormSelector = document.getElementById('name');
const emailIdFormSelector = document.getElementById('email_id');

function sendMail(e) {
	e.preventDefault();
	const params = {
		name: nameFormSelector.value,
		email_id: emailIdFormSelector.value
	};
	const serviceId = 'service_rmrn4j9';
	const templateID = 'template_pq9r7ri';
	emailjs
		.send(serviceId, templateID, params)
		.then(res => {
			nameFormSelector.value = '';
			emailIdFormSelector.value = '';
		})
		.catch(e => console.log(e));
}

subscribeFormSelector.addEventListener('submit', e => sendMail(e));
