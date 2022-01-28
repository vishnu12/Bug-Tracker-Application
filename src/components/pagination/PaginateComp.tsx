import { useContext } from 'react'
import { Pagination } from "react-bootstrap"
import { Context } from '../context/StateContext'
import './PaginateComp.css'

export const PaginateComp = () => {

    const { pages, page, setPage } = useContext(Context)
    console.log(pages);


    return (
        <Pagination size="lg" className="paginate">
            {
                [...Array(pages)].map((_, ind) => (
                    <Pagination.Item key={ind} onClick={() => setPage(ind + 1)} active={page === ind + 1}>
                        {ind + 1}
                    </Pagination.Item>
                ))
            }
        </Pagination>
    )
}


//onClick={()=>setPage(ind+1)} active={page===ind+1}