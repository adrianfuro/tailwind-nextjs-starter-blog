import { useEffect, useState, useRef } from 'react'

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

    ids.forEach((id) => {
      const target = document.getElementById(id.id)
      if (target) observer.current.observe(target)
    })

    return () => {
      ids.forEach((id) => {
        const target = document.getElementById(id.id)
        if (target) observer.current.unobserve(target)
      })
    }
  }, [ids])

  const handleClick = (id) => (event) => {
    event.preventDefault()
    const offset = 100 // adjust this to your needs
    const section = document.getElementById(id)
    window.scrollTo({
      top: section.offsetTop - offset,
      behavior: 'smooth',
    })
  }

  return (
    <div className="table-of-contents mt-8">
      {ids.map(({ id, title }) => (
        <ul key={id}>
          <li className="py-4">
            <a
              href={`#${id}`}
              onClick={handleClick(id)} // added onClick handler
              className={
                activeId === id
                  ? 'toc-a py-4 font-bold text-primary-600 dark:text-primary-400'
                  : 'toc-a py-4 hover:font-bold'
              }
            >
              {title}
            </a>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Table_of_Contents
