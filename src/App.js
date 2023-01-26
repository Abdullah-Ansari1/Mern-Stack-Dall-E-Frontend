import React,{useState} from 'react'
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';
import logoDark from './assets/logoDark.png'
import {logo} from './assets';
import { UilMoon, UilSun } from '@iconscout/react-unicons'
import {Home,CreatePost} from './pages';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
 <BrowserRouter>
 <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]' style={darkMode?{background:"rgb(0 0 0)"}:{background:"#fff"}}>
<Link to='/'>
<img src={darkMode?logoDark:logo} alt="logo" className="w-28 object-contain"/>
</Link>
 <div className='flex justify-around gap-1'>
<Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
 <div onClick={(e)=>{e.preventDefault(); setDarkMode(!darkMode)}} className="m-auto">{darkMode?<UilSun size={"2rem"} className="cursor-pointer hover:text-yellow-400 text-white transition-all"/>:<UilMoon size={"2rem"} className="cursor-pointer hover:text-blue-600 text-gray-900 transition-all"/>}</div> 
 </div>
 </header>
 <main className='sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]' style={darkMode?{background:"#253163"}:{background:"#f9fafe"}}>
<Routes>
<Route path='/' element={<Home darkMode={darkMode}/>}/>
<Route path='/create-post' element={<CreatePost darkMode={darkMode}/>}/>

</Routes>
 </main>
 </BrowserRouter>
  )
}

export default App