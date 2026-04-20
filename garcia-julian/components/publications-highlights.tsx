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

type Topic = {
  id: string
  emoji: string
  name: string
  description: string
}

type HighlightsData = {
  topics: Topic[]
  papers: Paper[]
}

export default function PublicationsHighlights({ data }: { data: HighlightsData }) {
  const { topics, papers } = data
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
      <p className="mb-4">
        📚 For a complete and up-to-date list, see my{' '}
        <a
          href="https://scholar.google.com.au/citations?hl=en&user=nWHuAL4AAAAJ&view_op=list_works&sortby=pubdate"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Scholar profile
        </a>
        .
      </p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Filter by area</label>
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
        const topicPapers = papers.filter((p) => p.topics.includes(topic.id)).sort((a, b) => b.year - a.year)
        return (
          <div key={topic.id} className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {topic.emoji} {topic.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{topic.description}</p>

            <ul className="list-disc ml-4 space-y-4">
              {topicPapers.map((paper, i) => (
                <li key={i}>
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

            {topicIdx < visibleTopics.length - 1 && <hr className="my-6" />}
          </div>
        )
      })}
    </div>
  )
}
