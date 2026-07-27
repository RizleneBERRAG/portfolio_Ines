const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;

if (isSmallScreen) {
    document.querySelectorAll('[data-hero-float] [data-preload-image]').forEach((image) => {
        image.removeAttribute('data-preload-image');
        image.setAttribute('loading', 'lazy');
        image.setAttribute('fetchpriority', 'low');
    });
}