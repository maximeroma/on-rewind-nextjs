import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const Home = dynamic(
  () => {
    return import('../components/Home')
  },
  { ssr: false }
)

function Index() {
  return <Home />
}

export default Index
