import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredential } from '../slices/authSlice';
function RegistrationPage() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [createRegister, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  const handleRegister = async (data) => {
    try {
      if (data.password != data.cpassword) {
        toast('pass word not match');
      } else {
        const { name, email, password } = data;
        const res = await createRegister({ name, email, password }).unwrap();
        dispatch(setCredential(res));
        navigate('/');
      }
    } catch (err) {
      toast.error(err.data);
    }
  };
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs={12} md={6} className='mx-auto bg-light p-3'>
          <Form noValidate onSubmit={handleSubmit(handleRegister)}>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                name='name'
                {...register('name', { required: true })}
                placeholder='Enter name'
              />
            </Form.Group>
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
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='cpassword'
                name='cpassword'
                {...register('cpassword', { required: true })}
                placeholder='Confirm Password'
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Registration
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationPage;
