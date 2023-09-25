import { useEffect, useMemo, useState } from "react"
import axiosInstance from "../utils/axiosConfig"
import { NavLink } from "react-router-dom"

const Management = () => {
    return (
        <>
            <span className="snapshot">
                <i className="fa-solid fa-gear"></i>
                <h2 className="title">Quản lý</h2>
            </span>
            <div className="columns">
                <MemberManagement />
                <PackageManagement />
            </div>
        </>
    )
}

const MemberManagement = () => {
    const user = useMemo(() => ({
        gymer: {
            role: "gymer",
            name: "Thành viên",
            icon: <i className="fa-solid fa-users"></i>
        },
        pt: {
            role: "pt",
            name: "Huấn luyện viên",
            icon: <i className="fa-solid fa-user-tie"></i>
        },
        ne: {
            role: "ne",
            name: "Bác sỹ dinh dưỡng",
            icon: <i className="fa-solid fa-user-tie"></i>
        }
    }), [])

    return (
        <div className="column">
            <div className="card">
                <div className="card-title">
                    <h2>Thành viên</h2>
                </div>
                <div className="card-content">
                    <div className="columns">
                        <CountMemberByRole user={user.gymer} />
                        <CountMemberByRole user={user.pt} />
                        <CountMemberByRole user={user.ne} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const CountMemberByRole = ({ user }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Accounts/GetAllAccountsWithConditons', {
                    params: {
                        role: user.role,
                        IsLock: false
                    }
                });
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data) {
                        setForm(() => ({
                            stats: data.length,
                            icon: user.icon,
                            subtitle: user.name,
                            role: user.role
                        }));
                    } else {
                        setForm(() => ({
                            stats: 0,
                            icon: user.icon,
                            subtitle: user.name,
                            role: user.role
                        }));
                    }
                }
            } catch (error) {
                setForm(() => ({
                    stats: -1,
                    icon: user.icon,
                    subtitle: user.name,
                    role: user.role
                }));
            } finally {
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <>
                </>
                :
                <Card form={form}>
                    <NavLink to={`/management/${user.role}`}>
                        <div className="manager">
                            <div className="icon">
                                <i className="fa-solid fa-gear"></i>
                            </div>
                            <span>{user.name}</span>
                        </div>
                    </NavLink>
                </Card>
            }
        </>

    )
}

const PackageManagement = () => {
    const packageForm = useMemo(() => ({
        name: "Gói tập",
        icon: <i className="fa-solid fa-box-archive"></i>
    }), [])

    return (
        <div className="column">
            <div className="card">
                <div className="card-title">
                    <h2>Gói tập</h2>
                </div>
                <div className="card-content">
                    <div className="columns">
                        <CountPackages packageForm={packageForm} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const CountPackages = ({ packageForm }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API and update the state
                const response = await axiosInstance.get('/Packages/GetPackages');
                //Fetch thành công
                if (response) {
                    const { data } = response.data;
                    if (data) {
                        const packages = data.filter(item => !item.isDelete);

                        setForm(() => ({
                            stats: packages.length,
                            icon: packageForm.icon,
                            subtitle: packageForm.name
                        }));
                    }
                }
            } catch (error) {
                setForm(() => ({
                    stats: -1,
                    icon: packageForm.icon,
                    subtitle: packageForm.name
                }));
            } finally {
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <>
                </>
                :
                <Card form={form}>
                    <NavLink to={`/management/package`}>
                        <div className="manager">
                            <div className="icon">
                                <i className="fa-solid fa-gear"></i>
                            </div>
                            <span>{packageForm.name}</span>
                        </div>
                    </NavLink>
                </Card>
            }
        </>

    )
}

const Card = ({ form, children }) => {
    const { stats, icon, subtitle } = form;

    return (
        <div className="column">
            <div className="card">
                {stats >= 0 &&
                    <div className="card-content">
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
                }
                {children}
            </div>
        </div>
    )
}

export default Management;