import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
import { numberFormat } from 'components/Helpers/Helpers';
const Laporan = () => {
    const token = localStorage.getItem('token');
    const [bulan, setBulan] = useState(0);
    const [namaBulan, setNamaBulan] = useState('');
    const [tahun, setTahun] = useState(0);
    const [pegawai, setPegawai] = useState(0);
    const [namaPegawai, setNamaPegawai] = useState('');
    const [optionsPegawai, setOptionsPegawai] = useState([]);
    const [keterangan, setKeterangan] = useState(1);
    const [optionsKeterangan, setOptionsKeterangan] = useState([]);
    const [libur, setLibur] = useState(0);
    const [jumlah, setJumlah] = useState(0);
    const [totalJumlah, setTotalJumlah] = useState(0);
    const [vocer, setVocer] = useState(0);
    const [bon, setBon] = useState(0);
    const [totalPemasukan, setTotalPemasukan] = useState(0);
    const [tahunIni, setTahunIni] = useState([]);
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
    const changePegawai = (e) => {
        setPegawai(e.target.value);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
        .get(`http://fiterbarber.api/api/pegawais/${e.target.value}`)
        .then(res => {
            setNamaPegawai(res.data.pegawais.nama);
        })
        .catch(error => {
        })
    }
    const fetchData = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .get(`http://fiterbarber.api/api/pemasukans/${pegawai}/${bulan}/${tahun}/${keterangan}`)
            .then(res => {
                setLibur(res.data.libur);
                setBon(res.data.bon);
                setTotalPemasukan(res.data.pemasukan);
                setJumlah(res.data.jumlah);
                setTotalJumlah(res.data.totaljumlah);
                setVocer(res.data.vocer);
            })
            .catch(error => {
                if (error.status === 404) {
                    console.log('Data tidak Ditemukan');
                }
            })
    }
    const fetchPegawai = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/pegawais")
            .then(res => {
                const options = res.data.pegawais;
                setOptionsPegawai(options);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const fetchKeterangan = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/keterangans")
            .then(res => {
                const options = res.data.keterangans;
                setOptionsKeterangan(options);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handlePrint = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
        .get(`http://fiterbarber.api/api/print/${pegawai}/${bulan}/${tahun}`)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        if (!token) {
            history.push('/');
        }else{
            fetchPegawai();
            fetchKeterangan();
            arrayTahun();
        }
    }, []);
    useEffect(() => {
        if(token){
            fetchData();
        }
    }, [bulan, tahun, pegawai, keterangan]);
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
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label style={{ fontSize: "15px" }} className="font-weight-bold">Pegawai : </Form.Label>
                                <Form.Control className="shadow" custom as="select" 
                                name="pegawai_id"
                                onChange={changePegawai}>
                                    <option value="0"> Pilih Pegawai</option>
                                    {
                                        optionsPegawai.map((p) => (
                                            <option value={p.id} key={p.id} >{p.nama}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label style={{ fontSize: "15px" }} className="font-weight-bold">Keterangan : </Form.Label>
                                <Form.Control className="shadow" custom as="select" 
                                name="keterangan_id"
                                onChange={(e) => setKeterangan(e.target.value)}>
                                    <option value="0"> Pilih Keterangan </option>
                                    {
                                        optionsKeterangan.map((k) => (
                                            <option value={k.id} key={k.id}>{k.namaket}</option>
                                        ))
                                    }
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
                                                <p className="card-category">{namaBulan}  {tahun}</p>
                                                <Card.Title as="h4"> {namaPegawai} </Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <hr></hr>
                                    <div className="stats">
                                        <i className="fas fa-redo mr-1"></i>
                                        Total Libur : {libur}
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
                                                <p className="card-category">Jumlah Potong</p>
                                                <Card.Title as="h4"> {jumlah} </Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <hr></hr>
                                    <div className="stats">
                                        <i className="fas fa-redo mr-1"></i>
                                        Vocer : {vocer} Total : {totalJumlah}
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
                                                <p className="card-category">Total Pemasukan</p>
                                                <Card.Title as="h4">{numberFormat(totalPemasukan)}</Card.Title>
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
                    </Row>
                    <Row>
                        <Col className="text-right">
                        <Button variant="dark" className="font-weight-bold"><i className="nc-icon nc-layers-3 font-weight-bold" onClick={handlePrint}></i> Print</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Laporan

