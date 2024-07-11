import { useRoutes } from 'react-router-dom';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostView from './components/PostView';

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/posts/new", element: <NewPost /> },
    { path: "/posts/:id", element: <PostView /> }
  ]);

  return routes;
};

export default App;