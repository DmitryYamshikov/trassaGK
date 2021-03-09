

window.addEventListener("DOMContentLoaded", () => {
    // добавление классов для меню и под меню
    function addHasSubClass(selector) {
        const li = document.querySelectorAll(selector);
        li.forEach(function (item) {
            if (item.lastChild) {
                if (item.lastChild.tagName == 'UL') {
                    item.classList.add('menu__has-sub');
                    item.lastChild.classList.add('menu__sub-menu');
                }
            }
        });
    }

    addHasSubClass('.menu li');
    addHasSubClass('.side-menu li');


    // добавление кнопки для переключения под меню
    function addTogglerMenu(selector) {
        const liWithSub = document.querySelectorAll(selector);
        liWithSub.forEach(item => {
            const toggler = document.createElement('div');
            toggler.classList.add('toggler-menu');
            item.firstChild.appendChild(toggler);
        });
        return liWithSub;
    }
    /* addTogglerMenu('.menu__has-sub'); */



    addTogglerMenu('.sidebar .menu__has-sub').forEach(item => {
        item.addEventListener('click', function (e) {
            if (e.target.closest('.toggler-menu')) {
                e.preventDefault();
                e.stopPropagation();
                e.target.classList.toggle('active');
                this.classList.toggle('active');
            }

        });
    });



    document.addEventListener('click', (e) => {

        if (!e.target.closest('.phone-togler') && !e.target.closest('.header__contacts-mobile-more')) {
            phoneMore.classList.remove('active');
        }
        if (!e.target.closest('.form_modal') && !e.target.closest('[data-modal]')) {
            document.querySelector('.modal').classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0px';
        }
    });


    //всплывающая подложка с телефонами
    const phoneTogler = document.querySelector('.phone-togler');
    const phoneMore = document.querySelector('.header__contacts-mobile-more');
    phoneTogler.addEventListener('click', () => {
        phoneMore.classList.toggle('active');
    });
    //слайдер фотоальбомов на главной
    $('.photoalbum__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        /* autoplay: true,
        autoplaySpeed: 2000, */
        infinite: true,
        prevArrow: '<button class="slider-arrow slider-arrow_prev"></button>',
        nextArrow: '<button class="slider-arrow slider-arrow_next"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            /* {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            } */
        ]
    });
    //акции на главной
    if (document.documentElement.clientWidth < 769) {
        $('.index-page .events_sale .events__wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: '<button class="slider-arrow slider-arrow_prev"></button>',
            nextArrow: '<button class="slider-arrow slider-arrow_next"></button>',
        });
    }
    //открытие модалки
    const btnCallModal = document.querySelector('[data-modal]');
    btnCallModal.addEventListener('click', function () {
        const modal = document.querySelector('.modal');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
        modal.classList.add('active');
    });

    //tabs на странице заказа карт

    const btnsTabAnkete = document.querySelectorAll('.ankete__tab-togler .btn');
    if (btnsTabAnkete) {
        const anketeTabs = document.querySelectorAll('.ankete__tabs .form');
        btnsTabAnkete.forEach((item,i) => {
            item.addEventListener('click', ()=>{
                btnsTabAnkete.forEach(item2=>{
                    item2.classList.remove('active');
                });
                item.classList.add('active');
                anketeTabs.forEach(itemTabs=>itemTabs.classList.remove('active'));
                anketeTabs[i].classList.add('active');
            });
        });
    }
});

$(document).ready(function () {

});
