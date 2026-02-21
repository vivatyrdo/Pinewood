document.addEventListener('DOMContentLoaded', function() {
    
    if (document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            speed: 800,
            spaceBetween: 20,
            navigation: {
                nextEl: '.custom-next',
            },
            grabCursor: true,
        });
    }

    if (document.querySelector('.projects-swiper')) {
        const projectsSwiper = new Swiper('.projects-swiper', {
            loop: true,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: '.projects-next',
                prevEl: '.projects-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 }
            }
        });
    }

    if (document.querySelector('.services-swiper')) {
        const servicesSwiper = new Swiper('.services-swiper', {
            loop: true,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: '.services-next',
                prevEl: '.services-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 15 },
                576: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 20 },
                1200: { slidesPerView: 4, spaceBetween: 20 }
            }
        });
    }

    const quizSteps = document.querySelectorAll('.quiz__step');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const stepCounter = document.getElementById('current-step');
    const quizActions = document.querySelector('.quiz__actions');
    const btnSubmit = document.getElementById('quiz-submit');
    const btnReset = document.getElementById('quiz-reset');


    if (quizSteps.length > 0) {
        const stepsOrder = ['1', '2', '3', '4', '5', 'contact', 'success'];
        let currentIndex = 0;

        function updateQuizUI() {
            const currentStepName = stepsOrder[currentIndex];

            quizSteps.forEach(step => step.classList.remove('active'));
            
            const activeStep = document.querySelector(`.quiz__step[data-step="${currentStepName}"]`);
            if (activeStep) activeStep.classList.add('active');
            
            if (stepCounter) {
                if (currentIndex < 5) {
                    stepCounter.parentElement.style.display = 'block';
                    stepCounter.textContent = currentIndex + 1;
                } else {
                    stepCounter.parentElement.style.display = 'none';
                }
            }
            
            if (currentStepName === 'contact' || currentStepName === 'success') {
                if(quizActions) quizActions.style.display = 'none';
            } else {
                if(quizActions) quizActions.style.display = 'flex';
                if (currentIndex === 0) {
                    btnPrev.disabled = true;
                } else {
                    btnPrev.disabled = false;
                }
                btnNext.innerHTML = 'Далее <img src="" alt="Вперед">';
            }
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (currentIndex < stepsOrder.length - 1) {
                    currentIndex++;
                    updateQuizUI();
                }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateQuizUI();
                }
            });
        }

        if (btnSubmit) {
            btnSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                const successIndex = stepsOrder.indexOf('success');
                if (successIndex !== -1) {
                    currentIndex = successIndex;
                    updateQuizUI();
                }
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                currentIndex = 0;
                document.querySelectorAll('.quiz__input').forEach(input => input.value = '');
                document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => input.checked = false);
                updateQuizUI();
            });
        }
        
        updateQuizUI();
    }

    const loadMoreBtn = document.getElementById('load-more-btn');
    const projectsGrid = document.getElementById('projects-grid');

    if (loadMoreBtn && projectsGrid) {
        loadMoreBtn.addEventListener('click', function() {
            const newCardsHTML = `
                <article class="project-card fade-in">
                    <div class="project-card__img"><img src="images/project-img1.png" alt="Новый проект 1"></div>
                    <div class="project-card__content">
                        <div class="project-card__info"><p>КП Новые Просторы 150</p></div>
                        <a href="#" class="project-card__btn">Смотреть проект<img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
                <article class="project-card fade-in">
                    <div class="project-card__img"><img src="images/project-img2.png" alt="Новый проект 2"></div>
                    <div class="project-card__content">
                        <div class="project-card__info"><p>Дом в лесу 320</p></div>
                        <a href="#" class="project-card__btn">Смотреть проект <img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
                <article class="project-card fade-in">
                    <div class="project-card__img"><img src="images/project-img3.png" alt="Новый проект 3"></div>
                    <div class="project-card__content">
                        <div class="project-card__info"><p>КП Солнечный берег</p></div>
                        <a href="#" class="project-card__btn">Смотреть проект <img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
                <article class="project-card fade-in">
                    <div class="project-card__img"><img src="images/project-img4.png" alt="Новый проект 4"></div>
                    <div class="project-card__content">
                        <div class="project-card__info"><p>Баня из сруба</p></div>
                        <a href="#" class="project-card__btn">Смотреть проект <img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
            `;
            projectsGrid.insertAdjacentHTML('beforeend', newCardsHTML);
        });
    }

    const loadMoreServicesBtn = document.getElementById('load-more-services-btn');
    const servicesGrid = document.getElementById('services-grid');

    if (loadMoreServicesBtn && servicesGrid) {
        loadMoreServicesBtn.addEventListener('click', function() {
            const newServicesHTML = `
                <article class="service-card fade-in">
                    <div class="service-card__img"><img src="images/swiper3.png" alt="Доп. услуга 1"></div>
                    <div class="service-card__content">
                        <h3 class="service-card__title">Дизайн интерьера</h3>
                        <p class="service-card__desc">Разработка полного дизайн-проекта с визуализацией</p>
                        <a href="#" class="service-card__btn">Оставить заявку<img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
                <article class="service-card fade-in">
                    <div class="service-card__img"><img src="images/swiper3.png" alt="Доп. услуга 2"></div>
                    <div class="service-card__content">
                        <h3 class="service-card__title">Ландшафтный дизайн</h3>
                        <p class="service-card__desc">Благоустройство территории вокруг дома</p>
                        <a href="#" class="service-card__btn">Оставить заявку <img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
                <article class="service-card fade-in">
                    <div class="service-card__img"><img src="images/swiper3.png" alt="Доп. услуга 3"></div>
                    <div class="service-card__content">
                        <h3 class="service-card__title">Установка заборов</h3>
                        <p class="service-card__desc">Монтаж ограждений любого типа под ключ</p>
                        <a href="#" class="service-card__btn">Оставить заявку <img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
                <article class="service-card fade-in">
                    <div class="service-card__img"><img src="images/swiper3.png" alt="Доп. услуга 4"></div>
                    <div class="service-card__content">
                        <h3 class="service-card__title">Сервисное обслуживание</h3>
                        <p class="service-card__desc">Сезонный уход за деревянным домом</p>
                        <a href="#" class="service-card__btn">Оставить заявку <img src="images/Icon ionic-md-arrow-forward.svg" alt="Стрелка"></a>
                    </div>
                </article>
            `;
            servicesGrid.insertAdjacentHTML('beforeend', newServicesHTML);
        });
    }
});