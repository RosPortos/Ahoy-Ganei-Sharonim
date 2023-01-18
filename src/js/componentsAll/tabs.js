function tabs(tabTrigger, tabTriggerWrap, tabContent) {
    const tabBox = document.querySelectorAll(tabContent);
    const tabTop = document.querySelector(tabTriggerWrap);
    const tabBtn = document.querySelectorAll(tabTrigger);

    if (tabTop) {
        tabTop.addEventListener('click', (event) => {

            let tabClass = event.target.getAttribute("data-tab");

            tabBtn.forEach(item => {
                item.classList.remove('active');
            });

            event.target.classList.add('active');

            tabBox.forEach(elem => {
                elem.classList.remove('hide');
                if (!elem.classList.contains(tabClass) && tabClass !== 'all') {
                    elem.classList.add('hide');
                }
            });

        });
    }
}

tabs('.btn', '.wrapBtn', '.content');