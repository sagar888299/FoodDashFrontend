import React from 'react'
import Restaurant from './Restaurant'
import ImageSlider from './ImageSlider'

const images = [
  'https://via.placeholder.com/1200x400?text=Image+1',
  'https://via.placeholder.com/1200x400?text=Image+2',
  'https://via.placeholder.com/1200x400?text=Image+3',
];

export default function Home() {
  return (
    <div className='mt-20'>
      <div className='object-cover px-20 w-full'>
        <ImageSlider images = {images} autoSlide = {true}/>
        </div>
        <h1 className='text-5xl py-10 text-indigo-800 underline decoration-indigo-500'><strong>Restaurant Near You </strong></h1>
        <Restaurant/>
    </div>
  )
}
