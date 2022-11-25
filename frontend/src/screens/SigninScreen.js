import Axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from "react-helmet-async";
import { Store } from '../Store';
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function SigninScreen() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/signin', {
                email,
                password,
            })
            ctxDispatch({ type: "USER_SIGNIN", payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        } catch (err) {
            toast.error('Invalid email and password')
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container className="small-container" >
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div>
                    New Customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
                </div>
            </Form>

        </Container>
    )
}