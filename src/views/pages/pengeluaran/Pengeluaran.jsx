import axios from 'axios';
import Moment from 'moment';
import swal from 'sweetalert';
import { MDBDataTable } from 'mdbreact';
import { useEffect, useState } from 'react';
import { numberFormat } from 'components/Helpers/Helpers';
import { Card, Col, Row, Button, Container, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
const Pengeluaran = () => {
    // Untuk Table pengeluaran
    // const history = useHistory();
    const token = localStorage.getItem('token');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        clearS();
    };
    const handleShow = () => setShow(true);
    const [data, setData] = useState({
        columns: [
            {
                label: '#',
                field: 'id',
            },
            {
                label: 'Tanggal',
                field: 'tanggal',
                sort: 'asc'
            },
            {
                label: 'Keterangan',
                field: 'keterangan',
            },
            {
                label: 'Total',
                field: 'total',
            },
            {
                label: 'Aksi',
                field: 'aksi',
            }
        ],
        rows: []
    });
    const handleDelete = (id) => {
        swal({
            title: "Hapus Data ?",
            text: "Anda Yakin Menghapus Data Ini ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((terdelete) => {
                if (terdelete) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    axios
                        .delete("http://fiterbarber.api/api/pengeluarans/" + id)
                        .then(res => {
                            swal({
                                title: "Sukses Hapus",
                                text: "Sukses Hapus Data pengeluaran ",
                                icon: "error",
                                button: false,
                                timer: 1000,
                            });
                            setCount(count + 1);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
    }
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/pengeluarans")
            .then(res => {
                const pengeluaranss = res.data.pengeluarans;
                setIsLoading(false);
                setData({
                    columns: [
                        {
                            label: '#',
                            field: 'id',
                        },
                        {
                            label: 'Tanggal',
                            field: 'tanggal',
                            sort: 'asc'
                        },
                        {
                            label: 'Keterangan',
                            field: 'keterangan',
                        },
                        {
                            label: 'Total',
                            field: 'total',
                        },
                        {
                            label: 'Aksi',
                            field: 'aksi',
                        }
                    ],
                    rows: pengeluaranss.map((pengeluaran, index) => {
                        return (
                            {
                                id: index + 1,
                                tanggal: Moment(pengeluaran.tanggal).format("dddd, DD MMM YYYY"),
                                keterangan: pengeluaran.keterangan,
                                total: numberFormat(pengeluaran.total),
                                aksi: <Row className="mx-1">
                                    <Button
                                        variant="info"
                                        type="button"
                                        size="xs"
                                        className="mx-1"
                                        onClick={() => handleEdit(pengeluaran.id)}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        type="button"
                                        size="xs"
                                        className="mx-1 btn-fill"
                                        onClick={() => handleDelete(pengeluaran.id)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </Button>
                                </Row>
                            });
                    }),
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    // Untuk Modal
    const [isEdit, setIsEdit] = useState(0);
    const [tanggal, setTanggal] = useState(
        Moment(new Date()).format('YYYY-MM-DD')
    );
    const [id, setId] = useState(0);
    const [keterangan, setKeterangan] = useState('');
    const [total, setTotal] = useState(0);
    const clearS = () => {
        setIsEdit(0);
        setTanggal(Moment(new Date()).format('YYYY-MM-DD'));
        setId(0);
        setKeterangan('');
        setTotal(0);
    }
    const fetchEdit = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/pengeluarans/" + id)
            .then(res => {
                const pengeluaran = res.data.pengeluaran;
                setTanggal(pengeluaran.tanggal);
                setKeterangan(pengeluaran.keterangan);
                setTotal(pengeluaran.total);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleEdit = (id) => {
        handleShow();
        setId(id);
        setIsEdit(id);
        fetchEdit(id);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            tanggal: tanggal,
            keterangan: keterangan,
            total: total,
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/pengeluarans", data)
            .then(res => {
                swal({
                    title: "Sukses Simpan",
                    text: res.data.messages,
                    icon: "success",
                    button: false,
                    timer: 3000,
                });
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            tanggal: tanggal,
            keterangan: keterangan,
            total: total,
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/pengeluarans/" + id, data)
            .then(res => {
                swal({
                    title: "Sukses Update",
                    text: res.data.messages,
                    icon: "success",
                    button: false,
                    timer: 3000,
                });
                setCount(count + 1);
                handleClose();
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (!token) {
            history.push('/');
        }
    }, [])
    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [count]);
    return (
        <>
            {
                isLoading ?
                    <Row>
                        <Col md="12" className="text-center centered">
                            <img src="../images/loading4.gif" className="img img-fluid" />
                        </Col>
                    </Row>
                    :
                    <Row className="mb-4">
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Rekap Pengeluaran</Card.Title>
                                    <p className="card-category">
                                        Fiter Barber : Ngampel, Karangayu, Puguh
                                    </p>
                                    <Button variant="dark" href="#" size="md" className="ml-2 my-1 btn-fill" onClick={handleShow}>Input Data</Button>
                                </Card.Header>
                                <Card.Body>
                                    <MDBDataTable striped bordered hover data={data} responsive />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Modal size="lg" show={show} onHide={handleClose}>
                            <Form
                                onSubmit={
                                    isEdit ?
                                        handleUpdate
                                        :
                                        handleSubmit
                                }>
                                <Modal.Header closeButton className="bg-secondary text-white">
                                    <Modal.Title>Input Pengeluaran</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Container>
                                        <Row>
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Tanggal</Form.Label>
                                                    <Form.Control type="hidden" placeholder="Nama" name="id" onChange={(e) => setId(e.target.value)} value={id} />
                                                    <Form.Control className="shadow" type="date" placeholder="Tanggal" name="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Keterangan</Form.Label>
                                                    <Form.Control className="shadow" type="text" name="keterangan" onChange={(e) => setKeterangan(e.target.value)} value={keterangan} />
                                                </Form.Group>
                                            </Col>
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Total</Form.Label>
                                                    <Form.Control className="shadow" type="number" name="total" value={total} onChange={(e) => setTotal(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="dark" className="btn-fill" type="submit">
                                        {isEdit
                                            ? 'Update'
                                            : 'Save'
                                        }
                                    </Button>
                                    <Button variant="dark" onClick={handleClose} className="shadow">
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    </Row >
            }
        </>
    )
}

export default Pengeluaran
