'use client';
import { Amplify } from 'aws-amplify';
import outputs from '@/../amplify_outputs.json';
Amplify.configure(outputs, { ssr: true });

const Page = () => null

export default Page;