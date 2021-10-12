import React, { Component } from 'react'

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        pegawais: []
    }
}
  // async componentDidMount() {
  //   const res = await axios.get("http://fiterbarber.nett/api/pegawais");
  //   if (res.data.status === 200) {
  //     this.setState({
  //       pegawais: res.data.pegawais
  //     });
  //   }
  // }
  componentDidMount() {
    axios
      .get("http://fiterbarber.nett/api/pegawais")
      .then(res => {
        const pegawais = res.data.pegawais;
        this.setState({ pegawais:pegawais });
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    const { pegawais } = this.state
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nama</th>
                      <th className="border-0">Tempat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pegawais && pegawais.map((pegawai) => (
                      <tr key={pegawai.id}>
                        <td>{pegawai.id}</td>
                        <td>{pegawai.nama}</td>
                        <td>{pegawai.tempat}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}
