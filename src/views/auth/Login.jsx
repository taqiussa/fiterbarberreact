import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import logo from '../../assets/img/allyson.jpg';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);
    const history = useHistory();
    const loginHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        await axios.post('http://fiterbarber.api/api/auth/login', formData)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expires_in', response.data.expires_in);
                history.push('/admin/dashboard');
            })
            .catch((error) => {
                setValidation(error.response.data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/admin/dashboard');
        }
    });
    return (
        <div className='container mt-5 min-vh-100'
            style={{
                backgroundImage: `url(${logo})`,
                backgroundSize: "cover",
            }}>
            {
                isLoading ?
                    <Row>
                        <Col md="12" className="text-center centered">
                            <img src="../images/loading4.gif" className="img img-fluid" />
                        </Col>
                    </Row>
                    :
                    <Row>
                        {/* <Col md="6">
                            <Card className="shadow">
                                <Image src="logofiterbarber.png" />
                                </Card>
                            </Col> */}
                        <Col md={{ span: 6, offset: 6 }} className="mt-5">
                            <Card className="px-3 py-3 bg-transparent border-light shadow" >
                                {/* <Image className='card-img-top' src="logofiterbarber.png" /> */}
                                {/* <div className='card-img-overlay'> */}
                                <Card.Header className="bg-transparent">
                                    <Image src="logofiterbarber.png" className='w-25 float-left mr-2'/>
                                    <Form.Control custom as="h1" className='text-white font-weight-bold'>Fiter Barber</Form.Control>
                                    {
                                        validation.message && (
                                            <div className="alert alert-danger">
                                                {validation.message}
                                            </div>
                                        )
                                    }
                                </Card.Header>
                                <Card.Body className="bg-transparent">
                                    <Form onSubmit={loginHandler}>
                                        <Row>
                                            <Col>
                                                <Form.Label style={{ fontSize: "15px" }} className="font-weight-bold text-white">Email : </Form.Label>
                                                <Form.Control type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                                {
                                                    validation.email && (
                                                        <div className="alert alert-danger mt-2">
                                                            Silahkan Isi Email
                                                        </div>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label style={{ fontSize: "15px" }} className="font-weight-bold text-white">Password : </Form.Label>
                                                <Form.Control type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                                {
                                                    validation.password && (
                                                        <div className="alert alert-danger mt-2">
                                                            Masukkan Password
                                                        </div>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                        <Row className="my-3 text-right">
                                            <Col>
                                                <Button type="submit" variant="dark" className="btn-fill"> LOGIN </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                                {/* </div> */}
                            </Card>
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default Login
