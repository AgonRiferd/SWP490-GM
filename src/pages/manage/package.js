import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import DATA from "../../components/package/DATA.json";
import COLUMNS from "../../components/package/Columns";
import CommonTable from '../../flagments/common-table';

const PackageManage = () => {
    const data = useMemo(() => DATA, []);
    const columns = useMemo(() => COLUMNS, []);
    const sortees = useMemo(
        () => [
            { 
                id: "orderDay", 
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
    //     const response = await fetch('api');
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
                        <span>Dịch Vụ</span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Dịch Vụ
                </span>
            </div>
            <div className="list-content">
                <CommonTable data={data} columns={columns} sortees={sortees} />
            </div>
        </>
    )
}

export default PackageManage;