@extends('layouts.portfolio')

@section('content')
<div class="site-shell" data-portfolio>
    <div class="noise" aria-hidden="true"></div>

    <div class="preloader" data-preloader aria-live="polite">
        <div class="preloader__name">INES AOUADHI</div>
        <div class="preloader__progress"><span data-load-progress>00</span></div>
        <div class="preloader__line"><span data-load-line></span></div>
    </div>

    <header class="site-header" data-header>
        <a class="wordmark" href="#top" aria-label="Back to top"><span>IA</span></a>
        <div class="site-header__center"><span>MODEL</span><span>LYON · PARIS</span></div>
        <button class="text-button" type="button" data-casting-open>Casting view</button>
    </header>

    <main>
        <section class="hero" id="top" data-hero>
            @if($hero)
                <div class="hero__media" data-hero-media>
                    <img src="{{ asset($hero['path']) }}" alt="{{ $hero['alt'] }}" fetchpriority="high" data-preload-image>
                </div>
            @endif
            <div class="hero__shade" aria-hidden="true"></div>
            <div class="hero__floating" aria-hidden="true">
                @foreach($facePhotos->take(3) as $photo)
                    <figure class="hero-float hero-float--{{ $loop->iteration }}" data-hero-float>
                        <img src="{{ asset($photo['path']) }}" alt="" data-preload-image>
                    </figure>
                @endforeach
            </div>
            <div class="hero__copy">
                <p class="eyebrow" data-hero-kicker>Soft power · Vol. 01</p>
                <h1 class="hero__title" aria-label="Ines Aouadhi">
                    <span data-hero-line>INES</span><span data-hero-line>AOUADHI</span>
                </h1>
                <p class="hero__statement" data-hero-statement>{{ $portfolio['identity']['statement'] }}</p>
            </div>
            <button class="hero__enter" type="button" data-enter><span>Enter the story</span><span class="hero__enter-index">01</span></button>
            <div class="hero__scroll">Click · scroll · explore</div>
        </section>

        <section class="manifesto section-pad" id="story">
            <div class="section-index">01</div>
            <p class="manifesto__lead" data-reveal-text>Not one image. Not one mood. A face that moves between softness, control and presence.</p>
            <div class="manifesto__meta"><span>Editorial</span><span>Beauty</span><span>Commercial</span><span>Movement</span></div>
        </section>

        <section class="face-section" id="face" data-face-section>
            <div class="face-stage">
                <div class="face-stage__copy">
                    <div class="section-index section-index--light">02</div>
                    <p class="eyebrow">The face</p>
                    <h2>Presence<br>before words.</h2>
                    <p class="face-stage__instruction">Click the frame to continue</p>
                    <div class="face-stage__counter"><span data-face-current>01</span><span>/</span><span>{{ str_pad((string) max($facePhotos->count(), 1), 2, '0', STR_PAD_LEFT) }}</span></div>
                </div>
                <button class="face-deck" type="button" data-face-deck aria-label="Show next portrait">
                    @foreach($facePhotos as $photo)
                        <figure class="face-card {{ $loop->first ? 'is-active' : '' }}" data-face-card>
                            <img src="{{ asset($photo['path']) }}" alt="{{ $photo['alt'] }}" loading="lazy">
                            <figcaption>{{ str_pad((string) $loop->iteration, 2, '0', STR_PAD_LEFT) }} — Portrait study</figcaption>
                        </figure>
                    @endforeach
                </button>
            </div>
        </section>

        <section class="soft-section" id="soft" data-soft-section>
            <div class="soft-intro section-pad">
                <div class="section-index">03</div>
                <div><p class="eyebrow">Chapter one</p><h2 class="chapter-title">SOFT</h2></div>
                <p class="chapter-copy">Warm light, sculpted silhouettes and a calm confidence. Elegance without fragility.</p>
            </div>
            <div class="soft-track-wrap" data-horizontal-wrap>
                <div class="soft-track" data-horizontal-track>
                    @foreach($softPhotos as $photo)
                        <article class="soft-panel">
                            <figure class="soft-panel__image" data-parallax-image><img src="{{ asset($photo['path']) }}" alt="{{ $photo['alt'] }}" loading="lazy"></figure>
                            <div class="soft-panel__caption"><span>Look {{ str_pad((string) $loop->iteration, 2, '0', STR_PAD_LEFT) }}</span><span>Night editorial</span></div>
                        </article>
                    @endforeach
                    <article class="soft-panel soft-panel--quote"><p>“Softness is not the opposite of strength.”</p><span>Ines Aouadhi</span></article>
                </div>
            </div>
        </section>

        <section class="power-section" id="power" data-power-section>
            <div class="power-heading section-pad">
                <div class="section-index section-index--light">04</div>
                <p class="eyebrow">Chapter two</p>
                <h2 class="chapter-title chapter-title--light" data-power-title>POWER</h2>
                <div class="power-words" aria-hidden="true"><span>CONTROL</span><span>FOCUS</span><span>IMPACT</span></div>
            </div>
            <div class="power-gallery">
                @foreach($powerPhotos as $photo)
                    <article class="power-shot power-shot--{{ $loop->iteration }}" data-power-shot>
                        <figure><img src="{{ asset($photo['path']) }}" alt="{{ $photo['alt'] }}" loading="lazy"></figure>
                        <div class="power-shot__label"><span>{{ str_pad((string) $loop->iteration, 2, '0', STR_PAD_LEFT) }}</span><span>{{ $loop->odd ? 'Focus' : 'Control' }}</span></div>
                    </article>
                @endforeach
            </div>
        </section>

        <section class="between-section" id="between">
            <div class="between-heading section-pad">
                <div class="section-index">05</div>
                <div><p class="eyebrow">Beyond the frame</p><h2 class="between-title">Off duty.<br>Still cinematic.</h2></div>
            </div>
            <div class="between-grid">
                @foreach($lifestylePhotos as $photo)
                    <button class="between-card between-card--{{ $loop->iteration }}" type="button" data-lightbox-trigger data-image-src="{{ asset($photo['path']) }}" data-image-alt="{{ $photo['alt'] }}">
                        <img src="{{ asset($photo['path']) }}" alt="{{ $photo['alt'] }}" loading="lazy"><span>Open frame</span>
                    </button>
                @endforeach
            </div>
        </section>

        <section class="archive-section" id="archive" data-archive>
            <div class="archive-heading section-pad">
                <div class="section-index section-index--light">06</div>
                <div><p class="eyebrow">Contact sheet</p><h2>Archive / {{ str_pad((string) $photos->count(), 2, '0', STR_PAD_LEFT) }}</h2></div>
                <p>Every frame, rearranged as a living contact sheet. Select a category or open any image.</p>
            </div>
            <div class="archive-filters" role="group" aria-label="Filter portfolio images">
                <button class="is-active" type="button" data-filter="all">All</button><button type="button" data-filter="soft">Soft</button><button type="button" data-filter="power">Power</button><button type="button" data-filter="lifestyle">Lifestyle</button><button type="button" data-filter="archive">Archive</button>
            </div>
            <div class="archive-grid" data-archive-grid>
                @foreach($photos as $photo)
                    <button class="archive-item" type="button" data-archive-item data-category="{{ $photo['chapter'] }}" data-lightbox-trigger data-image-src="{{ asset($photo['path']) }}" data-image-alt="{{ $photo['alt'] }}">
                        <span class="archive-item__index">{{ str_pad((string) $loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
                        <img src="{{ asset($photo['path']) }}" alt="{{ $photo['alt'] }}" loading="lazy"><span class="archive-item__chapter">{{ $photo['chapter'] }}</span>
                    </button>
                @endforeach
            </div>
        </section>

        <section class="closing-section">
            <p class="eyebrow">End of volume one</p><h2>INES<br>AOUADHI</h2>
            <button class="closing-section__button" type="button" data-casting-open>View casting profile</button>
            <div class="closing-section__meta"><span>Model portfolio</span><span>{{ now()->year }}</span><a href="#top">Back to top ↑</a></div>
        </section>
    </main>

    <aside class="casting-drawer" data-casting-drawer aria-hidden="true">
        <button class="casting-drawer__backdrop" type="button" data-casting-close aria-label="Close casting profile"></button>
        <div class="casting-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="casting-title">
            <div class="casting-drawer__header"><span>Professional profile</span><button type="button" data-casting-close>Close ×</button></div>
            <div class="casting-drawer__identity"><p>Model</p><h2 id="casting-title">{{ $portfolio['identity']['first_name'] }}<br>{{ $portfolio['identity']['last_name'] }}</h2><span>{{ $portfolio['identity']['location'] }}</span></div>
            <dl class="casting-list">
                @foreach($portfolio['casting'] as $label => $value)
                    @if($value)<div><dt>{{ ucfirst($label) }}</dt><dd>{{ $value }}</dd></div>@endif
                @endforeach
            </dl>
            <div class="casting-drawer__note"><p>Measurements and direct booking details can be added from <code>config/portfolio.php</code>.</p></div>
            <div class="casting-drawer__actions">
                @if($portfolio['contact']['email'])<a href="mailto:{{ $portfolio['contact']['email'] }}">Booking enquiry</a>@else<span>Booking email to be added</span>@endif
                @if($portfolio['contact']['instagram_url'])<a href="{{ $portfolio['contact']['instagram_url'] }}" target="_blank" rel="noreferrer">Instagram</a>@endif
            </div>
        </div>
    </aside>

    <div class="lightbox" data-lightbox aria-hidden="true">
        <button class="lightbox__backdrop" type="button" data-lightbox-close aria-label="Close image"></button>
        <figure class="lightbox__figure"><img src="" alt="" data-lightbox-image><figcaption data-lightbox-caption></figcaption></figure>
        <button class="lightbox__close" type="button" data-lightbox-close>Close ×</button>
    </div>
    <div class="cursor" data-cursor aria-hidden="true"><span data-cursor-label>View</span></div>
</div>
@endsection
