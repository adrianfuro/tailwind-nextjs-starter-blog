import React, { useEffect, useState, useRef } from 'react'

const Table_of_Contents = ({ ids }) => {
  const [activeId, setActiveId] = useState('')
  const observer = useRef(null)

  useEffect(() => {
    const options = {
      rootMargin: '-50px 0px 0px 0px',
      threshold: 0.3,
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, options)

    ids.forEach(({ id }) => {
      const target = document.getElementById(id)
      if (target) observer.current.observe(target)
    })

    return () => {
      ids.forEach(({ id }) => {
        const target = document.getElementById(id)
        if (target) observer.current.unobserve(target)
      })
    }
  }, [ids])

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
          <li key={id} className={`py-4 ${level === 3 ? 'ml-4' : ''}`}>
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
