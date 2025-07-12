import './App.css'
import Hero from "./components/Hero/HeroPremium"
import Footer from "./components/Footer"
import Navbar from './components/Navbar'
import NuevoServicio from './components/New'
import InfoGrid from './components/Infogrid'
import Invitaciones from './components/Invitaciones'
import Whatsapp from './components/Whatsapp'
import Servicios from './components/Servicios'

function App() {


  return (
    <>
    {/* <Navbar/> */}
    <Hero />
    <NuevoServicio/>
    <Servicios/>
    <Invitaciones/>
    <InfoGrid/>
    <Footer/>
    <Whatsapp />
    </>
  )
}

export default App
