import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID! as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET! as string,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-05-25', // use a current date or your API version
});

export default sanityClient;
