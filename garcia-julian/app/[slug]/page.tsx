import Markdown from "markdown-to-jsx"
import getMetadata from "@/utils/get-metada"
import React from 'react'
import fs from 'fs'
import matter from "gray-matter"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import Script from 'next/script';
import Image from "next/image";

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
            <Script
                src="https://www.statcounter.com/counter/counter.js"
                strategy="worker"
                id="13020501"
            >
                <div className="statcounter">
                    <a title="Web Analytics" href="https://statcounter.com/" target="_blank">
                        <Image className="statcounter" src="https://c.statcounter.com/13020501/0/f76d1f72/1/" alt="Web Analytics" referrerPolicy="no-referrer-when-downgrade" />
                    </a>
                </div>
            </Script>

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