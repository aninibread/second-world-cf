import { getSortedProjectPostsData, getProjectPostData } from '../../lib/posts';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import styles from '../../styles/markdownStyles.module.css';

export async function getStaticPaths() {
  
  const allPostsData = getSortedProjectPostsData();

  const paths = allPostsData.map((post) => ({
    params: { ids: post.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getProjectPostData(params.ids); // Ensure params.ids is the correct variable
  return {
    props: {
      postData,
    },
  };
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  // Split the date string into parts
  const [year, month, day] = dateString.split('-');
  // Create a new Date object with the local timezone
  const date = new Date(Date.UTC(year, month - 1, day));
  // Return the formatted date string
  return date.toLocaleDateString(undefined, options);
}


export default function ProjectPost({ postData }) {
  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/profile_favcon.jpeg" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <h1 className="text-4xl font-bold mb-6 my-4">{postData.title}</h1>
          <div className="mb-4 text-gray-500">
            <p>Created: {formatDate(postData.date)}</p>
          </div>
          <div 
            className={`${styles.markdown} prose lg:prose-xl max-w-none mb-4`}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </article>
        <div className="bounce-link-container">
          <a href="/writing" className="bounce-link">go back to writings 🖋️</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
