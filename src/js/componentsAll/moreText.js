function moreText(item, text) {
    let btn = document.querySelectorAll(item);

    if (btn) {
        btn.forEach(el => {
            el.addEventListener('click', (e) => {
                const self = e.currentTarget;
                const content = self.parentElement.querySelector(text);

                self.classList.toggle('open');

                if (self.classList.contains('open')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }
}

moreText('.btn', '.text');