import axios from 'axios';
import Moment from 'moment';
import swal from 'sweetalert';
import { MDBDataTable } from 'mdbreact';
import { useEffect, useState } from 'react';
import { numberFormat } from 'components/Helpers/Helpers';
import { Card, Col, Row, Button, Container, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
const PemasukanBackup = () => {
    // Untuk Table Pemasukan
    // const history = useHistory();
    const token = sessionStorage.getItem('token');
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
                label: 'Vocer',
                field: 'vocer',
            },
            {
                label: 'Total',
                field: 'total',
            },
            {
                label: 'Tanggal Input',
                field: 'created_at',
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
                        .delete("http://fiterbarber.api/api/pemasukans/" + id)
                        .then(res => {
                            swal({
                                title: "Sukses Hapus",
                                text: "Sukses Hapus Data pemasukan ",
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
            .get("http://fiterbarber.api/api/pemasukans")
            .then(res => {
                const pemasukanss = res.data.pemasukans;
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
                            label: 'Vocer',
                            field: 'vocer',
                        },
                        {
                            label: 'Total',
                            field: 'total',
                        },
                        {
                            label: 'Tanggal Input',
                            field: 'created_at',
                        },
                        {
                            label: 'Aksi',
                            field: 'aksi',
                        }
                    ],
                    rows: pemasukanss.map((pemasukan, index) => {
                        return (
                            {
                                id: index + 1,
                                tanggal: Moment(pemasukan.tanggal).format("dddd, DD MMM YYYY"),
                                nama: pemasukan.pegawai.nama,
                                keterangan: pemasukan.keterangan.namaket,
                                jumlah: pemasukan.jumlah,
                                vocer: pemasukan.vocer,
                                total: numberFormat(pemasukan.total),
                                created_at: Moment(pemasukan.created_at).format('DD MMM YYYY.HH:mm:ss'),
                                aksi: <Row className="mx-1">
                                    <Button
                                        variant="info"
                                        type="button"
                                        size="xs"
                                        className="mx-1"
                                        onClick={() => handleEdit(pemasukan.id)}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        type="button"
                                        size="xs"
                                        className="mx-1 btn-fill"
                                        onClick={() => handleDelete(pemasukan.id)}
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
    const [isEditp, setIsEditp] = useState(0);
    const [isEditk, setIsEditk] = useState(0);
    const [options, setOptions] = useState([]);
    const [optionsKeterangan, setOptionsKeterangan] = useState([]);
    const [tanggal, setTanggal] = useState(
        Moment(new Date()).format('YYYY-MM-DD')
    );
    const [tanggalSimpan, setTanggalSimpan] = useState(
        Moment(new Date()).format('YYYY-MM-DD')
    );
    const [id, setId] = useState(0);
    const [pegawai, setPegawai] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [jumlah, setJumlah] = useState(0);
    const [harga, setHarga] = useState(0);
    const [vocer, setVocer] = useState(0);
    const [total, setTotal] = useState(0);
    const clearS = () => {
        setIsEdit(0);
        setIsEditk(0);
        setIsEditp(0);
        setTanggal(Moment(new Date()).format('YYYY-MM-DD'));
        setTanggalSimpan(Moment(new Date()).format('YYYY-MM-DD'));
        setId(0);
        setPegawai('');
        setKeterangan('');
        setJumlah(0);
        setHarga(0);
        setVocer(0);
        setTotal(0);
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
        const ket = Number(keterangan);
        const peg = Number(pegawai);
        if (ket === 1) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await axios
                .get(`http://fiterbarber.api/api/harga/${peg}/${ket}`)
                .then(res => {
                    const k = res.data.harga;
                    if (k) {
                        setHarga(k.harga);
                    } else {
                        setHarga(0);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await axios
                .get("http://fiterbarber.api/api/keterangans/" + ket)
                .then(res => {
                    const k = res.data.keterangans;
                    if (k) {
                        setHarga(k.harga);
                    } else {
                        setHarga(0);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    const fetchTotal = () => {
        if (keterangan) {
            const cek = Number(pegawai);
            if (cek === 1) {
                const totalvocer = harga * vocer;
                const totalharga = jumlah * harga;
                const totalfendi = totalharga - totalvocer;
                setTotal(totalfendi);
            }else{
                const cektotal = Number(jumlah) * Number(harga);
                setTotal(cektotal);
            }
        }
    }
    const fetchEdit = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/pemasukans/" + id)
            .then(res => {
                const pemasukan = res.data.pemasukan;
                setTanggal(pemasukan.tanggal);
                setPegawai(pemasukan.pegawai_id);
                setKeterangan(pemasukan.keterangan_id);
                setJumlah(pemasukan.jumlah);
                setVocer(pemasukan.vocer)
                setHarga(pemasukan.harga);
                setTotal(pemasukan.total);
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
        setIsEditk(id);
        fetchEdit(id);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            tanggal: tanggal,
            pegawai_id: Number(pegawai),
            keterangan_id: Number(keterangan),
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
            keterangan_id: Number(keterangan),
            jumlah: jumlah,
            harga: harga,
            total: total,
            vocer: vocer,
            tanggalsimpan: tanggalSimpan,
            komentar: '',
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/pemasukans/" + id, data)
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
        } else {
            fetchPegawai();
            fetchKeterangan();
        }
    }, [])
    useEffect(() => {
        if (token) {
            fetchHarga();
            fetchTotal();
        }
    }, [pegawai, jumlah, keterangan, harga, vocer])
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
                                    <Card.Title as="h4">Rekap Pemasukan</Card.Title>
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
                                    <Modal.Title>Input Pemasukan</Modal.Title>
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
                                            <Col md="4">
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
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Keterangan</Form.Label>
                                                    <Form.Control className="shadow" as="select" custom name="keterangan_id" onChange={(e) => setKeterangan(e.target.value)} onMouseDown={() => setIsEditk(0)}>
                                                        {isEditk ?
                                                            optionsKeterangan.filter(ket => ket.id === keterangan).map((ket) => (
                                                                <option key={ket.id} value={ket.id}>{ket.namaket}</option>
                                                            ))
                                                            :
                                                            <>
                                                                <option value=""> Pilih Keterangan </option>
                                                                {optionsKeterangan.map((ket) => (
                                                                    <option key={ket.id} value={ket.id}>{ket.namaket}</option>
                                                                ))}
                                                            </>
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Jumlah</Form.Label>
                                                    <Form.Control className="shadow" type="number" name="jumlah" onChange={(e) => setJumlah(e.target.value)} value={jumlah} />
                                                </Form.Group>
                                            </Col>
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Vocer</Form.Label>
                                                    <Form.Control className="shadow" type="number" name="vocer" onChange={(e) => setVocer(e.target.value)} value={vocer} />
                                                </Form.Group>
                                            </Col>
                                            <Col md="4">
                                                <Form.Group>
                                                    <Form.Label>Harga</Form.Label>
                                                    <Form.Control className="shadow" type="number" name="harga" value={harga} onChange={(e) => setHarga(e.target.value)} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ span: 4, offset: 8 }}>
                                                <Form.Group>
                                                    <Form.Label>Total</Form.Label>
                                                    <Form.Control className="shadow" type="number" name="total" value={total} onChange={(e) => setTotal(e.target.value)} readOnly />
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

export default PemasukanBackup
