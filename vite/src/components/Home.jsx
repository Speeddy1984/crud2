import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7070/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <Container>
      <h1 className="my-4">Posts</h1>
      <Link to="/posts/new">
        <Button variant="primary" className="mb-4">Create Post</Button>
      </Link>
      <Row>
        {posts.map(post => (
          <Col md={4} key={post.id} className="mb-4">
            <Card>
              <Card.Img 
                className='img'
                src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-1024.png" 
                alt="Фото"
              />
              <Card.Body>
                <Card.Title>{post.content}</Card.Title>
                <Card.Text>
                  <h3>User323232</h3>
                  {new Date(post.created).toLocaleString()}
                </Card.Text>
                <Link to={`/posts/${post.id}`}>
                  <Button variant="primary">View Post</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;