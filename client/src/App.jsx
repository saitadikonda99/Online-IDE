import { Routes, Route} from 'react-router-dom'
import './App.css'

import Home from './Home/Home'

function App() {
	return (
	<div className="App-Container">
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	</div>
  )
}

export default App
