"use strict";

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
    function addTogglerMenu (selector) {
        const liWithSub = document.querySelectorAll(selector);
        liWithSub.forEach(item => {
            const toggler = document.createElement('div');
            toggler.classList.add('toggler-menu');
            item.firstChild.appendChild(toggler);
        });
        return liWithSub;
    }
    /* addTogglerMenu('.menu__has-sub'); */


    
    addTogglerMenu('.sidebar .menu__has-sub').forEach(item=>{
        item.addEventListener('click', function(e) {
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
    });


    //всплывающая подложка с телефонами
    const phoneTogler = document.querySelector('.phone-togler');
    const phoneMore = document.querySelector('.header__contacts-mobile-more');
    phoneTogler.addEventListener('click', () => {
        phoneMore.classList.toggle('active');
    });

    // раскрывающееся sidebar-menu
    
    
});
