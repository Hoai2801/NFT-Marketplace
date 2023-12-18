import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Slide() {
  return (
    <Carousel >
      <Carousel.Item interval={2000} style={{height:'450px'}}>
        <img src={require("../Img/slide2.webp")} alt="" className='w-100' />
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000} style={{height:'450px'}}>
      <img src={require("../Img/silde8.webp")} alt="" className='w-100'  />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'450px'}} interval={2000}>
      <img src={require("../Img/avatar.png")} alt="" className='w-100' />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slide



