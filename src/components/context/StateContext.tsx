import React,{createContext,useReducer,useEffect,useState} from 'react'
import axios from 'axios'
import reducer from './reducer'
import { ContextType, Data, IState } from './types'

const API_URL='http://localhost:5000/'


export const Context=createContext({} as ContextType)


type Response={
    data:IState['bugs']
}

type Props={
    children:React.ReactNode
}

export const StateProvider:React.FC<Props> = ({children}) => {
  
const initialSate:IState={
    bugs:[],
    bug:{id:'',description:''},
    success:false
}


const [state,dispatch]=useReducer(reducer,initialSate)
const [show,setShow]=useState<boolean>(false)
const [type,setType]=useState<string>('')
const [filter,setFilter]=useState<{value:string}>({value:'all'})
const handleShow=(arg:string)=>{
    setType(arg)
    setShow(true)
}
const handleClose=()=>setShow(false)

async function getAllBugs():Promise<void>{
  const {data}=await axios.get(API_URL+'bugs') as Response
  const filteredBugs=filter.value==='all'?data:filter.value==='open'?
  data.filter(itm=>itm.resolved===false):filter.value==='closed'?
  data.filter(itm=>itm.resolved===true):[]
  dispatch({type:'GET_BUGS',payload:filteredBugs})
}

async function addBug(data:Data):Promise<void> {
    await axios.post(API_URL+'bugs',data)
    dispatch({type:'ADD_BUG'})
}

async function changeBugStatus(id:string,status:string):Promise<void>{ 
   if(status==='resolve'){
    await axios.patch(API_URL+'bugs/'+id,{resolved:true})
    dispatch({type:'CHANGE_BUG_STATUS'})
    dispatch({type:'RESTORE'})
   }else if(status==='reopen'){
    await axios.patch(API_URL+'bugs/'+id,{resolved:false})
    dispatch({type:'CHANGE_BUG_STATUS'})
    dispatch({type:'RESTORE'})
   }
   
}

async function editBug(id:string,payload:{description:string}):Promise<void>{
    await axios.patch(API_URL+'bugs/'+id,payload)
    dispatch({type:'EDIT_BUG'})
    dispatch({type:'RESTORE'})
}

async function removeBug(id:string):Promise<void>{
    await axios.delete(API_URL+'bugs/'+id)
    dispatch({type:'REMOVE_BUG'})
    dispatch({type:'RESTORE'})
}

useEffect(()=>{
    getAllBugs()
},[state.success,filter])


    return (
        <Context.Provider value={
            {
              state,
              dispatch,
              show,
              handleClose,
              handleShow,
              type,
              addBug,
              changeBugStatus,
              editBug,
              filter,
              setFilter,
              removeBug
            }
        }>
            {children}
        </Context.Provider>
    )
}
