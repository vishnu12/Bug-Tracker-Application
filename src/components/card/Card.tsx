import React,{useContext} from 'react'
import { Button, Card } from 'react-bootstrap'
import { Context } from '../context/StateContext'
import {AiOutlineClose} from 'react-icons/ai'
import './Card.css'


type Props = {
    id: string,
    description: string,
    resolved: boolean
}

export const CardComp: React.FC<Props> = ({ id, description, resolved }) => {
    const {handleShow,changeBugStatus,dispatch,removeBug}=useContext(Context)

    function handleClick(){  
      dispatch({type:'GET_BUG_BY_ID',payload:{id}})  
      handleShow("Edit Bug")
    }

    function handleDelete() {
        if(window.confirm(`Are you sure to delete this bug : ${id}?`)){
          removeBug(id)
        }
    }

    return (
        <Card style={{width:'18rem',margin:'10px'}}>
            <Card.Header style={{fontWeight:'bolder'}} className='card-header'>
                <div className='card-header-child1'>
                <h5>Bug ID : <span className='text-success'>{id}</span></h5> 
                </div>
                <div className='card-header-child2'>
                  <AiOutlineClose className='icon' onClick={handleDelete} />
                </div>
                </Card.Header>
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
