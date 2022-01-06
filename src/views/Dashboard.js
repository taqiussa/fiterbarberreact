import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";
import { numberFormat } from 'components/Helpers/Helpers';
import Moment from 'moment';
function Dashboard() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [bulan, setBulan] = useState(
    Moment(new Date()).format('MMMM')
  );
  const[tahun, setTahun] = useState(
    Moment(new Date()).format('YYYY')
  );
  const [fendi, setFendi] = useState([]);
  const [bayu, setBayu] = useState([]);
  const [budi, setBudi] = useState([]);
  const [fendiGraph, setFendiGraph] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [bayuGraph, setBayuGraph] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [budiGraph, setBudiGraph] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [total, setTotal] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const checkToken = () => {
    console.log(token);
  }
  const fetchGraph = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios
      .get(`http://fiterbarber.api/api/pemasukans/graph`)
      .then(res => {
        setFendiGraph(res.data.fendi);
        setBayuGraph(res.data.bayu);
        setBudiGraph(res.data.budi);
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('Data tidak Ditemukan');
        }
      })
  }
  const fetchData = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios
      .get(`http://fiterbarber.api/api/keuangans`)
      .then(res => {
        setIsLoading(false);
        setFendi(res.data.fendi);
        setBayu(res.data.bayu);
        setBudi(res.data.budi);
        setTotal(res.data.total);
        setTotalPengeluaran(res.data.totalpengeluaran);
        setSaldo(res.data.saldo);
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('Data tidak Ditemukan');
        }
      })
  }
  useEffect(() => {
    fetchGraph();
  }, [isLoading]);
  useEffect(() => {
    if (!token) {
      history.push('/');
    } else {
      fetchData();
    }
  }, []);
  return (
    <>
      {
        isLoading ?
          <Container fluid>
            <Row>
              <Col md="12" className="text-center centered">
                <img src="../images/loading4.gif" className="img img-fluid" />
              </Col>
            </Row>
          </Container>
          :
          <Container fluid>
            <Row>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-info"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Fendi</p>
                          <Card.Title as="h4">
                            P. &nbsp;
                            {fendi.reduce((prev, next) => {
                              return prev + next.jumlah;
                            }, 0)} &nbsp;
                            V. &nbsp;
                            {fendi.reduce((prev, next) => {
                              return prev + next.vocer;
                            }, 0)}
                          </Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      {numberFormat(fendi.reduce((prev, next) => {
                        return prev + next.total;
                      }, 0))}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-danger"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Bayu</p>
                          <Card.Title as="h4">
                            P. &nbsp;
                            {bayu.reduce((prev, next) => {
                              return prev + next.jumlah;
                            }, 0)} &nbsp;
                            V. &nbsp;
                            {bayu.reduce((prev, next) => {
                              return prev + next.vocer;
                            }, 0)}
                          </Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      {numberFormat(bayu.reduce((prev, next) => {
                        return prev + next.total;
                      }, 0))}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-circle-09 text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Budi</p>
                          <Card.Title as="h4">
                            P. &nbsp;
                            {budi.reduce((prev, next) => {
                              return prev + next.jumlah;
                            }, 0)} &nbsp;
                            V. &nbsp;
                            {budi.reduce((prev, next) => {
                              return prev + next.vocer;
                            }, 0)}
                          </Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      {numberFormat(budi.reduce((prev, next) => {
                        return prev + next.total;
                      }, 0))}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-money-coins text-success"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Total Pemasukan</p>
                          <Card.Title as="h4">{numberFormat(total)}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      {bulan}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-money-coins text-success"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Total Pengeluaran</p>
                          <Card.Title as="h4">{numberFormat(totalPengeluaran)}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-redo mr-1"></i>
                      {bulan}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-money-coins text-success"></i>
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
                      {bulan}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Grafik Jumlah Potong Tahun : {tahun}</Card.Title>
                    <p className="card-category">Total Potong Perbulan Masing-masing Pegawai</p>
                  </Card.Header>
                  <Card.Body>
                    <div className="ct-chart" id="chartActivity">
                      <ChartistGraph
                        data={{
                          labels: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "Mei",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ],
                          series: [
                            fendiGraph,
                            bayuGraph,
                            budiGraph,
                          ],
                        }}
                        type="Bar"
                        options={{
                          seriesBarDistance: 10,
                          axisX: {
                            showGrid: false,
                          },
                          height: "245px",
                        }}
                        responsiveOptions={[
                          [
                            "screen and (max-width: 640px)",
                            {
                              seriesBarDistance: 5,
                              axisX: {
                                labelInterpolationFnc: function (value) {
                                  return value[0];
                                },
                              },
                            },
                          ],
                        ]}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      Fendi 
                      <i className="fas fa-circle text-danger"></i>
                      Bayu
                      <i className="fas fa-circle text-warning"></i>
                      Budi
                    </div>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-check"></i>
                      Data information certified
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
      }
    </>
  );
}

export default Dashboard;
