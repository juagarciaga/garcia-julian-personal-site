import { ContactInfoBlock } from "@/components/contact-info-block";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import fs from 'fs'
import { folderPath } from "./constants";

function getPostContent(slug: any) {
    const file = folderPath + `${slug}.md`
    const content = fs.readFileSync(file, 'utf8')
    return matter(content)
}

export const Intro = () => {
    const post = getPostContent('home')
    const { content } = post
    return (
        <>
            <div className="justify-center items-center gap-4 md:flex sm:flex-column m-4">
                <div className="wrapperPictureProfile">
                    <Image
                        src="/picture-profile.jpeg"
                        alt="Julian Garcia"
                        width={300}
                        height={76}
                        priority
                    />
                </div>
                <div className="hidden sm:hidden lg:block">
                    <ContactInfoBlock />
                </div>
            </div>
            <div className="m-4">
                <Markdown>{content}</Markdown>
            </div>
        </>
    )
}