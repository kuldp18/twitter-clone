import Head from 'next/head';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Login from '../components/Login';
import { useEffect, useState } from 'react';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { db } from '../firebase';
import { getProviders, getSession, useSession } from 'next-auth/react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Widgets from '../components/Widgets';

const PostPage = ({ trendingResults, followResults, providers }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  //   fetching the current post
  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );
  // fetching comments of current post
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <meta name="description" content="Clone of Twitter.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex justify-center items-center xl:px-0"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />

          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment.data()}
                  id={comment.id}
                />
              ))}
            </div>
          )}
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const trendingResults = await fetch(
    'https://api.npoint.io/ebf37fd9701081fbb44f'
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // const followResults = await fetch('https://jsonkeeper.com/b/WWMJ')
  //   .then((res) => res.json())
  //   .catch((err) => console.log(err));

  const followResults = 'Follow Results';
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}

export default PostPage;
