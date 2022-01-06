import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
const TambahPemasukan = () => {
    const [pegawais, setPegawais] = useState([]);
    const [options, setOptions] = useState([]);
    const [optionsKeterangan, setOptionsKeterangan] = useState([]);
    const [tanggal, setTanggal] = useState(
        Moment(new Date()).format('YYYY-MM-DD')
    );
    const [tanggalSimpan, setTanggalSimpan] = useState(
        Moment(new Date()).format('YYYY-MM-DD')
    );
    const [keterangans, setKeterangans] = useState([]);
    const [jumlah, setJumlah] = useState(0);
    const [harga, setHarga] = useState(0);
    const [vocer, setVocer] = useState(0);
    const [total, setTotal] = useState(0);
    const fetchPegawai = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/pegawais")
            .then(res => {
                const options = res.data.pegawais;
                setOptions(options);
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
                const optionsKeterangan = res.data.keterangans;
                setOptionsKeterangan(optionsKeterangan);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const fetchHarga = async () => {
        const id = Number(keterangans);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/keterangans/" + id)
            .then(res => {
                const keterangan = res.data.keterangans;
                if (keterangan) {
                    setHarga(keterangan.harga);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    const fetchTotal = () => {
        if (keterangans) {
            const cektotal = Number(jumlah) * Number(harga);
            setTotal(cektotal);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            tanggal: tanggal,
            pegawai_id: Number(pegawais),
            keterangan_id: Number(keterangans),
            jumlah: jumlah,
            harga: harga,
            total: total,
            vocer: vocer,
            tanggalsimpan: tanggalSimpan,
            komentar: '',
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/pemasukans", data)
            .then(res => {
                swal({
                    title: "Sukses Simpan",
                    text: res.data.messages,
                    icon: "success",
                    button: false,
                    timer: 3000,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchPegawai();
        fetchKeterangan();
    }, [])
    useEffect(() => {
        fetchHarga();
        fetchTotal();
    }, [jumlah, keterangans, harga])
    return (
        <Container fluid>
            <Row>
                <Col md="8">
                    <Card>
                        <Card.Header className="bg-secondary">
                            <Card.Title as="h4" className="mb-2 text-center text-white">
                                Input Pemasukan
                            </Card.Title>
                        </Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Card.Body>
                                <Row>
                                    <Col md="4">
                                        <Form.Group>
                                            <Form.Label>Tanggal</Form.Label>
                                            <Form.Control type="date" placeholder="Tanggal" name="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} autoFocus/>
                                        </Form.Group>
                                    </Col>
                                    <Col md="4">
                                        <Form.Group>
                                            <Form.Label>Pegawai</Form.Label>
                                            <Form.Control as="select" custom name="pegawai_id" onChange={(e) => setPegawais(e.target.value)}>
                                                <option value="">Pilih Pegawai</option>
                                                {options.map((pegawai) => (
                                                    <option key={pegawai.id} value={pegawai.id}>{pegawai.nama}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md="4">
                                        <Form.Group>
                                            <Form.Label>Keterangan</Form.Label>
                                            <Form.Control as="select" custom name="keterangan_id" onChange={(e) => setKeterangans(e.target.value)}>
                                                <option value="">Pilih Keterangan</option>
                                                {optionsKeterangan.map((keterangan) => (
                                                    <option key={keterangan.id} value={keterangan.id}>{keterangan.namaket}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Form.Group>
                                            <Form.Label>Jumlah</Form.Label>
                                            <Form.Control type="number" name="jumlah" onChange={(e) => setJumlah(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md="4">
                                        <Form.Group>
                                            <Form.Label>Vocer</Form.Label>
                                            <Form.Control type="number" name="vocer" onChange={(e) => setVocer(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md="4">
                                        <Form.Group>
                                            <Form.Label>Harga</Form.Label>
                                            <Form.Control type="number" name="harga" value={harga} onChange={(e) => setHarga(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 4, offset: 8 }}>
                                        <Form.Group>
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control type="number" name="total" value={total} onChange={(e) => setTotal(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="text-right">
                                    <Button variant="dark" size="md" className="my-1 btn-fill" type="submit">Input</Button>
                                </Form.Group>
                            </Card.Body>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default TambahPemasukan
