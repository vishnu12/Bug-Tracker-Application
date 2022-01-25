import { Dispatch } from "react"

export interface Data{
    id?:string,
    description?:string,
    resolved?:boolean
}

export interface IState{
    bugs:Data[],
    bug:Data,
    success:boolean
}



export type Actions=
|{type:'GET_BUGS',payload:IState['bugs']}
|{type:'GET_BUG_BY_ID',payload:{id:string}}
|{type:'ADD_BUG'}
|{type:'EDIT_BUG'}
|{type:'REMOVE_BUG'}
|{type:'CHANGE_BUG_STATUS'}
|{type:'RESTORE'}


export type ContextType={
 state:IState,
 dispatch:Dispatch<Actions>,
 show:boolean,
 handleShow:(arg:string)=>void,
 handleClose:()=>void,
 type:string,
 addBug:(arg:Data)=>void,
 changeBugStatus:(id:string,status:string)=>void,
 editBug:(id:string,payload:{description:string})=>void,
 removeBug:(id:string)=>void,
 filter:{value:string},
 setFilter:React.Dispatch<React.SetStateAction<{
    value: string;
}>>
}
