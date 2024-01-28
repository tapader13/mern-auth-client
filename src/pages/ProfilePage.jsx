import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredential } from '../slices/authSlice';
import { useUpdateProfileMutation } from '../slices/userApiSlice';
function ProfilePage() {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updatePro] = useUpdateProfileMutation();
  useEffect(() => {
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
  }, [userInfo.name, userInfo.email]);
  const handleUpdate = async (data) => {
    try {
      if (data?.password != data?.cpassword) {
        toast('pass word not match');
      } else {
        console.log(data, 'er');
        const { name, email, password } = data;
        const res = await updatePro({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(
          setCredential({ _id: userInfo._id, name: res.name, email: res.email })
        );
        toast.success('done!');
      }
    } catch (err) {
      toast.error(err.data);
    }
  };
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs={12} md={6} className='mx-auto bg-light p-3'>
          <Form noValidate onSubmit={handleSubmit(handleUpdate)}>
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
                {...register('password')}
                placeholder='Password'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='cpassword'
                name='cpassword'
                {...register('cpassword')}
                placeholder='Confirm Password'
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
