import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Table_of_Contents = ({ ids }) => {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState('')
  const offset = 200 // Adjust this value to your needs

  const handleClick = (id) => (event) => {
    event.preventDefault()
    const section = document.getElementById(id)
    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    // Check if window is defined to avoid issues with server-side rendering
    if (typeof window !== 'undefined') {
      const handleRouteChange = (url) => {
        const hash = url.split('#')[1]
        setCurrentSection(hash)
      }

      const handleScroll = () => {
        let current = ''

        ids.forEach(({ id }) => {
          const section = document.getElementById(id)
          const rect = section.getBoundingClientRect()
          if (rect.top <= offset) {
            current = id
          }
        })

        setCurrentSection(current)
      }

      router.events.on('hashChangeComplete', handleRouteChange)
      window.addEventListener('scroll', handleScroll)

      return () => {
        router.events.off('hashChangeComplete', handleRouteChange)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="table-of-contents mt-8">
      {ids.map(({ id, title }) => (
        <ul key={id}>
          <li className="py-4">
            <a
              href={`#${id}`}
              onClick={handleClick(id)}
              className={
                currentSection === id
                  ? 'toc-a text-primary-600 hover:font-bold dark:text-primary-400 py-4'
                  : 'toc-a hover:font-bold py-4'
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
