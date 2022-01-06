import { Card, Col, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TambahPegawai = ({ handleSubmit, handleEdit, handleUpdate, clearS, clearE }) => {
    const token = localStorage.getItem('token');
    const [nama, setNama] = useState('');
    const [tempat, setTempat] = useState('');
    const [id, setId] = useState('');
    const fetchData = () => {
        if (handleEdit) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios
                .get("http://fiterbarber.api/api/pegawais/" + handleEdit)
                .then(res => {
                    const pegawai = res.data.pegawais;
                    setId(pegawai.id);
                    setNama(pegawai.nama);
                    setTempat(pegawai.tempat);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    const clearState = () => {
        setNama('');
        setTempat('');
        setId('');
        clearS();
    }
    useEffect(() => {
        fetchData();
        if (clearE) {
            clearState();
        }
    }, [handleEdit, clearE])
    return (
        <Col md="5">
            <Card>
                <Card.Header className="bg-secondary">
                    <Card.Title as="h4" className="mb-2 text-center text-white">
                        Tambah Pegawai
                    </Card.Title>
                </Card.Header>
                <Form >
                    <Card.Body>
                        <Form.Group
                            onSubmit=
                            {handleEdit ?
                                (e) => handleUpdate(e, id, nama, tempat) :
                                (e) => handleSubmit(e, nama, tempat)
                            }
                        >
                            <Form.Control type="hidden" placeholder="Nama" name="id" onChange={(e) => setId(e.target.value)} value={id} />
                            <Form.Control type="text" placeholder="Nama" name="nama" onChange={(e) => setNama(e.target.value)} value={nama} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Tempat" name="tempat" onChange={(e) => setTempat(e.target.value)} value={tempat} />
                        </Form.Group>
                        <Form.Group className="text-right">
                            <Button variant="dark" size="md" className="mr-1 btn-fill" type="submit"
                                onClick=
                                {handleEdit ?
                                    (e) => handleUpdate(e, id, nama, tempat) :
                                    (e) => handleSubmit(e, nama, tempat)
                                }
                            >
                                {handleEdit ? 'Update' : 'Save'}
                            </Button>
                                <Button variant="dark" size="md" className="ml-1" onClick={clearState}>
                                    Cancel
                                </Button>
                        </Form.Group>
                    </Card.Body>
                </Form>
            </Card>
        </Col>
    )
}

export default TambahPegawai
