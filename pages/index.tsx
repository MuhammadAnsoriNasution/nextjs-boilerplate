import LayoutPrivate from '@/components/layout/private/LayoutPrivate'
import { NextPageWithLayout } from './_app'
import Head from 'next/head'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      halo
    </>
  )
}
Home.getLayout = function getLayout(page) {
  return (
    <LayoutPrivate>
      {page}
    </LayoutPrivate>
  )
}

export default Home