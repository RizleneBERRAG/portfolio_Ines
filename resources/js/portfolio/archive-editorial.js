import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const waitForPreloader = (callback) => {
    const preloader = document.querySelector('[data-preloader]');

    if (!preloader) {
        callback();
        return;
    }

    const observer = new MutationObserver(() => {
        if (!document.body.contains(preloader)) {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

const initArchiveEditorial = () => {
    const section = document.querySelector('[data-archive]');
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia('(max-width: 739px)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const cards = [...section.querySelectorAll('[data-archive-item]')];
    const quotes = [...section.querySelectorAll('[data-archive-quote]')];
    const filters = [...section.querySelectorAll('[data-filter]')];

    cards.forEach((card) => {
        const tear = card.querySelector('.archive-card__tear');
        if (tear) gsap.set(tear, { xPercent: reducedMotion || smallScreen ? 108 : 0 });
    });

    if (!reducedMotion) {
        gsap.timeline({
            scrollTrigger: {
                trigger: section.querySelector('.archive-editorial__hero'),
                start: 'top 72%',
                once: true,
            },
        })
            .from('[data-archive-strip]', {
                xPercent: -45,
                rotation: -8,
                opacity: 0,
                duration: .85,
                ease: 'power4.out',
            })
            .from('[data-archive-title] > *', {
                yPercent: 105,
                rotation: 2,
                opacity: 0,
                stagger: .12,
                duration: 1.05,
                ease: 'power4.out',
            }, '-=.55')
            .from('.archive-editorial__intro > *', {
                y: 24,
                opacity: 0,
                stagger: .1,
                duration: .65,
                ease: 'power3.out',
            }, '-=.55');

        if (smallScreen) {
            ScrollTrigger.batch(cards, {
                start: 'top 94%',
                once: true,
                onEnter: (batch) => gsap.fromTo(batch,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: .48,
                        stagger: .035,
                        ease: 'power2.out',
                        clearProps: 'transform,opacity',
                    },
                ),
            });
        } else {
            ScrollTrigger.batch(cards, {
                start: 'top 88%',
                once: true,
                onEnter: (batch) => {
                    batch.forEach((card, index) => {
                        const surface = card.querySelector('.archive-card__surface');
                        const tear = card.querySelector('.archive-card__tear');
                        const delay = index * .075;

                        gsap.fromTo(card,
                            { y: 90, opacity: 0 },
                            { y: 0, opacity: 1, duration: .9, delay, ease: 'power3.out' },
                        );

                        if (surface) {
                            gsap.fromTo(surface,
                                { rotation: index % 2 === 0 ? -3 : 3, scale: .96 },
                                { rotation: 0, scale: 1, duration: 1.05, delay, ease: 'power4.out', clearProps: 'rotation,scale' },
                            );
                        }

                        if (tear) {
                            gsap.to(tear, {
                                xPercent: 108,
                                duration: 1.15,
                                delay: delay + .12,
                                ease: 'power4.inOut',
                            });
                        }
                    });
                },
            });
        }

        ScrollTrigger.batch(quotes, {
            start: 'top 92%',
            once: true,
            onEnter: (batch) => gsap.from(batch, {
                y: smallScreen ? 28 : 60,
                opacity: 0,
                rotation: smallScreen ? 0 : -1.5,
                stagger: .1,
                duration: smallScreen ? .5 : .9,
                ease: 'power3.out',
            }),
        });
    }

    filters.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filters.forEach((item) => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            cards.forEach((card) => {
                const visible = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('is-hidden', !visible);
            });

            quotes.forEach((quote) => quote.classList.toggle('is-hidden', filter !== 'all'));

            if (reducedMotion || smallScreen) {
                ScrollTrigger.refresh();
                return;
            }

            requestAnimationFrame(() => {
                const visibleCards = cards.filter((card) => !card.classList.contains('is-hidden'));

                gsap.fromTo(visibleCards,
                    { y: 24, opacity: 0, scale: .985 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: .5,
                        stagger: { each: .025, from: 'start' },
                        ease: 'power3.out',
                        clearProps: 'transform,opacity',
                        onComplete: () => ScrollTrigger.refresh(),
                    },
                );
            });
        });
    });

    if (finePointer && !reducedMotion) {
        cards.forEach((card) => {
            const image = card.querySelector('.archive-card__frame img');
            if (!image) return;

            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - .5;
                const y = (event.clientY - rect.top) / rect.height - .5;

                gsap.to(image, {
                    xPercent: x * 2.8,
                    yPercent: y * 2.2,
                    duration: .6,
                    ease: 'power3.out',
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    xPercent: 0,
                    yPercent: 0,
                    duration: .75,
                    ease: 'power3.out',
                });
            });
        });
    }

    ScrollTrigger.refresh();
};

waitForPreloader(initArchiveEditorial);
