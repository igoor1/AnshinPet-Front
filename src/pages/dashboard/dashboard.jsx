import { Card, Col, Row, Container } from "react-bootstrap";

import "./dashboard.scss"

import NavbarHeader from "../../components/navbar/auth/navbarheader";
import Footer from "../../components/footer/footer";

import Loading from "../../components/loading/loading";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import { useGetQuantity } from "../../hooks/dashboard/useGetQuantity";


import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";


const Dashboard = () => {
    const { adoptions, animals, birds, cats, dogs, error, loading, noAdoptions, money, users, donations } = useGetQuantity();

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    const labelsAnimals = ["Cachorros", "Gatos", "Aves"];

    const dataAnimals = {
        labels: labelsAnimals,
        datasets: [
            {
                label: ["Cachorros"],
                backgroundColor: "#7C54D9",
                borderColor: '#000000',
                data: [dogs, 0, 0],
            },
            {
                label: ["Gatos"],
                backgroundColor: "#FF7979",
                borderColor: '#000000',
                data: [0, cats, 0],
            },
            {
                label: ["Aves"],
                backgroundColor: "#49A971",
                borderColor: '#000000',
                data: [0, 0, birds],
            },
        ],
    };

    const labelsAdoption = ["Adoção", "Não Adoção"];

    const dataAdoption = {
        labels: labelsAdoption,
        datasets: [
            {
                label: "Animais",
                backgroundColor: [
                    '#7C54D9',
                    '#FF7979',
                ],
                borderColor: ['#FF7979', '#7C54D9'],


                data: [adoptions, noAdoptions],
            },
        ],
    };




    return (
        <div className="divMain">
            <NavbarHeader />
            <div className="containerMain">
                <Container className="mt-4">
                    <Row xs={1} md={2} lg={4} className="g-4 rowMainDashboard">
                        <Col>
                            <Card border="primary" style={{ width: '14rem' }} className="cardDashboard">
                                <Card.Header style={{ fontSize: "13px" }}><i className="bi bi-mailbox"></i> Quantidade de Animais</Card.Header>
                                <Card.Body>
                                    <Card.Title>{animals}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary" style={{ width: '14rem' }} className="cardDashboard">
                                <Card.Header style={{ fontSize: "13px" }}><i className="bi bi-people"></i> Quantidade de Cuidadores</Card.Header>
                                <Card.Body>
                                    <Card.Title>{users}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary" style={{ width: '14rem' }} className="cardDashboard">
                                <Card.Header style={{ fontSize: "13px" }}><i className="bi bi-box2-heart"></i> Quantidade de Ração</Card.Header>
                                <Card.Body>
                                    <Card.Title>{donations}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary" style={{ width: '14rem' }} className="cardDashboard">
                                <Card.Header style={{ fontSize: "13px" }}><i className="bi bi-piggy-bank"></i> Quantidade de Doações</Card.Header>
                                <Card.Body>
                                    <Card.Title>{money}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
                <Container className="my-4">
                    <Row>
                        <Col className="colChartsDashboards">
                            <Container className="containerBar">
                                <Bar data={dataAnimals} />

                            </Container>
                        </Col>

                        <Col className="colChartsDashboards">
                            <Container className="containerDoughnut">
                                <Doughnut data={dataAdoption} />

                            </Container>

                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;