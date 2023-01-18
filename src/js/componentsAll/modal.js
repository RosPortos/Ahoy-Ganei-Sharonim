const header = document.querySelector('.header'),
    modaWrap = document.querySelectorAll('.modal-wrap'),
    scrollHide = calcScroll();


function bindModal(triggerSelector, modalSelector) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            hideScroll();
            modal.classList.add('active');
        });
    });
}

function calcScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
}

function hideScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${scrollHide}px`;
}

function showScroll() {
    document.body.style.overflow = "";
    document.body.style.marginRight = '';
}

function showModal(modalItem) {
    const modal = document.querySelector(modalItem);
    closeModal();
    modal.classList.add('active');
}

function closeModal() {
    const modalAll = document.querySelectorAll('.modal-wrap');
    modalAll.forEach(item => {
        item.classList.remove('active');
        showScroll();
    });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function closeAllModal() {
    const modalAll = document.querySelectorAll('.modal-wrap');
    const modalClose = document.querySelectorAll('.modal__close, .close-modal');

    modalClose.forEach(item => {
        item.addEventListener('click', function () {
            closeModal();
        });
    });

    modalAll.forEach(item => {
        item.addEventListener('click', function (e) {
            if (e.target === item) {
                item.classList.remove('active');
                showScroll();
            }
        });
    });
}

closeAllModal();


/////////////////////////////////////////////////////////////////////////


bindModal('.trigger', '.modal');

//showModal('.modal');





