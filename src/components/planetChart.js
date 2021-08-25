import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import styled, { css } from 'styled-components'

function PlanetChart() {
    const { planetsDataToChart } = useSelector((state) => state.planetsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getPlanetsToChart());
    }, [dispatch])

    return (
        <Container className="mt-5 text-center">
            <h1>Planets Chart</h1>
            {!planetsDataToChart.length ?
                <Spinner animation="border" variant="primary" className="m-auto" />
                : <Row className="align-items-end">
                    {planetsDataToChart?.map((planet, key) => {
                        return <Col key={key}>
                            <h6>{planet.residents.length}</h6>
                            <DivChart height={planet.residents.length}></DivChart>
                            <span>{planet.name}</span>
                        </Col>
                    })}
                </Row>}
        </Container>
    )
}

export default PlanetChart;

const DivChart = styled.div`
    max-width: 80%;
    margin: auto;
    font-size: small;
    text-align: center;
    background-color: #50e2e2;
    ${props => props.height && css`
        height: ${props.height * 18}px;
    `}
`