import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Props = {}

export default function HomeTemplate({}: Props) {
  return (

        <div className="">
            {/* <header>Header</header> */}
            <Header/>
            <Outlet/>
            {/* <Footer/> */}
            <footer>Footer</footer>
        </div>
        
    
  )
}