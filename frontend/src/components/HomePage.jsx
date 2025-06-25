import React from 'react'
import HeroSection from './home page/Hero'
import SmBanner from './home page/SmBanner'
import ProductSection from './home page/ProductSection'
import MiddleBanner from './home page/MiddleBanner'
import AdvertisementBanner from './home page/AdBanner'


function HomePage() {
  return (
    <>
        <HeroSection/>
        <SmBanner/>
        <ProductSection/>
        <MiddleBanner/>
        <AdvertisementBanner/>
    </>
  )
}

export default HomePage