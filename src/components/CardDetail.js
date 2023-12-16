import React from 'react'
import { Image } from 'primereact/image'

function CardDetail({linkimg}) {
  return (
    <div className='col-lg-5 bg-white img-info'>
                    <div className='d-flex items-center h-[25px] icons-item'>
                        <svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', color: "#000" }}><path d="M18.527 12.2062L12 16.1938L5.46875 12.2062L12 1L18.527 12.2062ZM12 17.4742L5.46875 13.4867L12 23L18.5312 13.4867L12 17.4742V17.4742Z" fill="black"></path></svg>
                        <div className='d-flex items-center gap-2 '>
                            <span style={{fontSize:'18px'}}>0</span>
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" fill=''/>
                            </svg>
                        </div>
                       
                    </div>

                    <Image src={linkimg} alt="Image"  preview />
                </div>
  )
}

export default CardDetail
