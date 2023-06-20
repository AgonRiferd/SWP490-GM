import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import COLUMNS from "../../components/exercises/Columns";
import DATA from "../../components/exercises/DATA.json";
import {default as ExcerciseTable} from '../../components/exercises/Table'

const ExercisePage = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA, []);
    const sortees = useMemo(
        () => [
            { 
                id: "name", 
                desc: false 
            }
        ], []
    )
    
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   fetchData(); // Fetch initial data when component mounts
    // }, []);
  
    // const fetchData = async () => {
    //   try {
    //     // Fetch data from the API and update the state
    //     const response = await fetch('api/records');
    //     const jsonData = await response.json();
    //     setData(jsonData);
    //   } catch (error) {
    //     console.log('Error fetching data:', error);
    //   }
    // };
  
    // const handleEditSuccess = () => {
    //   fetchData(); // Fetch data again after successful edit
    // };
    
    return (
        <>
            <div className='content-header'>
                <ol className="breadcrumb">
                    <li>
                        <NavLink end to="/">
                            <i className="fa fa-fw fa-home"></i>
                            <span>Trang Chủ</span>
                        </NavLink>
                    </li>
                    <li>
                        <span>Quản Lý</span>
                    </li>
                    <li>
                        <span>
                            Bài Tập
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Bài Tập
                </span>
            </div>
            <div className="list-content">
                <ExcerciseTable data={data} columns={columns} sortees={sortees}/>
            </div>
        </>
    )
}

export default ExercisePage;