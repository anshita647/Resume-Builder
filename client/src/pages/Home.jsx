import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'
import Faq from '../components/home/Faq'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonial/>
      <CallToAction/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default Home
