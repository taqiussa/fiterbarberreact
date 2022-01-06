import { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
import { numberFormat } from 'components/Helpers/Helpers';
import { useHistory } from 'react-router';
const Keuangan = () => {
    const token = localStorage.getItem('token');
    const [bulan, setBulan] = useState(0);
    const [namaBulan, setNamaBulan] = useState('');
    const [tahun, setTahun] = useState(0);
    const [tahunIni, setTahunIni] = useState([]);
    const [pemasukan, setPemasukan] = useState(0);
    const [pengeluaran, setPengeluaran] = useState(0);
    const [bon, setBon] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const history = useHistory();
    var arrTahun = [];
    const arrayTahun = () => {
        var i;
        for (i = 2020; i <= Number(Moment(new Date()).format('YYYY')); i++) {
            arrTahun.push({
                id: i,
                tahun: i
            });
        };
        setTahunIni(arrTahun);
    }
    const switchBulan = (e) => {
        switch (e) {
            case "1":
                setNamaBulan('Januari');
                break;
            case "2":
                setNamaBulan('Februari');
                break;
            case "3":
                setNamaBulan('Maret');
                break;
            case "4":
                setNamaBulan('April');
                break;
            case "5":
                setNamaBulan('Mei');
                break;
            case "6":
                setNamaBulan('Juni');
                break;
            case "7":
                setNamaBulan('Juli');
                break;
            case "8":
                setNamaBulan('Agustus');
                break;
            case "9":
                setNamaBulan('September');
                break;
            case "10":
                setNamaBulan('Oktober');
                break;
            case "11":
                setNamaBulan('November');
                break;
            case "12":
                setNamaBulan('Desember');
                break;
            default:
                setNamaBulan('');
                break;
        }
    }
    const changeBulan = (e) => {
        setBulan(e.target.value);
        switchBulan(e.target.value);
    }
    const changeTahun = (e) => {
        setTahun(e.target.value);
    }
    const fetchData = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .get(`http://fiterbarber.api/api/keuangans/${bulan}/${tahun}`)
            .then(res => {
                setPemasukan(res.data.pemasukan);
                setPengeluaran(res.data.pengeluaran);
                setBon(res.data.bon);
                setSaldo(res.data.saldo);
            })
            .catch(error => {
                if (error.status === 404) {
                    console.log('Data tidak Ditemukan');
                }
            })
    }
    useEffect(() => {
        if(!token){
            history.push('/');
        }else{
            arrayTahun();
        }
    }, []);
    useEffect(() => {
        if(token){
            fetchData();
        }
    }, [bulan, tahun]);
    return (
        <Container>
            <Card className="shadow">
                <Card.Body>
                    <Row className="mb-4">
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label style={{ fontSize: "15px" }} className="font-weight-bold">Bulan : </Form.Label>
                                <Form.Control className="shadow" custom as="select" name="bulan" onChange={changeBulan}>
                                    <option value="0"> Pilih Bulan</option>
                                    <option value="1">Januari</option>
                                    <option value="2">Februari</option>
                                    <option value="3">Maret</option>
                                    <option value="4">April</option>
                                    <option value="5">Mei</option>
                                    <option value="6">Juni</option>
                                    <option value="7">Juli</option>
                                    <option value="8">Agustus</option>
                                    <option value="9">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label style={{ fontSize: "15px" }} className="font-weight-bold">Tahun : </Form.Label>
                                <Form.Control className="shadow" custom as="select"
                                    onChange={changeTahun}>
                                    <option value="0"> Tahun </option>
                                    {tahunIni.map((t) => (
                                        <option value={t.id} key={t.id}>{t.tahun}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Card className="card-stats shadow">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-single-02 text-secondary"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Total Pemasukan</p>
                                                <Card.Title as="h4"> {numberFormat(pemasukan)} </Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <hr></hr>
                                    <div className="stats">
                                        <i className="fas fa-redo mr-1"></i>
                                        {namaBulan} {tahun}
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="card-stats shadow">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-chart-bar-32 text-secondary"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Total Pengeluaran</p>
                                                <Card.Title as="h4"> {numberFormat(pengeluaran)} </Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <hr></hr>
                                    <div className="stats">
                                        <i className="fas fa-redo mr-1"></i>
                                        Total Bon : {numberFormat(bon)}
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="card-stats shadow">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-money-coins text-secondary"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Sisa Saldo</p>
                                                <Card.Title as="h4">{numberFormat(saldo)}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <hr></hr>
                                    <div className="stats">
                                        <i className="fas fa-redo mr-1"></i>
                                        Total
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Keuangan
