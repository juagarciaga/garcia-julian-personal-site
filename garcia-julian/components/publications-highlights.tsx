'use client'
import { useState, useEffect } from 'react'

type Paper = {
  title: string
  authors: string
  venue: string
  year: number
  summary: string
  link: string
  linkLabel: string
  topics: string[]
}

type MediaItem = {
  title: string
  outlet: string
  summary: string
  link: string
  topics: string[]
}

type Topic = {
  id: string
  emoji: string
  name: string
  description: string
}

type HighlightsData = {
  topics: Topic[]
  papers: Paper[]
  media: MediaItem[]
}

export default function PublicationsHighlights({ data }: { data: HighlightsData }) {
  const { topics, papers, media = [] } = data
  const [selectedTopic, setSelectedTopic] = useState(topics[0]?.id || 'all')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const topic = params.get('topic')
    if (topic && topics.some((t) => t.id === topic)) {
      setSelectedTopic(topic)
    }
  }, [])

  const visibleTopics =
    selectedTopic === 'all' ? topics : topics.filter((t) => t.id === selectedTopic)

  return (
    <div>
      <h3>📚 Full List</h3>
      <p className="mb-6">
        For a complete and up-to-date publication list, see my{' '}
        <a
          href="https://scholar.google.com.au/citations?hl=en&user=nWHuAL4AAAAJ&view_op=list_works&sortby=pubdate"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Scholar profile
        </a>
        .
      </p>

      <hr className="my-6" />

      <div className="mb-6">
        <h3>Filter by Area</h3>
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full p-2 border rounded text-sm text-gray-700 bg-white cursor-pointer"
        >
          <option value="all">All areas</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.emoji} {t.name}
            </option>
          ))}
        </select>
      </div>

      {visibleTopics.map((topic, topicIdx) => {
        const topicPapers = papers
          .filter((p) => p.topics.includes(topic.id))
          .sort((a, b) => b.year - a.year)
        const topicMedia = media.filter((m) => m.topics.includes(topic.id))

        return (
          <div key={topic.id} className="mb-8">
            <h4 className="font-bold text-gray-800 mb-1">
              {topic.emoji} {topic.name}
            </h4>
            <p className="text-sm text-gray-600 mb-4">{topic.description}</p>

            <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">📄 Papers</h5>
            <ul className="list-disc ml-4 space-y-4 mb-4">
              {topicPapers.map((paper, i) => (
                <li key={`paper-${i}`}>
                  <p className="mb-0">
                    <strong>{paper.title}</strong>{' '}
                    <a href={paper.link} target="_blank" rel="noopener noreferrer">
                      🔗
                    </a>
                  </p>
                  <p
                    className="text-sm text-gray-500 mb-1"
                    dangerouslySetInnerHTML={{
                      __html: `${paper.authors}. <strong>${paper.venue}</strong>, ${paper.year}.`,
                    }}
                  />
                  <p className="text-sm text-gray-600 mb-0">{paper.summary}</p>
                </li>
              ))}
            </ul>

            {topicMedia.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">📰 Media</h5>
                <ul className="list-disc ml-4 space-y-4">
                  {topicMedia.map((item, i) => (
                    <li key={`media-${i}`}>
                      <p className="mb-0">
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <strong>{item.title}</strong>
                        </a>{' '}
                        <span className="text-gray-400">— {item.outlet}</span>
                      </p>
                      <p className="text-sm text-gray-600 mb-0">{item.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {topicIdx < visibleTopics.length - 1 && <hr className="my-6" />}
          </div>
        )
      })}
    </div>
  )
}
