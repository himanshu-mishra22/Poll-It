import Navbar from '@/components/Navbar'
import SideMenu from '@/components/SideMenu';
import React from 'react'

function HomePage({children, activeMenu}) {
  // console.log({children});
  return (
    <div>
      <Navbar/>
      <SideMenu activeMenu={activeMenu}/>
      <div>
        {children}
      </div>

      
      
    </div>
  )
}

export default HomePage