import './App.css';

import { Route, Routes } from 'react-router-dom';

import Header from './Components/Header';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import About from './Components/About';
import PostPage from './Components/PostPage';
import Missing from './Components/Missing';
import UpdatePost from './Components/UpdatePost';

import { DataProvider } from './Context/DataContext';

import useWindowWidthCalculator from './hooks/useWindowWidth'

function App() {
	const { width } = useWindowWidthCalculator();
    
	return (
		<>	
			<div className="container">
				<Header heading="My Blog Site" width={width} />

				<DataProvider>
					<Nav/>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/post" element={<NewPost />}/>
						<Route path="/post/:id" element={<PostPage />}/>
						<Route path="/about" element={<About />} />
						<Route path="/update/:id" element={<UpdatePost />} />
						<Route path="*" element={<Missing />} />
					</Routes>
				</DataProvider>

				<Footer />
			</div>
		</>
	);
}

export default App;
