import axios from 'axios';
import Moment from 'moment';
import swal from 'sweetalert';
import { MDBDataTable } from 'mdbreact';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Container, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
const Libur = () => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const history = useHistory();
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
                label: 'Nama',
                field: 'nama',
            },
            {
                label: 'Keterangan',
                field: 'keterangan',
            },
            {
                label: 'Jumlah',
                field: 'jumlah',
            },
            {
                label: 'Aksi',
                field: 'aksi',
            }
        ],
        rows: []
    });
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/liburs")
            .then(res => {
                const liburss = res.data.liburs;
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
                            label: 'Nama',
                            field: 'nama',
                        },
                        {
                            label: 'Keterangan',
                            field: 'keterangan',
                        },
                        {
                            label: 'Jumlah',
                            field: 'jumlah',
                        },
                        {
                            label: 'Aksi',
                            field: 'aksi',
                        }
                    ],
                    rows: liburss.map((libur, index) => {
                        return (
                            {
                                id: index + 1,
                                tanggal: Moment(libur.tanggal).format("dddd, DD MMM YYYY"),
                                nama: libur.pegawai.nama,
                                keterangan: libur.keterangan,
                                jumlah: libur.jumlah,
                                aksi: <Row className="mx-1">
                                    <Button
                                        variant="info"
                                        type="button"
                                        size="xs"
                                        className="mx-1"
                                        onClick={() => handleEdit(libur.id)}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        type="button"
                                        size="xs"
                                        className="mx-1 btn-fill"
                                        onClick={() => handleDelete(libur.id)}
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
                        .delete("http://fiterbarber.api/api/liburs/" + id)
                        .then(res => {
                            swal({
                                title: "Sukses Hapus",
                                text: res.data.messages,
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
    // Untuk Modal
    const [isEdit, setIsEdit] = useState(0);
    const [isEditp, setIsEditp] = useState(0);
    const [options, setOptions] = useState([]);
    const [tanggal, setTanggal] = useState(
        Moment(new Date()).format('YYYY-MM-DD')
    );
    const [id, setId] = useState(0);
    const [pegawai, setPegawai] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [jumlah, setJumlah] = useState(0);
    const clearS = () => {
        setIsEdit(0);
        setIsEditp(0);
        setTanggal(Moment(new Date()).format('YYYY-MM-DD'));
        setId(0);
        setPegawai('');
        setKeterangan('');
        setJumlah(0);
    }
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
    const fetchEdit = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/liburs/" + id)
            .then(res => {
                const libur = res.data.libur;
                setTanggal(libur.tanggal);
                setPegawai(libur.pegawai_id);
                setKeterangan(libur.keterangan);
                setJumlah(libur.jumlah);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleEdit = (id) => {
        handleShow();
        setId(id);
        setIsEdit(id);
        setIsEditp(id);
        fetchEdit(id);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            tanggal: tanggal,
            pegawai_id: Number(pegawai),
            keterangan: keterangan,
            jumlah: jumlah,
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/liburs", data)
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
            pegawai_id: Number(pegawai),
            keterangan: keterangan,
            jumlah: jumlah,
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/liburs/" + id, data)
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
        if (token) {
            fetchPegawai();
        }
    }, [])
    useEffect(() => {
        if (!token) {
            history.push('/');
        } else {
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
                                    <Card.Title as="h4">Jumlah Libur Pegawai</Card.Title>
                                    <p className="card-category">
                                        Fiter Barber : Ngampel, Karangayu, Puguh
                                    </p>
                                    <Button variant="dark" href="#" size="md" className="ml-2 my-1 btn-fill" onClick={handleShow}>Input Data Libur</Button>
                                </Card.Header>
                                <Card.Body>
                                    <MDBDataTable striped bordered hover data={data} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Modal size="md" show={show} onHide={handleClose}>
                            <Form
                                onSubmit={
                                    isEdit ?
                                        handleUpdate
                                        :
                                        handleSubmit
                                }>
                                <Modal.Header closeButton className="bg-secondary text-white">
                                    <Modal.Title>Input Libur Pegawai</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Container>
                                        <Row>
                                            <Col md="6">
                                                <Form.Group>
                                                    <Form.Label>Tanggal</Form.Label>
                                                    <Form.Control type="hidden" placeholder="Nama" name="id" onChange={(e) => setId(e.target.value)} value={id} />
                                                    <Form.Control className="shadow" type="date" placeholder="Tanggal" name="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col md="6">
                                                <Form.Group>
                                                    <Form.Label>Pegawai</Form.Label>
                                                    <Form.Control className="shadow" as="select" custom name="pegawai_id" onChange={(e) => setPegawai(e.target.value)} onMouseDown={() => setIsEditp(0)}>
                                                        {isEditp ?
                                                            options.filter(peg => peg.id === pegawai).map((peg) => (
                                                                <option key={peg.id} value={peg.id}>{peg.nama}</option>
                                                            ))
                                                            :
                                                            <>
                                                                <option value="">Pilih Pegawai</option>
                                                                {options.map((pegawai) => (
                                                                    <option key={pegawai.id} value={pegawai.id}>{pegawai.nama}</option>
                                                                ))}
                                                            </>
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <Form.Group>
                                                    <Form.Label>Jumlah</Form.Label>
                                                    <Form.Control className="shadow" type="number" name="jumlah" onChange={(e) => setJumlah(e.target.value)} value={jumlah} />
                                                </Form.Group>
                                            </Col>
                                            <Col md="6">
                                                <Form.Group>
                                                    <Form.Label>Keterangan</Form.Label>
                                                    <Form.Control className="shadow" type="text" name="keterangan" onChange={(e) => setKeterangan(e.target.value)} value={keterangan} />
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
                    </Row>
            }
        </>
    )
}

export default Libur
