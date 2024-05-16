import fs from 'fs'
import matter from 'gray-matter'

export interface articleData {
    title: string
    description: string
    icon: string
    tags: string
    dateWritten: string
    readingTime: string
    slug: string
}

export default function getMetadata(basePath: string): articleData[] {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    const posts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8')
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            description: matterResult.data.description,
            icon: matterResult.data.icon,
            tags: matterResult.data.tags,
            dateWritten: matterResult.data.dateWritten,
            readingTime: matterResult.data.readingTime,
            slug: filename.replace('.md', '')
        }
    })
    return posts
}