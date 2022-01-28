import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'
import { CardComp } from '../card/Card'
import { Context } from '../context/StateContext'
import { ModalComp } from '../modals/ModalComp'
import { PaginateComp } from '../pagination/PaginateComp'


export const Home = () => {

    const { state: { bugs }, show, handleClose, type } = useContext(Context)

    return (
        <Container fluid className='home-container'>
            <ModalComp show={show} onHide={handleClose} type={type} />
            {bugs.length==-0 && <h1 className='text-center my-4'>No Items Found...</h1>} 
            <Row className='my-4'>
                {
                    bugs?.map((itm, ind) => {
                        return (
                            <Col sm={6} md={3} key={ind}>
                                <CardComp id={itm.id!} description={itm.description!} resolved={itm.resolved!} />
                            </Col>
                        )
                    })
                }
            </Row>
            <PaginateComp />
        </Container>
    )
}