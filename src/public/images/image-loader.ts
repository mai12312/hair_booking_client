'use client'

type ImageLoader = {
    src: string
}
export default function  imageLoader ({ src}: ImageLoader) {
    return `http://localhost:3000/${src}`
}