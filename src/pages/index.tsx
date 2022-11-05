import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('../components/pages/home'), {
  ssr: false,
})

export default function HomePage() {
  return <DynamicPage/>;
}

