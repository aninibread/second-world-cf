import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Gfm from 'remark-gfm';
import parse from 'remark-parse';

const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
  
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md')) // Only include .md files
      .map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');
  
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
  
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id and excerpt
        return {
            id,
            ...matterResult.data,
        };
    });
  
    return allPostsData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // For descending order
    });
    
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html, { sanitize: false }) // Set sanitize to false to allow HTML tags
    .use(parse)
    .use(Gfm)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data
    };
}
  
const projectPostsDirectory = path.join(process.cwd(), 'src/pages/project-posts'); // Update this path

export function getSortedProjectPostsData() {
    const fileNames = fs.readdirSync(projectPostsDirectory);
  
    const allProjectPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(projectPostsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    return allProjectPostsData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
}

export async function getProjectPostData(id) {
  const fullPath = path.join(projectPostsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html, { sanitize: false }) // Set sanitize to false to allow HTML tags
  .use(parse)
  .use(Gfm)
  .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}