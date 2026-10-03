import './style.css'

type JourneyStop = {
  title: string
  clue: string
  image: string
}

const stops: JourneyStop[] = [
  {
    title: 'Bajo la ciudad',
    clue: 'Bajo adoquines y tranvías, una ciudad secreta guarda historias sin ventanas.',
    image: '/assets/stops/bunker.svg',
  },
  {
    title: 'Una pausa con sabor',
    clue: 'Una mesa será el mapa y algo rico, espero estar a la altura de Roma (Imposible).',
    image: '/assets/stops/lunch.svg',
  },
  {
    title: 'Colores que hablan',
    clue: 'Aquí el tiempo cabe en un marco y los colores cuentan historias sin usar la voz.',
    image: '/assets/stops/museum.svg',
  },
  {
    title: 'El tesoro dorado',
    clue: 'Media luna dorada, corazón latino: este tesoro se come con las manos.',
    image: '/assets/stops/empanadas.svg',
  },
]

const stopMarkup = stops
  .map(
    (stop, index) => `
      <article
        class="stop-card"
        data-stop="${index}"
        aria-label="Parada ${index + 1}"
      >
        <div class="stop-art">
          <img src="${stop.image}" alt="Ilustración de la pista ${index + 1}" />
        </div>
        <p class="stop-kicker">Pista 0${index + 1}</p>
        <h3>${stop.title}</h3>
        <p class="stop-clue">“${stop.clue}”</p>
      </article>
    `,
  )
  .join('')

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('No se encontró el contenedor principal')
}

app.innerHTML = `
  <header class="topbar">
    <a class="monogram" href="#inicio" aria-label="Volver al inicio">
      <span>H</span><i aria-hidden="true"></i><span>I</span>
    </a>
    <p class="topbar-date">
      <span>Brno</span>
      <span aria-hidden="true">/</span>
      <time datetime="2026-10-04">04 oct 2026</time>
    </p>
    <a class="topbar-link" href="#mapa">Ver la ruta</a>
  </header>

  <main>
    <section class="intro" id="inicio">
      <div class="intro-copy" data-reveal>
        <p class="postal-line">Para Lara</p>
        <h1>¿Descubrimos <em>Brno</em>?</h1>
        <p class="intro-lede">
          Este domingo la ciudad guarda cuatro pistas. Yo pongo el mapa;
          tú solo trae curiosidad y ganas de caminar.
        </p>
        <button class="primary-action" id="open-map" type="button">
          <span>Empezar el recorrido</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div class="intro-art" aria-hidden="true">
        <svg class="city-sketch parallax-layer" data-depth="0.35" viewBox="0 0 760 620" fill="none">
          <path d="M85 500C150 458 190 472 244 420C301 365 350 390 394 338C438 287 514 334 551 266C581 210 637 210 691 174" />
          <path d="M90 534C161 498 221 526 277 474C333 421 403 459 450 400C495 344 559 381 610 322C641 286 673 286 716 264" />
          <path d="M101 455C162 421 193 435 233 389C275 341 328 359 368 313C412 263 471 296 510 244C546 195 597 194 654 145" />
          <path d="M469 207V129H542V207M484 129V91H527V129M498 91V54H513V91" />
          <path d="M426 207H575M449 207V260M560 207V273M405 273H593" />
          <path d="M182 403L215 355L249 403M199 379H232M215 355V325" />
          <circle cx="124" cy="169" r="61" />
          <path d="M124 88V250M43 169H205M88 133L160 205M160 133L88 205" />
        </svg>
        <span class="map-word map-word-one parallax-layer" data-depth="0.65">BRNO</span>
        <span class="map-word map-word-two parallax-layer" data-depth="0.9">04 · 10</span>
        <span class="map-cross map-cross-one parallax-layer" data-depth="1.1">×</span>
        <span class="map-cross map-cross-two parallax-layer" data-depth="0.75">×</span>
        <span class="red-thread"></span>
      </div>
    </section>

    <section class="journey" id="mapa">
      <div class="section-heading" data-reveal>
        <div>
          <p class="section-kicker">Domingo · 4 de octubre</p>
          <h2>Cuatro paradas.<br />Un día en Brno.</h2>
        </div>
        <div class="route-status" aria-live="polite">
          <span>Ruta recorrida</span>
          <strong id="progress-label">0%</strong>
          <div class="progress-track" aria-hidden="true">
            <span id="progress-bar"></span>
          </div>
        </div>
      </div>

      <div class="map-wrap">
        <div
          class="map-viewport"
          role="region"
          aria-label="Mapa del recorrido con cuatro paradas"
        >
          <div class="map-canvas" id="map-canvas">
            <span class="contour contour-one parallax-layer" data-depth="0.15" aria-hidden="true"></span>
            <span class="contour contour-two parallax-layer" data-depth="0.22" aria-hidden="true"></span>
            <span class="map-symbol symbol-one parallax-layer" data-depth="0.5" aria-hidden="true">✦</span>
            <span class="map-symbol symbol-two parallax-layer" data-depth="0.7" aria-hidden="true">×</span>
            <span class="map-symbol symbol-three parallax-layer" data-depth="0.4" aria-hidden="true">✦</span>

            <svg class="route" viewBox="0 0 900 2200" preserveAspectRatio="none" aria-hidden="true">
              <path
                class="route-shadow"
                d="M450 0 C580 130 350 250 450 380 C560 520 570 720 450 880 C330 1040 340 1210 450 1380 C580 1560 580 1700 450 1880 C370 1980 410 2100 450 2200"
              />
              <path
                id="route-path"
                class="route-line"
                d="M450 0 C580 130 350 250 450 380 C560 520 570 720 450 880 C330 1040 340 1210 450 1380 C580 1560 580 1700 450 1880 C370 1980 410 2100 450 2200"
              />
            </svg>

            <div class="travellers" id="travellers" aria-hidden="true">
              <img
                class="traveller traveller-hilario"
                src="/assets/doodles/hilario-placeholder.svg"
                data-png-src="/assets/doodles/Hilario.png"
                alt=""
              />
              <img
                class="traveller traveller-ilaria"
                src="/assets/doodles/ilaria-placeholder.svg"
                data-png-src="/assets/doodles/Ilaria.png"
                alt=""
              />
            </div>

            ${stopMarkup}
          </div>
        </div>
      </div>
    </section>

    <section class="invitation" id="invitacion">
      <div class="invitation-lines" aria-hidden="true"></div>
      <div class="invitation-inner" data-reveal>
        <p class="invitation-kicker">Estan sencillas de adivinar</p>
        <h2>Lara, te espero en la estacion que te quede mas comoda</h2>
        <p class="invitation-detail">Domingo 4 de octubre · cuatro paradas</p>
        <div class="response-actions">
          <button class="accept-action" id="accept" type="button">Sí, vamos</button>
          <button class="maybe-action" id="accept" type="button">Sí, vamos (pero en transparente)</button>
        </div>
        <p class="response-message" id="response-message" aria-live="polite"></p>
      </div>
    </section>
  </main>

  <footer>
    <p>Sujeto al clima y las vibes.</p>
    <span>Hilario e Ilaria xD· Brno</span>
  </footer>
`

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const routePath = document.querySelector<SVGPathElement>('#route-path')
const routeShadow = document.querySelector<SVGPathElement>('.route-shadow')
const travellers = document.querySelector<HTMLDivElement>('#travellers')
const mapCanvas = document.querySelector<HTMLDivElement>('#map-canvas')
const progressBar = document.querySelector<HTMLSpanElement>('#progress-bar')
const progressLabel = document.querySelector<HTMLElement>('#progress-label')
const desktopRoute = 'M450 0 C580 130 350 250 450 380 C560 520 570 720 450 880 C330 1040 340 1210 450 1380 C580 1560 580 1700 450 1880 C370 1980 410 2100 450 2200'
const mobileRoute = 'M450 0 C730 110 820 240 825 380 C830 570 95 650 75 880 C55 1080 810 1160 825 1380 C840 1570 105 1650 75 1880 C55 2040 300 2140 450 2200'

let routeProgress = 0.015

const updateRouteGeometry = () => {
  const route = window.innerWidth <= 560 ? mobileRoute : desktopRoute
  routePath?.setAttribute('d', route)
  routeShadow?.setAttribute('d', route)
}

const placeTravellers = (progress: number) => {
  if (!routePath || !travellers || !mapCanvas || !routePath.ownerSVGElement) return

  const pathLength = routePath.getTotalLength()
  const point = routePath.getPointAtLength(pathLength * progress)
  const nextPoint = routePath.getPointAtLength(Math.min(pathLength, pathLength * progress + 2))
  const routeBounds = routePath.ownerSVGElement.getBoundingClientRect()
  const canvasBounds = mapCanvas.getBoundingClientRect()
  const viewBox = routePath.ownerSVGElement.viewBox.baseVal
  const scaleX = routeBounds.width / viewBox.width
  const scaleY = routeBounds.height / viewBox.height
  const x = (point.x - viewBox.x) * scaleX + routeBounds.left - canvasBounds.left
  const y = (point.y - viewBox.y) * scaleY + routeBounds.top - canvasBounds.top
  const angle = Math.atan2(
    (nextPoint.y - point.y) * scaleY,
    (nextPoint.x - point.x) * scaleX,
  ) * (180 / Math.PI)

  const travellerOffsetX = travellers.offsetWidth / 2
  const travellerOffsetY = travellers.offsetHeight * 0.92

  travellers.style.transform = `translate3d(${x - travellerOffsetX}px, ${y - travellerOffsetY}px, 0)`
  travellers.style.setProperty('--travel-angle', `${Math.max(-7, Math.min(7, angle))}deg`)
}

document.querySelector('#open-map')?.addEventListener('click', () => {
  document.querySelector('#mapa')?.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
})

const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add('is-visible'))
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18 },
  )

  revealElements.forEach((element) => revealObserver.observe(element))
}

const parallaxLayers = Array.from(document.querySelectorAll<HTMLElement>('.parallax-layer'))
let parallaxFrame = 0

const renderJourneyProgress = () => {
  if (!mapCanvas) return

  const bounds = mapCanvas.getBoundingClientRect()
  const routeStart = window.innerHeight * 0.72
  const routeEnd = window.innerHeight * 0.28 - bounds.height
  const progress = Math.max(0, Math.min(1, (routeStart - bounds.top) / (routeStart - routeEnd)))
  const percent = Math.round(progress * 100)

  routeProgress = 0.015 + progress * 0.955
  placeTravellers(routeProgress)
  travellers?.classList.toggle('is-moving', !prefersReducedMotion && progress > 0 && progress < 1)

  if (progressBar) progressBar.style.width = `${percent}%`
  if (progressLabel) progressLabel.textContent = `${percent}%`
}

const renderParallax = () => {
  const viewportCenter = window.innerHeight / 2

  if (!prefersReducedMotion) {
    parallaxLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth ?? 0.5)
      const section = layer.closest<HTMLElement>('.intro, .map-canvas')
      if (!section) return

      const bounds = section.getBoundingClientRect()
      const sectionCenter = bounds.top + bounds.height / 2
      const distanceFromCenter = viewportCenter - sectionCenter
      const shift = Math.max(-90, Math.min(90, distanceFromCenter * depth * 0.12))

      layer.style.setProperty('--shift-y', `${shift}px`)
    })
  }

  parallaxFrame = 0
}

const queueParallax = () => {
  if (!parallaxFrame) {
    parallaxFrame = window.requestAnimationFrame(renderParallax)
  }
}

window.addEventListener('scroll', () => {
  renderJourneyProgress()
  queueParallax()
}, { passive: true })
window.addEventListener('resize', () => {
  updateRouteGeometry()
  placeTravellers(routeProgress)
  renderJourneyProgress()
  queueParallax()
})

updateRouteGeometry()
renderJourneyProgress()
renderParallax()

const responseMessage = document.querySelector<HTMLElement>('#response-message')
const responseActions = document.querySelector<HTMLElement>('.response-actions')

const addPaperConfetti = () => {
  if (prefersReducedMotion) return

  const confetti = document.createElement('div')
  const colors = ['#e75d3c', '#2f6f68', '#e0b83f', '#5c78b8', '#f2ead8']
  confetti.className = 'confetti'
  confetti.setAttribute('aria-hidden', 'true')

  for (let index = 0; index < 24; index += 1) {
    const piece = document.createElement('i')
    piece.style.setProperty('--x', `${8 + Math.random() * 84}vw`)
    piece.style.setProperty('--delay', `${Math.random() * 0.35}s`)
    piece.style.setProperty('--turn', `${Math.random() * 540 - 270}deg`)
    piece.style.background = colors[index % colors.length]
    confetti.append(piece)
  }

  document.body.append(confetti)
  window.setTimeout(() => confetti.remove(), 2600)
}

document.querySelector('#accept')?.addEventListener('click', () => {
  if (responseMessage) responseMessage.textContent = 'Entonces ya tenemos plan. Nos vemos el 4 de octubre.'
  if (responseActions) responseActions.hidden = true
  addPaperConfetti()
})

document.querySelector('#maybe')?.addEventListener('click', () => {
  if (responseMessage) responseMessage.textContent = 'Sin prisa. El mapa queda guardado para ti.'
  if (responseActions) responseActions.hidden = true
})

document.querySelectorAll<HTMLImageElement>('[data-png-src]').forEach(async (image) => {
  const pngSource = image.dataset.pngSrc
  if (!pngSource) return

  try {
    const response = await fetch(pngSource)
    if (response.ok && response.headers.get('content-type')?.startsWith('image/png')) {
      image.src = pngSource
    }
  } catch {
    // The illustrated fallback stays visible until the custom PNG is added.
  }
})

placeTravellers(routeProgress)
