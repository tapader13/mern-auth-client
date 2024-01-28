import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredential } from '../slices/authSlice';
import { toast } from 'react-toastify';
function LoginPage() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [createLogin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  const handleLogin = async (data) => {
    try {
      const res = await createLogin(data).unwrap();
      dispatch(setCredential(res));
      navigate('/');
    } catch (err) {
      toast.error(err.data);
    }
  };
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs={12} md={6} className='mx-auto bg-light p-3'>
          <Form noValidate onSubmit={handleSubmit(handleLogin)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                {...register('email', { required: true })}
                placeholder='Enter email'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                {...register('password', { required: true })}
                placeholder='Password'
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
