import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import COLUMNS from "../../components/package/Columns";
import { Create, Edit, Delete, View } from "../../components/package/dialog";
import { AdvanceTable } from '../../flagments/advance-table';
import { useEffect } from 'react';
import { LoadingTable } from '../../flagments/loading-table';
import axios from '../../utils/axiosConfig';

const PackageManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [activeTabItem, setActiveTabItem] = useState(1);
    const commonColumns = useMemo(() => COLUMNS, []);
    const column1 = useMemo(() => [
        {
            Header: 'Tên Gói',
            accessor: 'name'
        },
        {
            Header: 'Tổng số buổi',
            accessor: 'numberOfsession',
            width: 80
        },
        ...commonColumns
    ], [commonColumns]);
    const column2 = useMemo(() => [
        {
            Header: 'Tên Gói',
            accessor: 'name'
        },{
            Header: 'Tổng số tháng',
            accessor: 'numberOfMonth',
            width: 80
        },
        ...commonColumns
    ], [commonColumns]);
    const column3 = useMemo(() => [
        {
            Header: 'Tên Gói',
            accessor: 'name'
        },
        ...commonColumns
    ], [commonColumns]);
    const columns = (activeTabItem === 1) ? column2 : 
                    (activeTabItem === 2 || activeTabItem === 4)  ? column1 : column3;

    const sortees = useMemo(
        () => [
            {
                id: "name",
                desc: false
            }
        ], []
    )

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Fetch data from the API and update the state
            const response = await axios.get('/Packages/GetPackages');
            //Fetch thành công
            if (response.status === 200) {
                const { data } = response.data;
                setData(data);
            }
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <span>Mã lỗi: {error.code}</span>
                    </>
                );
            }
        } finally {
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // [] để chỉ gọi fetchData khi component được mount lần đầu

    const dialogs = useMemo(() => ({
        dialogCreate: {
            title: "Tạo Gói tập",
            icon: <i className="fa-solid fa-plus"></i>,
            component: Create,
            fetchData: fetchData,
            packageType: activeTabItem
        },
        dialogView: {
            title: "Thông tin",
            icon: <i className="fa-solid fa-eye"></i>,
            component: View,
            packageType: activeTabItem
        },
        dialogEdit: {
            title: "Chỉnh sửa",
            icon: <i className="fa-solid fa-pen-to-square"></i>,
            component: Edit,
            fetchData: fetchData,
            packageType: activeTabItem
        },
        dialogDelete: {
            title: "Loại bỏ",
            icon: <i className="fa-solid fa-trash"></i>,
            component: Delete,
            fetchData: fetchData
        }
    }), [activeTabItem]);

    const handleTabClick = (tabItem) => {
        activeTabItem !== tabItem && setActiveTabItem(tabItem);
    };

    const isTabActive = (tabItem) => {
        return activeTabItem === tabItem ? true : false;
    };

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
                        <span>Gói Tập</span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Gói Tập
                </span>
            </div>
            <div className="common-tabs">
                <div className={`common-tab ${isTabActive(1) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(1)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Gói Cơ Bản
                        </span>
                    </div>
                </div>
                <div className={`common-tab ${isTabActive(2) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(2)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Gói Sức Khỏe
                        </span>
                    </div>
                </div>
                <div className={`common-tab ${isTabActive(3) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(3)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Gói Dinh Dưỡng
                        </span>
                    </div>
                </div>
                <div className={`common-tab ${isTabActive(4) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(4)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Gói Cao Cấp
                        </span>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <div className="list-content">
                    {isTabActive(1) &&
                        <NomalPackage data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
                    }
                    {isTabActive(2) &&
                        <PremiumPackage data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
                    }
                    {isTabActive(3) &&
                        <PremiumPlusPackage data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
                    }
                    {isTabActive(4) &&
                        <GalaxyPackage data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
                    }
                </div>
            )}
        </>
    )
}
const NomalPackage = ({ data, columns, sortees, dialogs }) => {
    const customData = data.filter(row => !row.hasNe && !row.hasPt);

    return (
        <AdvanceTable data={customData} columns={columns} sortees={sortees} dialogs={dialogs} />
    )
}

const PremiumPackage = ({ data, columns, sortees, dialogs }) => {
    const customData = data.filter(row => row.hasPt && !row.hasNe);

    return (
        <AdvanceTable data={customData} columns={columns} sortees={sortees} dialogs={dialogs} />
    )
}

const PremiumPlusPackage = ({ data, columns, sortees, dialogs }) => {
    const customData = data.filter(row => !row.hasPt && row.hasNe);

    return (
        <AdvanceTable data={customData} columns={columns} sortees={sortees} dialogs={dialogs} />
    )
}

const GalaxyPackage = ({ data, columns, sortees, dialogs }) => {
    const customData = data.filter(row => row.hasNe && row.hasPt);

    return (
        <AdvanceTable data={customData} columns={columns} sortees={sortees} dialogs={dialogs} />
    )
}

export default PackageManage;