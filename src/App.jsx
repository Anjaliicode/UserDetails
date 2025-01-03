import MyTable from "./components/MyTable";
import PostDetails from "./components/PostDetails";
import Comments from "./components/Comments";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <Router>  
      <Routes>  
        <Route path="/" element={<MyTable />} />  
        <Route path="/posts/:userId" element={<PostDetails />} /> 
        <Route path="/comments/:postId" element={<Comments />}/>
      </Routes>  
    </Router>  
  );
}
export default App;
