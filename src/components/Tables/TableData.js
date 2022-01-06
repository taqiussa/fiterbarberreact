import React, { Component } from 'react'
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

export class TableData extends Component {
    state = {
        pegawais: [],
        tableRows: [],
        isLoading: true,
    }
    componentDidMount() {
        axios
            .get("http://fiterbarber.nett/api/pegawais")
            .then(res => {
                const pegawais = res.data.pegawais;
                this.setState({ pegawais: pegawais });
            })
            .then(async() => {
                this.setState({ tableRows:this.assemblePegawais(), isLoading: false})
            })
            .catch(error => {
                console.log(error);
            });
    }
    assemblePegawais = () => {
        let pegawais = this.state.pegawais.map((pegawai) => {
            return (
                {
                    id: pegawai.id,
                    nama: pegawai.nama,
                    tempat: pegawai.tempat
                }
            )
        });

        return pegawais;
    }
    render() {
        const data = {
            columns: [
                {
                    label: '#',
                    field: 'id',
                },
                {
                    label: 'Nama',
                    field: 'nama',
                },
                {
                    label: 'Tempat',
                    field: 'tempat',
                }
            ],
            rows:this.state.tableRows
        }
        return (
            <Row className="mb-4">
                <Col md="12">
                    <Card>
                        <Card.Body>
                            <MDBDataTable  striped bordered hover data={data} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default TableData
