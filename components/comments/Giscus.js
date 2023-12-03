import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const commentsRef = useRef(null)
  const { theme, resolvedTheme } = useTheme()

  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = 'comments-container'

  // Function to load comments
  const loadComments = () => {
    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repositoryId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-reactions-enabled', reactions)
    script.setAttribute('data-emit-metadata', metadata)
    script.setAttribute('data-input-position', inputPosition)
    script.setAttribute('data-lang', lang)
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the comments section is in the viewport, load the comments
        if (entries[0].isIntersecting) {
          loadComments()
          observer.disconnect()
        }
      },
      { threshold: 1 }
    )

    observer.observe(commentsRef.current)

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
      <div className="giscus" id={COMMENTS_ID} ref={commentsRef} />
    </div>
  )
}

export default Giscus
