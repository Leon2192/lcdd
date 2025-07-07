import './App.css'
import Hero from "./components/Hero/HeroPremium"
import Footer from "./components/Footer"
import Navbar from './components/Navbar'
import NuevoServicio from './components/New'
import InfoGrid from './components/Infogrid'
import Servicios from './components/Servicios'
import Whatsapp from './components/Whatsapp'

function App() {


  return (
    <>
    <Navbar/>
    <Hero />
    <NuevoServicio/>
    <InfoGrid/>
   <Servicios/>
    <Footer/>
    <Whatsapp />
    </>
  )
}

export default App
