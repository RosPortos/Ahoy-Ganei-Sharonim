document.addEventListener('DOMContentLoaded', function () {

    function accordion(item, descr) {
        let trigger = document.querySelectorAll(item);

        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                const self = e.currentTarget;
                const content = self.parentElement.querySelector(descr);

                self.classList.toggle('open');

                if (self.classList.contains('open')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }

    accordion('.trigger', '.content');


});
