import React, { useMemo, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import COLUMNS from "../../components/package/Columns";
import { Create, Delete, View } from "../../components/package/dialog";
import { AdvanceTable, LoadingTable } from '../../flagments/advance-table';
import axios from '../../utils/axiosConfig';

const PackageManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [activeTabItem, setActiveTabItem] = useState(1);
    const columns = useMemo(() => {
        const commonColumns = COLUMNS;
        
        return (activeTabItem === 1 || activeTabItem === 3)
            ? [
                {
                    Header: 'Tên Gói',
                    accessor: 'name'
                },
                {
                    Header: 'Số tháng',
                    accessor: 'numberOfMonth',
                    width: 60
                },
                ...commonColumns
            ]
            : ((activeTabItem === 2)
                ? [
                    {
                        Header: 'Tên Gói',
                        accessor: 'name'
                    },
                    {
                        Header: 'Số buổi',
                        accessor: 'numberOfsession',
                        width: 60
                    },
                    ...commonColumns
                ]
                : [
                    {
                        Header: 'Tên Gói',
                        accessor: 'name'
                    },
                    ...commonColumns
                ]);
    }, [activeTabItem]);

    const initialState =  useMemo (() => ({ 
        hiddenColumns: ['createDate'],
        sortBy: [
            {
                id: "createDate",
                desc: true
            }
        ]
    }), []);

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
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
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
                <span className="status-error">
                    {errorMessage}
                </span>
            ) : (
                <div className="list-content">
                    {isTabActive(1) &&
                        <NormalPackage 
                            data={data} 
                            columns={columns} 
                            initialState={initialState} 
                            dialogs={dialogs}
                        />
                    }
                    {isTabActive(2) &&
                        <PremiumPackage 
                            data={data}
                            columns={columns}
                            initialState={initialState}
                            dialogs={dialogs}
                        />
                    }
                    {isTabActive(3) &&
                        <PremiumPlusPackage
                            data={data} 
                            columns={columns} 
                            initialState={initialState} 
                            dialogs={dialogs} 
                        />
                    }
                    {isTabActive(4) &&
                        <GalaxyPackage 
                            data={data} 
                            columns={columns} 
                            initialState={initialState} 
                            dialogs={dialogs} 
                        />
                    }
                </div>
            )}
        </>
    )
}

const NormalPackage = ({ data, columns, dialogs, ...props }) => {
    const customData = data.filter(row => !row.hasNe && !row.hasPt);

    return (
        <AdvanceTable data={customData} columns={columns} dialogs={dialogs} {...props} />
    )
}

const PremiumPackage = ({ data, columns, dialogs, ...props }) => {
    const customData = data.filter(row => row.hasPt && !row.hasNe);

    return (
        <AdvanceTable data={customData} columns={columns} dialogs={dialogs} {...props} />
    )
}

const PremiumPlusPackage = ({ data, columns, dialogs, ...props }) => {
    const customData = data.filter(row => !row.hasPt && row.hasNe);

    return (
        <AdvanceTable data={customData} columns={columns} dialogs={dialogs} {...props} />
    )
}

const GalaxyPackage = ({ data, columns, dialogs, ...props }) => {
    const customData = data.filter(row => row.hasNe && row.hasPt);

    return (
        <AdvanceTable data={customData} columns={columns} dialogs={dialogs} {...props} />
    )
}

export default PackageManage;