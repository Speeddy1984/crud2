import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:7070/posts/${id}`)
      .then(response => {
        setPost(response.data.post);
        setContent(response.data.post.content);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7070/posts/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:7070/posts/${id}`, { content });
      setIsEditing(false);
      setPost((prevPost) => ({ ...prevPost, content }));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          {isEditing ? (
            <Form>
              <Form.Group controlId="content">
                <Form.Label>Edit Post</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={handleSave}>Save</Button>
              <Button variant="secondary" className="mt-3 ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Form>
          ) : (
            <>
              <Card.Img
                className='img'
                variant="top"
                src={"https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-1024.png"}
                alt="Фото"
              />
              <Card.Title className="mt-3">{post.content}</Card.Title>
              <Card.Text>
                <h3>{post.authorName || "Unknown User"}</h3>
                {new Date(post.created).toLocaleString()}
              </Card.Text>
              <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="danger" className="ms-2" onClick={handleDelete}>Delete</Button>
              <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>Back</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostView;