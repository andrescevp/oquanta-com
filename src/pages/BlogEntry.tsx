import React, { useEffect } from 'react';
import { Head } from "vite-react-ssg";
import { JsonLd } from "react-schemaorg";
import { BlogPosting } from 'schema-dts';
import pages, { images } from '../BlogEntries.ts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useParams, useNavigate } from 'react-router-dom';
import PagesHead from './PagesHead.tsx';
import LazyLoad from 'react-lazy-load';
import { useHead } from '../context/HeadContext';

function BlogEntry() {
    const { updateHead } = useHead();
    const { slug } = useParams();
    const [blogPost, setBlogPost] = React.useState();
    const [blogImage, setBlogImage] = React.useState();
    // const blogPost = (slug && slug in pages) ? pages[slug] : undefined;
    // const blogImage = (slug && slug in images) ? images[slug] : undefined;
    const navigate = useNavigate();

    useEffect(() => {
        if (slug && slug in pages) {
            const blogPost = pages[slug];
            const blogImage = images[slug];
            setBlogPost(blogPost);
            setBlogImage(blogImage);
            updateHead({
                title: `${blogPost.fields.title} - oQuanta`,
                description: blogPost.fields.description,
                canonicalLink: `https://www.oquanta.com/blog/${slug}`
            });
            return;
        }
        navigate('/not-found');
    }, [slug]);

    return (blogPost && <>
        <JsonLd<BlogPosting>
            item={{
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": blogPost.fields.title,
                "description": blogPost.fields.description,
                "datePublished": blogPost.fields.publishDate,
                "dateModified": blogPost.sys.updatedAt,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://www.oquanta.com/blog/${blogPost.fields.slug}`
                },
                "author": {
                    "@id": "https://www.oquanta.com/#organization"
                },
                "publisher": {
                    "@id": "https://www.oquanta.com/#organization"
                },
                "image": blogImage
            }}
        />
        <section className="py-16 px-4 snap-center">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-4xl font-bold text-center text-black mb-4">
                    {blogPost.fields.title}
                </h1>

                <LazyLoad width="100%" height="500px">
                    <img 
                        src={blogPost["featuredImage"]} 
                        alt={blogPost.fields.featuredImage?.fields?.title} 
                        className="mx-auto" 
                    />
                </LazyLoad>
            <article className="blog-entry my-4" dangerouslySetInnerHTML={{ __html: documentToHtmlString(blogPost.fields.content) }}></article>
            </div>
        </section>
    </>);
}

export default BlogEntry;