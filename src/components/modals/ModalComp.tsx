import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../context/StateContext';
import { Data } from '../context/types';
import './ModalComp.css'

interface ModalProps {
    show: boolean,
    onHide: () => void
    type: string,
}

export type Istate = Omit<Data, "resolved">


export const ModalComp: React.FC<ModalProps> = (props) => {

    const { addBug, handleClose, editBug, state: { bug } } = useContext(Context)
    const [values, setValues] = useState<Istate>({ id: bug.id, description: bug.description })

    useEffect(() => {
        setValues({ id: bug.id, description: bug.description })
    }, [bug])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    function handleClick(): void {
        if (props.type === 'Add Bug') {
            addBug({ id: values.id, description: values.description, resolved: false })
            setValues({
                ...values,
                id: '',
                description: ''
            })
            handleClose()
        } else if (props.type === 'Edit Bug') {
            editBug(bug.id!, { description: values.description! })
            setValues({
                ...values,
                id: '',
                description: ''
            })
            handleClose()
        }
    }


    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='modal-form'>
                    {
                        props.type === 'Add Bug' &&
                        <Form.Group className='modal-form-group'>
                            <Form.Control type='text' id='bugId' name='id' placeholder='Bug Id' value={values.id} onChange={handleChange} />
                        </Form.Group>
                    }
                    <Form.Group className='modal-form-group'>
                        {
                            props.type === 'Edit Bug' &&
                            <Form.Label className='text-primary' htmlFor='desc'>Edit Bug Description</Form.Label>
                        }
                        <Form.Control as="textarea" id='desc' name='description' placeholder='Description' value={values.description} onChange={handleChange} />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleClick}>{props.type === 'Add Bug' ? 'ADD' : 'EDIT'}</Button>
            </Modal.Footer>
        </Modal>
    )
}



