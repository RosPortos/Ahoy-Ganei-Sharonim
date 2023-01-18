function menu() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.nav');

    burger.addEventListener('click', function () {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('scroll-hide');
    });

}

menu();