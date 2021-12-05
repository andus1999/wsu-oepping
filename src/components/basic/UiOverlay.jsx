import React from 'react'
import DrawerComponent from './DrawerComponent'
import Header from './Header';

export default function UiOverlay() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    //window.open('mailto:test@example.com?subject=subject&body=body');
  };

  window.onresize = () => {
    if(window.innerWidth >= 600){
      setMobileOpen(false);
    }
  };

  return (
    <>
      <DrawerComponent 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle}
      />
      <Header handleDrawerToggle={handleDrawerToggle}/>
    </>
  )
}
