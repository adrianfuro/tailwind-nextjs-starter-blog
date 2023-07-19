import React from 'react'

const useScrollSpy = (elements, options) => {
  const [currentActiveSectionIndex, setCurrentActiveSectionIndex] = React.useState(-1)

  const rootMargin = `-${(options && options.offset) || 0}px 0px 0px 0px`

  const scrolledSections =
    currentActiveSectionIndex >= 0 ? elements.slice(0, currentActiveSectionIndex + 1) : []

  const observer = React.useRef()

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        const indexOfSectionToHighlight = entries.findIndex((entry) => {
          return entry.intersectionRatio > 0
        })

        setCurrentActiveSectionIndex(indexOfSectionToHighlight)
      },
      {
        root: (options && options.root) || null,
        rootMargin,
      }
    )

    const { current: currentObserver } = observer

    elements.forEach((element) => (element ? currentObserver.observe(element) : null))

    return () => currentObserver.disconnect()
  }, [elements, options, rootMargin])

  return [currentActiveSectionIndex, scrolledSections]
}

export default useScrollSpy
