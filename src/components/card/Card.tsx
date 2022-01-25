import { type } from 'os'
import React,{useContext,useEffect} from 'react'
import { Button, Card } from 'react-bootstrap'
import { Context } from '../context/StateContext'


type Props = {
    id: string,
    description: string,
    resolved: boolean
}

export const CardComp: React.FC<Props> = ({ id, description, resolved }) => {
    const {handleShow,changeBugStatus,dispatch,state:{bug}}=useContext(Context)

    function handleClick(){  
      dispatch({type:'GET_BUG_BY_ID',payload:{id}})  
      handleShow("Edit Bug")
    }

    return (
        <Card style={{width:'18rem',margin:'10px'}}>
            <Card.Header style={{fontWeight:'bolder'}}>Bug ID : {id}</Card.Header>
            <Card.Body>
                <Card.Title>Bug Description</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant="primary" style={{marginRight:'5px'}} onClick={handleClick}>Edit</Button>
                <Button variant="primary" disabled={resolved} onClick={()=>changeBugStatus(id,"resolve")}>{resolved?'Resolved':'Mark As Resolved'}</Button>
                {resolved && <Button variant="primary" style={{marginLeft:'5px'}} onClick={()=>changeBugStatus(id,"reopen")} >Reopen</Button>}
            </Card.Body>
        </Card>
    )
}
