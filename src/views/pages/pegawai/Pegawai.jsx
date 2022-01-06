import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import TambahPegawai from './TambahPegawai';
import { useHistory } from 'react-router';
const Pegawai = () => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [clearE, setClearE] = useState(0);
    const [count, setCount] = useState(1);
    const [handleEdit, setHandleEdit] = useState(0);
    const handleCloseLoading = () => setShowLoading(false);
    const history = useHistory();
    const [data, setData] = useState({
        columns: [
            {
                label: '#',
                field: 'id',
            },
            {
                label: 'Nama',
                field: 'nama',
                sort: 'asc'
            },
            {
                label: 'Tempat',
                field: 'tempat',
            },
            {
                label: 'Aksi',
                field: 'aksi',
            }
        ],
        rows: []
    })
    const handleSubmit = (e, nama, tempat) => {
        e.preventDefault();
        const data = {
            nama: nama,
            tempat: tempat,
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/pegawais", data)
            .then(res => {
                swal({
                    title: "Sukses Simpan",
                    text: res.data.messages + " " + nama,
                    icon: "success",
                    button: false,
                    timer: 3000,
                });
                setCount(count + 1);
                setHandleEdit(0);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleUpdate = (e, id, nama, tempat) => {
        e.preventDefault();
        const data = {
            id: id,
            nama: nama,
            tempat: tempat,
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios
            .post("http://fiterbarber.api/api/pegawais/" + id, data)
            .then(res => {
                swal({
                    title: "Sukses Update Data",
                    text: res.data.messages + " " + nama,
                    icon: "success",
                    button: false,
                    timer: 3000,
                })
                    .then(ress => {
                        setClearE(1);
                    });
                setCount(count + 1);
                setHandleEdit(0);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .get("http://fiterbarber.api/api/pegawais")
            .then(res => {
                const pegawaiss = res.data.pegawais;
                setIsLoading(false);
                setShowLoading(false);
                setData({
                    columns: [
                        {
                            label: '#',
                            field: 'id',
                        },
                        {
                            label: 'Nama',
                            field: 'nama',
                            sort: 'asc'
                        },
                        {
                            label: 'Tempat',
                            field: 'tempat',
                        },
                        {
                            label: 'Aksi',
                            field: 'aksi',
                        }
                    ],
                    rows: pegawaiss.map((pegawai, index) => {
                        return (
                            {
                                id: index + 1,
                                nama: pegawai.nama,
                                tempat: pegawai.tempat,
                                aksi:
                                    <Row className="mx-1">
                                        <Button
                                            variant="info"
                                            type="button"
                                            size="xs"
                                            className="mx-1"
                                            onClick={() => isEdit(pegawai.id)}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            type="button"
                                            size="xs"
                                            className="mx-1 btn-fill"
                                            onClick={() => handleDelete(pegawai.id)}
                                        >
                                            <i className="fa fa-times"></i>
                                        </Button>
                                    </Row>
                            })
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
            .then(async (terdelete) => {
                if (terdelete) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    await axios
                        .delete("http://fiterbarber.api/api/pegawais/" + id)
                        .then(res => {
                            swal({
                                title: "Sukses Hapus",
                                text: "Sukses Hapus Data Pegawai ",
                                icon: "error",
                                button: false,
                                timer: 1000,
                            });
                            setHandleEdit(0);
                            setCount(count + 1);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
    }
    const isEdit = (id) => {
        setHandleEdit(id);
        setShowForm(true);
    }
    const handleShow = () => {
        setShowForm(true);
    }
    const handleClose = () => {
        setShowForm(false);
    }
    const clearS = () => {
        setShowForm(false);
        setHandleEdit(0);
        setClearE(0);
    }
    useEffect(() => {
        if(!token){
            history.push('/');
        }else{
            fetchData();
        }
    }, [count])
    return (
        <Row className="mb-4">
            <Col md="7">
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">Daftar Nama Pegawai</Card.Title>
                        <p className="card-category">
                            Fiter Barber : Ngampel, Karangayu, Puguh
                        </p>
                        <Button variant="dark" href="#" size="md" className="my-1 btn-fill" onClick={
                            showForm ? handleClose : handleShow}
                        >{showForm ? 'Close' : 'Add'}</Button>
                    </Card.Header>
                    <Card.Body>
                        {isLoading ?
                            <Modal show={showLoading} className="md" onHide={handleCloseLoading}>
                                <Modal.Body className="text-center">
                                    <img src="../images/loading1.gif" className="img img-fluid" />
                                </Modal.Body>
                            </Modal>
                            :
                            <MDBDataTable striped bordered hover data={data} />
                        }
                    </Card.Body>
                </Card>
            </Col>
            {showForm ?
                <TambahPegawai
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleUpdate={handleUpdate}
                    clearS={clearS}
                    clearE={clearE}
                    key={count}
                /> : null
            }
        </Row>
    )
}

export default Pegawai
