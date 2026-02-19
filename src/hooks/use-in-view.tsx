import { useCallback, useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number | Array<number>
}

export const useInView = (options: UseInViewOptions = {}) => {
  const [inView, setInView] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback((node: HTMLElement | null) => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current)
    }

    if (node && observerRef.current) {
      observerRef.current.observe(node)
    }

    elementRef.current = node
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        threshold: options.threshold ?? 0,
      },
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [options.threshold])

  return { ref: setRef, inView }
}
