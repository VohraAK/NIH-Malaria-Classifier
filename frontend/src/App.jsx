import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MainBox from './components/MainBox'

export default function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className="flex flex-1">
        <MainBox />
      </main>
      <Footer />
    </div>
  )
}
