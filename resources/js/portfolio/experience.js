import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const root = document.querySelector('[data-portfolio]');

if (root) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lockPage = (locked) => document.body.classList.toggle('is-locked', locked);

    const initPreloader = () => {
        const preloader = document.querySelector('[data-preloader]');
        const progress = document.querySelector('[data-load-progress]');
        const line = document.querySelector('[data-load-line]');
        const images = [...document.querySelectorAll('[data-preload-image]')];

        if (!preloader) return Promise.resolve();
        lockPage(true);

        return new Promise((resolve) => {
            let loaded = 0;
            const total = Math.max(images.length, 1);

            const update = () => {
                const percentage = Math.round((loaded / total) * 100);
                progress.textContent = String(percentage).padStart(2, '0');
                gsap.to(line, { width: `${percentage}%`, duration: .35, ease: 'power2.out' });

                if (loaded >= total) {
                    gsap.timeline({
                        delay: .25,
                        onComplete: () => {
                            preloader.remove();
                            lockPage(false);
                            resolve();
                        },
                    })
                        .to('.preloader__name', { opacity: 0, y: -12, duration: .35 })
                        .to('.preloader__progress', { yPercent: -120, duration: .8, ease: 'power4.inOut' }, '<')
                        .to(preloader, { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'power4.inOut' }, '-=.25');
                }
            };

            images.forEach((image) => {
                const done = () => {
                    loaded += 1;
                    update();
                };

                if (image.complete) done();
                else {
                    image.addEventListener('load', done, { once: true });
                    image.addEventListener('error', done, { once: true });
                }
            });

            if (!images.length) {
                loaded = 1;
                update();
            }
        });
    };

    const initHero = () => {
        if (!reducedMotion) {
            gsap.timeline()
                .from('[data-hero-media] img', { scale: 1.28, duration: 1.6, ease: 'power4.out' })
                .from('[data-hero-line]', { yPercent: 115, rotate: 2, opacity: 0, stagger: .12, duration: 1.1, ease: 'power4.out' }, '-=1.05')
                .from('[data-hero-kicker], [data-hero-statement], [data-enter]', { y: 20, opacity: 0, stagger: .08, duration: .65 }, '-=.6');

            gsap.to('[data-hero-media] img', {
                yPercent: 13,
                ease: 'none',
                scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
            });
        }

        const hero = document.querySelector('[data-hero]');
        const floats = [...document.querySelectorAll('[data-hero-float]')];

        hero?.addEventListener('mousemove', (event) => {
            if (reducedMotion) return;
            const x = event.clientX / window.innerWidth - .5;
            const y = event.clientY / window.innerHeight - .5;

            floats.forEach((item, index) => {
                gsap.to(item, {
                    x: x * (42 + index * 22),
                    y: y * (32 + index * 18),
                    opacity: .86,
                    duration: .7,
                    ease: 'power3.out',
                });
            });
        });

        hero?.addEventListener('mouseleave', () => gsap.to(floats, { opacity: 0, duration: .45 }));
        document.querySelector('[data-enter]')?.addEventListener('click', () => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' }));
    };

    const initTextReveal = () => {
        if (reducedMotion) return;
        gsap.from('[data-reveal-text]', {
            y: 70,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: '[data-reveal-text]', start: 'top 82%' },
        });
    };

    const initFaceDeck = () => {
        const deck = document.querySelector('[data-face-deck]');
        const cards = [...document.querySelectorAll('[data-face-card]')];
        const current = document.querySelector('[data-face-current]');
        if (!deck || cards.length < 2) return;

        let index = 0;
        let animating = false;

        deck.addEventListener('click', () => {
            if (animating) return;
            animating = true;

            const outgoing = cards[index];
            index = (index + 1) % cards.length;
            const incoming = cards[index];

            incoming.style.visibility = 'visible';
            incoming.classList.add('is-active');

            gsap.timeline({
                onComplete: () => {
                    outgoing.classList.remove('is-active');
                    outgoing.style.visibility = 'hidden';
                    gsap.set(outgoing, { clearProps: 'clipPath,transform' });
                    animating = false;
                },
            })
                .set(incoming, { clipPath: 'inset(0 100% 0 0)', scale: 1.06 })
                .to(incoming, { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1, ease: 'power4.inOut' })
                .to(outgoing, { xPercent: 8, duration: 1, ease: 'power3.inOut' }, 0);

            current.textContent = String(index + 1).padStart(2, '0');
        });
    };

    const initHorizontalGallery = () => {
        const wrap = document.querySelector('[data-horizontal-wrap]');
        const track = document.querySelector('[data-horizontal-track]');
        if (!wrap || !track || reducedMotion || window.innerWidth < 740) return;

        const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
        const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: () => `+=${getDistance()}`,
                scrub: .7,
                pin: true,
                invalidateOnRefresh: true,
            },
        });

        gsap.utils.toArray('[data-parallax-image] img').forEach((image) => {
            gsap.fromTo(image, { xPercent: -5 }, {
                xPercent: 5,
                ease: 'none',
                scrollTrigger: {
                    trigger: image,
                    containerAnimation: tween,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                },
            });
        });
    };

    const initPower = () => {
        if (reducedMotion) return;
        gsap.from('[data-power-title]', {
            xPercent: -22,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: '[data-power-title]', start: 'top 78%' },
        });

        gsap.utils.toArray('[data-power-shot]').forEach((shot, index) => {
            gsap.from(shot, {
                y: 110,
                opacity: 0,
                rotate: index % 2 ? 1.5 : -1.5,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: shot, start: 'top 88%' },
            });
        });
    };

    const initArchive = () => {
        const buttons = [...document.querySelectorAll('[data-filter]')];
        const items = [...document.querySelectorAll('[data-archive-item]')];

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                buttons.forEach((item) => item.classList.toggle('is-active', item === button));
                items.forEach((item) => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter));
                ScrollTrigger.refresh();
            });
        });
    };

    const initCasting = () => {
        const drawer = document.querySelector('[data-casting-drawer]');
        const openers = [...document.querySelectorAll('[data-casting-open]')];
        const closers = [...document.querySelectorAll('[data-casting-close]')];
        if (!drawer) return;

        const setOpen = (open) => {
            drawer.classList.toggle('is-open', open);
            drawer.setAttribute('aria-hidden', String(!open));
            lockPage(open);
        };

        openers.forEach((button) => button.addEventListener('click', () => setOpen(true)));
        closers.forEach((button) => button.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false);
        });
    };

    const initLightbox = () => {
        const lightbox = document.querySelector('[data-lightbox]');
        const image = document.querySelector('[data-lightbox-image]');
        const caption = document.querySelector('[data-lightbox-caption]');
        const triggers = [...document.querySelectorAll('[data-lightbox-trigger]')];
        const closers = [...document.querySelectorAll('[data-lightbox-close]')];
        if (!lightbox || !image) return;

        const setOpen = (open, trigger = null) => {
            if (open && trigger) {
                image.src = trigger.dataset.imageSrc;
                image.alt = trigger.dataset.imageAlt || 'Ines Aouadhi portfolio image';
                if (caption) caption.textContent = trigger.dataset.imageAlt || '';
            }
            lightbox.classList.toggle('is-open', open);
            lightbox.setAttribute('aria-hidden', String(!open));
            lockPage(open);
        };

        triggers.forEach((trigger) => trigger.addEventListener('click', () => setOpen(true, trigger)));
        closers.forEach((button) => button.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) setOpen(false);
        });
    };

    const initCursor = () => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const cursor = document.querySelector('[data-cursor]');
        const label = document.querySelector('[data-cursor-label]');
        if (!cursor) return;

        window.addEventListener('mousemove', (event) => {
            cursor.classList.add('is-visible');
            gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: .18, ease: 'power2.out' });
        });

        document.querySelectorAll('button, a, [data-face-deck]').forEach((element) => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('is-active');
                if (label) label.textContent = element.hasAttribute('data-face-deck') ? 'Next' : 'View';
            });
            element.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
        });
    };

    const initHeader = () => {
        const header = document.querySelector('[data-header]');
        if (!header) return;
        let lastY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentY = window.scrollY;
            header.classList.toggle('is-hidden', currentY > lastY && currentY > 120);
            lastY = currentY;
        }, { passive: true });
    };

    initPreloader().then(() => {
        initHero();
        initTextReveal();
        initFaceDeck();
        initHorizontalGallery();
        initPower();
        initArchive();
        initCasting();
        initLightbox();
        initCursor();
        initHeader();
        ScrollTrigger.refresh();
    });
}
