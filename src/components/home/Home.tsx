import React,{useContext} from 'react'
import { Col, Row } from 'react-bootstrap'
import { CardComp } from '../card/Card'
import { Context } from '../context/StateContext'
import { ModalComp } from '../modals/ModalComp'


export const Home = () => {

    const {state:{bugs},show,handleClose,type}=useContext(Context)

    return (
        <>
        <ModalComp show={show} onHide={handleClose} type={type}/>
        
        <Row className='my-4'>
            {
             bugs?.map((itm,ind)=>{
                 return (
                    <Col sm={6} md={3} key={ind}>
                    <CardComp id={itm.id!} description={itm.description!} resolved={itm.resolved!}  />
                    </Col>
                 )
             })
            }
        </Row>
        </>
    )
}