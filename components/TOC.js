import React from 'react'
import Link from 'next/link'

import useScrollSpy from '../lib/scrollSpy'

const OFFSET = 100

const Table_of_Contents = ({ ids }) => {
  const [currentActiveIndex] = useScrollSpy(
    ids.map((item) => document.querySelector(`#${item.id}`).parentElement.closest('section')),
    { offset: OFFSET }
  )
  if (ids.length > 0) {
    return (
      <div className="table-of-contents mt-8">
        <ul>
          {ids.map((item, index) => {
            return (
              <a
                href={`#${item.id}`}
                key={item.id}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(`#${item.id}`)
                  if (element) {
                    window.scrollTo({
                      top: element.getBoundingClientRect().top + window.pageYOffset - OFFSET,
                      behavior: 'smooth',
                    })
                  }
                }}
                className={
                  currentActiveIndex === index
                    ? 'toc-a text-primary-600 hover:font-bold dark:text-primary-400'
                    : 'toc-a hover:font-bold'
                }
              >
                <li className="py-4">{item.title}</li>
              </a>
            )
          })}
        </ul>
      </div>
    )
  }
  return <></>
}

export default Table_of_Contents
