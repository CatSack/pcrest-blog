import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'
import styles from './post.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Post(props) {
    const router = useRouter()

    async function delete_post(e) {
        await fetch(`/api/delete_post/${props.post}`, {
            method: 'DELETE'
        })
        router.push('/')
    }

    if(!props) {
        return (
            <DefaultErrorPage statusCode={404}/>
        )
    }

    return (
        <div>
            <div className={styles.contentWrapper}>
                <Link href='/'>
                    <a className={styles.home}><span id={styles.one}>&#8592; Return to home</span><span id={styles.two}>&#8592;</span></a>
                </Link>
                <div className={styles.textWrapper}>
                    <div className={styles.title}><h1>{props.frontmatter.title}</h1>Posted on {props.frontmatter.date} by {props.frontmatter.author}</div>
                    <div className={styles.thumbnail}>
                        <Image src={props.frontmatter.thumbnailUrl} objectFit='cover' layout='fill'/>
                    </div>
                    <ReactMarkdown>{props.content}</ReactMarkdown>
                </div>
            </div>
            <button onClick={delete_post}>delete post</button>
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({params: {post}}) {
    try {
        const markdown = fs.readFileSync('./posts/' + post + '.md', 'utf-8')
        const {data: frontmatter, content} = matter(markdown)
        return {
            props: {
                post,
                frontmatter,
                content
            }
        }
    } catch(err) {
        return {
            notFound: true
        }
    }
}