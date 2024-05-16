import Markdown from "markdown-to-jsx"
import getMetadata from "@/utils/get-metada"
import React from 'react'
import fs from 'fs'
import matter from "gray-matter"

const folderPath = 'content/'

function getPostContent(slug: any) {
    const file = folderPath + `${slug}.md`
    const content = fs.readFileSync(file, 'utf8')
    return matter(content)
}

export const generateStaticParams = () => {
    const posts = getMetadata(folderPath)
    console.log({posts})
    return posts.map((post) => ({ slug: post.slug.split('/')[1] }))
}

export async function generateMetadata({ params, searchParams }: any) {
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `Juliana Garcia ⋅ Blog ${id.replaceAll('_', ' ')}`
    }
}

export default function ArticlePage(props: any) {
    const { slug } = props.params
    const post = getPostContent(slug)
    const { content } = post

    return (
        <main style={{ background: 'white', color: 'black' }}>

            <Markdown >{content}</Markdown>
        </main>
    )
}