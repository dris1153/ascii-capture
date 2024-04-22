import useIsMount from '~/hooks/useIsMount';
import MainLayout from '~/layout/MainLayout';
import dynamic from 'next/dynamic';

const HomeContainer = dynamic(() => import('~/containers/HomeContainer'), { ssr: false });

export default function HomePage() {
  const isMount = useIsMount();
  return <MainLayout>{isMount && <HomeContainer />}</MainLayout>;
}
