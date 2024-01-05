import './App.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import { CallProvider } from './CallContext'
function App() {

  return (
    <CallProvider>
        <>
          <div className='App'>
            <div className='Navbar'>
                <Sidebar/>
            </div>
            <div className='Details'>
              <div className='Head'>
                <Header/>
              </div>
              <div className='Calls'>
                <Content/>
              </div>
            </div>
          </div>
        </>
    </CallProvider>
   
  )
}

export default App
