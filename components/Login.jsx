import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Head>
        <title>Login on Twitter</title>
        <meta name="description" content="Clone of Twitter.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />

      <div>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button
                class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#1d9bf0] rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span class="relative font-bold">
                  Signin with {provider.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Login;
