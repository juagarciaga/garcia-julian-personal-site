import Markdown from "markdown-to-jsx"
import getMetadata from "@/utils/get-metada"
import React from 'react'
import fs from 'fs'
import matter from "gray-matter"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"

const folderPath = 'content/'

function getPostContent(slug: any) {
    const file = folderPath + `${slug}.md`
    const content = fs.readFileSync(file, 'utf8')
    return matter(content)
}

export async function generateMetadata({ params, searchParams }: any) {
    const id = params?.slug ? params?.slug : ''
    return {
        title: `Juliana Garcia ⋅ ${id.replaceAll('_', ' ')}`
    }
}

export const generateStaticParams = () => {
    const posts = getMetadata(folderPath)
    return posts.map((post) => ({ slug: post.slug }))
}

export default function ArticlePage(props: any) {
    const { slug } = props.params
    const post = getPostContent(slug)
    const { content } = post

    return (
        <main>
            <Navigation activePage={slug} />
            <div className="py-4 mx-auto main-container-custom">
                <div className="m-4">
                    <Markdown >{content}</Markdown>
                </div>
            </div>
            <Footer />
        </main>
    )
}