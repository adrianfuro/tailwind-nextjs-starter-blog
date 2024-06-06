import React, { useEffect, useState, useRef } from 'react'

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({})

  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement.target)
      })

      const topMostVisibleHeading = visibleHeadings[0]
      if (topMostVisibleHeading) {
        setActiveId(topMostVisibleHeading.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.3,
    })
    const elements = document.querySelectorAll('h2, h3')

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])

  return headingElementsRef
}

const Table_of_Contents = () => {
  const [ids, setIds] = useState([])
  const [activeId, setActiveId] = useState(null)
  useIntersectionObserver(setActiveId)

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2:not(.exclude), h3:not(.exclude)'))
    const ids = headings.map((heading) => ({
      id: heading.id,
      title: heading.textContent,
      level: heading.tagName === 'H2' ? 2 : 3,
    }))
    setIds(ids)
  }, [])

  const handleClick = (id) => (event) => {
    event.preventDefault()
    const section = document.getElementById(id)
    window.scrollTo({
      top: section.offsetTop - 100, // Adjust this offset as needed
      behavior: 'smooth',
    })
  }

  return (
    <div className="table-of-contents mt-8">
      <ul>
        {ids.map(({ id, title, level }) => (
          <li key={id} style={{ marginLeft: level === 3 ? '20px' : '0px' }}>
            <a
              href={`#${id}`}
              onClick={handleClick(id)}
              className={
                activeId === id
                  ? 'toc-active font-bold text-primary-600 dark:text-primary-400'
                  : 'toc-link hover:font-bold'
              }
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Table_of_Contents
