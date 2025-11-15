import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ComponentDetail from './components/ComponentDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components/:name" element={<ComponentDetail />} />
    </Routes>
  )
}

export default App
