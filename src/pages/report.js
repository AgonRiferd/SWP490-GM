import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AdvanceTable, LoadingTable } from '../flagments/advance-table';
import COLUMNS from '../components/report/Columns';
import axiosInstance from '../utils/axiosConfig';

const ReportPage = () => {
    const [activeTabItem, setActiveTabItem] = useState(1);

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
                        <span>
                            <b>Báo Cáo</b>
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Báo Cáo: Trạng Thái Gói Tập
                </span>
            </div>
            <div className="common-tabs">
                <div className={`common-tab ${isTabActive(1) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(1)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Đang Hoạt Động
                        </span>
                    </div>
                </div>
                <div className={`common-tab ${isTabActive(2) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(2)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Đang Tạm Dừng
                        </span>
                    </div>
                </div>
                <div className={`common-tab ${isTabActive(3) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(3)}>
                    <div className="common-tab-container">
                        <span className="common-tab-name">
                            Đã Kết Thúc
                        </span>
                    </div>
                </div>
            </div>
            <div className="list-content">
                {isTabActive(1) &&
                    <ActivePackages />
                }
                {isTabActive(2) &&
                    <PausePackages />
                }
                {isTabActive(3) &&
                    <DonePackages />
                }
            </div>
        </>
    )
}

const ActivePackages = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const columns = useMemo(() => COLUMNS, []);
    const initialState = useMemo(() => ({
        sortBy: [
            {
                id: "from",
                desc: true
            }
        ]
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Report/GetActivePackages');
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data)
                        setData(data);
                }
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(
                        <>
                            <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        </>
                    );
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">
                    {errorMessage}
                </span>
            ) : (
                <AdvanceTable data={data} columns={columns} initialState={initialState} />
            )}
        </>
    )
}

const PausePackages = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const columns = useMemo(() => COLUMNS, []);
    const initialState = useMemo(() => ({
        sortBy: [
            {
                id: "from",
                desc: true
            }
        ]
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Report/GetPausePackages');
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data)
                        setData(data);
                }
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(
                        <>
                            <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        </>
                    );
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">
                    {errorMessage}
                </span>
            ) : (
                <AdvanceTable data={data} columns={columns} initialState={initialState} />
            )}
        </>
    )
}

const DonePackages = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const columns = useMemo(() => COLUMNS, []);
    const initialState = useMemo(() => ({
        sortBy: [
            {
                id: "from",
                desc: true
            }
        ]
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Report/GetDonePackages');
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data)
                        setData(data);
                }
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(
                        <>
                            <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        </>
                    );
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">
                    {errorMessage}
                </span>
            ) : (
                <AdvanceTable data={data} columns={columns} initialState={initialState} />
            )}
        </>
    )
}

export default ReportPage;