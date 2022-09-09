import Head from 'next/head';
import Image from 'next/image';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Login from '../components/Login';
import { getProviders, getSession, useSession } from 'next-auth/react';

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Clone of Twitter.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        {/* Widgets */}

        {/* Modal */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV')
  //   .then((res) => res.json())
  //   .catch((err) => console.log(err));
  // const followResults = await fetch('https://jsonkeeper.com/b/WWMJ')
  //   .then((res) => res.json())
  //   .catch((err) => console.log(err));

  const trendingResults = 'Treanding Results';
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
