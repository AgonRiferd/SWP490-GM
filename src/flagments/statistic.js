import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosConfig";
import { formatMoney } from "../utils/convert";

const CURRENT_DATE = new Date();

const Statistic = () => {
    return (
        <>
            <span className="snapshot">
                <i className="fa-solid fa-chart-simple"></i>
                <h2 className="title">Tổng quan tháng {CURRENT_DATE.getMonth() + 1}</h2>
            </span>
            <div className="columns">
                <Member />
                <PackageGymer />
                <Income />
            </div>
        </>
    );
}

const Member = () => {
    const DATA_PARAM_ROLE_NAME = 'gymer';
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Accounts/GetAllAccountsWithConditons', {
                    params: {
                        role: DATA_PARAM_ROLE_NAME,
                        IsLock: false
                    }
                });
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data)
                        MemberCards(data, setForm);
                }
            } catch (error) {
            } finally {
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading ?
                <>
                </>
                :
                (form &&
                    <Card form={form} />
                )
            }
        </>

    )
}

const PackageGymer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/PackageGymers/GetPackageGymersForTest');
                //Fetch thành công
                if (response) {
                    const { data } = response;
                    if (data)
                        PackageGymerCards(data, setForm);
                }
            } catch (error) {
            } finally {
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading ?
                <>
                </>
                :
                (form &&
                    <Card form={form} />
                )
            }
        </>

    )
}

const Income = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Report/getReportInCome');
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data)
                        IncomeCards(data, setForm);
                }
            } catch (error) {
            } finally {
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading ?
                <>
                </>
                :
                (form &&
                    <Card form={form} />
                )
            }
        </>

    )
}

const Card = ({ form }) => {
    const { stats, icon, title, subtitle } = form;

    return (
        <div className="column">
            <div className="card">
                <div className="card-content">
                    <div className="sub-indicator">
                        {title}
                    </div>
                    <div className="columns columns-stats">
                        <div className="column column-header">
                            <div className="column indicator">
                                {stats}
                            </div>
                            <div className="icon">
                                {icon}
                            </div>
                        </div>
                    </div>
                    <div className="sub-indicator">
                        {subtitle}
                    </div>
                </div>
            </div>
        </div>
    )
}

function calculateNewMembers(data, setForm, startDate, endDate, title, subtitle) {
    const filteredData = data.filter((item) => {
        const createDate = new Date(item.createDate);
        return createDate >= startDate && createDate <= endDate;
    });

    const totalCount = filteredData.length;

    if (totalCount > 0) {
        setForm(() => ({
            stats: totalCount,
            icon: <i className="fa-solid fa-person-circle-plus" />,
            title: title,
            subtitle: subtitle
        }));
    }
}

function calculateNewPurchased(data, setForm, startDate, endDate, title, subtitle) {
    const filteredData = data.filter((item) => {
        const createDate = new Date(item.from);
        return createDate >= startDate && createDate <= endDate;
    });

    const totalCount = filteredData.length;

    if (totalCount > 0) {
        setForm(() => ({
            stats: totalCount,
            icon: <i className="fa-solid fa-box-open" />,
            title: title,
            subtitle: subtitle
        }));
    }
}

function MemberCards(data, setForm) {

    if (data) {
        // Thành viên mới trong ngày hiện tại
        calculateNewMembers(data, setForm, CURRENT_DATE, CURRENT_DATE, "Hôm nay", "Thành viên mới");

        // Thành viên mới trong tháng hiện tại
        const currentMonth = CURRENT_DATE.getMonth();
        const currentYear = CURRENT_DATE.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

        calculateNewMembers(data, setForm, firstDayOfMonth, lastDayOfMonth, "Tháng này", "Thành viên mới");
    }
}

function PackageGymerCards(data, setForm) {

    if (data) {
        // Thành viên mới trong ngày hiện tại
        calculateNewPurchased(data, setForm, CURRENT_DATE, CURRENT_DATE, "Hôm nay", "gói tập đã được mua");

        // Thành viên mới trong tháng hiện tại
        const currentMonth = CURRENT_DATE.getMonth();
        const currentYear = CURRENT_DATE.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

        calculateNewPurchased(data, setForm, firstDayOfMonth, lastDayOfMonth, "Tháng này", "gói tập đã được mua");
    }
}

function IncomeCards(data, setForm) {
    const { monthlyIncome } = data;
    if (monthlyIncome > 0) {
        setForm(() => ({
            stats: `${formatMoney(monthlyIncome)} đ`,
            icon: <i className="fa-solid fa-cash-register" />,
            title: "Tổng doanh thu",
            subtitle: "nhận được trong tháng"
        }));
    }
}

export default Statistic;