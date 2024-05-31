import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongodb';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: 'email and password',
      credentials: {
        email: {
          label: 'Email',
          placeholder: 'email@email.com',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error();
        }
        const client=await MongoClient.connect(process.env.MONGODB_URI as string);
        const db=client.db();  
        const user=await db.collection("users").findOne({email:credentials.email});
        if(user)
        {
          return user as any;
        }
        else
        {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise),
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
