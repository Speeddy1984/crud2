import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

const NewPost = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:7070/posts', { id: 0, content });
      navigate('/');
    } catch (error) {
      console.error('Ошибка создания заметки:', error);
    }
  };

  return (
    <div className='newPost'>
      <h1>Create Post</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post text</Form.Label>
        <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={4} cols={50} />
      </Form.Group>
      <div className='btns'>
        <Button variant="primary" type="submit">Publish</Button>
        <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </Form>
      
    </div>
  );
};

export default NewPost;