'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

type Slide = { src: string; alt?: string }

export function AppCarousel({ images }: { images: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="ac-root">
      <div className="ac-viewport" ref={emblaRef}>
        <div className="ac-track">
          {images.map(({ src, alt }, i) => (
            <div className="ac-slide" key={i}>
              <img src={src} alt={alt ?? `Slide ${i + 1}`} className="ac-img" />
            </div>
          ))}
        </div>
      </div>

      <button className="ac-btn ac-btn--prev" onClick={prev} aria-label="Previous slide">‹</button>
      <button className="ac-btn ac-btn--next" onClick={next} aria-label="Next slide">›</button>

      <div className="ac-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`ac-dot${i === selected ? ' ac-dot--active' : ''}`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
