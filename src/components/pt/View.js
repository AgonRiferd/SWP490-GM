import React, { useMemo, useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { format } from 'date-fns'
import EXERCISE_COLUMNS from "../exercises/Columns";
import ExerciseDialog from "../exercises/dialog";
import PackageGymerDialog from "../package_gymer/dialog";
import { AdvanceTable, LoadingTable } from "../../flagments/advance-table";
import { formatPhoneNumber } from "../../utils/convert";
import { ImageInput } from "../../utils/imageConvert";
import Dialog from "../../flagments/dialog";
import Calendar from "../../flagments/advance-calendar";
import { ScheduleDetail } from "./dialog";
import Success from "../../utils/successAnimation";
import PaginatedItems from "../../flagments/pagination";

const CustomView = ({ dataUser, setDataView, isMainLoading }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [activeTabItem, setActiveTabItem] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isLoading)
                    setIsLoading(true);

                const response = await axiosInstance.get(`/Accounts/GetAccountByID/${dataUser.id}`);
                //Fetch thành công
                const { data } = response;
                setUser(data);
                setIsLoading(false); // Kết thúc quá trình fetch
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
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };
        if (!isMainLoading) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser, isMainLoading])

    const handleTabClick = (tabItem) => {
        activeTabItem !== tabItem && setActiveTabItem(tabItem);
    };

    const isTabActive = (tabItem) => {
        return activeTabItem === tabItem ? true : false;
    };

    return (
        <div className="data-view">
            <hr className="view-divider" />
            <div className="sep-container">
                <div className="sep-text">Thông tin</div>
                <button type="button" className="button-close" onClick={() => setDataView()}>&times;</button>
            </div>
            {isLoading ? (
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : (
                <>
                    <div className="profile-container">
                        {errorMessage ? (
                            <span className="status-error">{errorMessage}</span>
                        ) : (
                            <>
                                <div className="user-avatar">
                                    <div className="profile-avatar">
                                        {user.fullname.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <table className='dialog-field'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span>{user.fullname}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        ({user.isDelete ?
                                                            <span className="status-lock">
                                                                Bị khóa
                                                            </span>
                                                            :
                                                            <span className="status-active">
                                                                Hoạt động
                                                            </span>
                                                        })
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="user-details">
                                    <div className="common-tabs">
                                        <div className={`common-tab ${isTabActive(1) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(1)}>
                                            <div className="common-tab-container">
                                                <span className="common-tab-name">
                                                    Tổng quan
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`common-tab ${isTabActive(2) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(2)}>
                                            <div className="common-tab-container">
                                                <span className="common-tab-name">
                                                    Đánh giá
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`common-tab ${isTabActive(3) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(3)}>
                                            <div className="common-tab-container">
                                                <span className="common-tab-name">
                                                    Bài tập
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`common-tab ${isTabActive(4) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(4)}>
                                            <div className="common-tab-container">
                                                <span className="common-tab-name">
                                                    Huấn luyện
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`common-tab ${isTabActive(5) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(5)}>
                                            <div className="common-tab-container">
                                                <span className="common-tab-name">
                                                    Danh biểu
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="common-plain">
                                        {isTabActive(1) &&
                                            <OtherProfile user={user} />
                                        }
                                        {isTabActive(2) &&
                                            <FeedbackViewer userId={user.id} />
                                        }
                                        {isTabActive(3) &&
                                            <Exercise userId={user.id} />
                                        }
                                        {isTabActive(4) &&
                                            <WorkingPackages userId={user.id} />
                                        }
                                        {isTabActive(5) &&
                                            <Schedule userId={user.id} />
                                        }
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

const OtherProfile = ({ user }) => {
    const [qualification, setQualification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [rating, setRating] = useState(null);

    const fetchData = async () => {
        try {
            if (!isLoading)
                setIsLoading(true);
            // Fetch data from the API and update the state
            let response = await axiosInstance.get(`/Qualifications/GetQualificationByAccountId/${user.id}`);
            //Fetch thành công
            if (response) {
                const { data } = response;
                setQualification(data);
            }

            response = await axiosInstance.get('/Feedback/GetAverageRatingByExpertID', {
                params: {
                    expertID: user.id
                }
            });
            //Fetch thành công
            if (response) {
                const { data } = response.data;
                if (data) {
                    setRating(data.averageRate);
                }
            }
            setIsLoading(false); // Kết thúc quá trình fetch
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
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOpenDialog = (mode) => {
        setDialogMode(mode);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setDialogMode(null);
    };

    const dialogs = useMemo(() => ({
        dialogCertificate: {
            title: "Chứng chỉ",
            component: CertificationEdit,
            userId: user.id,
            fetchData: fetchData
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    return (
        <>
            {isLoading ? (
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <>
                    {isDialogOpen && (
                        <Dialog mode={dialogMode} rowData={qualification} onClose={handleCloseDialog} />
                    )}
                    <div className="profile-overview">
                        <div className="user-info">
                            <div className="sep-container">
                                <div className="sep-text">Thông tin</div>
                            </div>
                            <table className='dialog-field'>
                                <tbody>
                                    <tr>
                                        <td width={200}>
                                            <label>Họ Tên</label>
                                        </td>
                                        <td>
                                            <span>{user.fullname}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Số điện thoại</label>
                                        </td>
                                        <td>
                                            <span>{formatPhoneNumber(user.phoneNo)}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Giới Tính</label>
                                        </td>
                                        <td>
                                            <span>{user.gender === 'M' ? 'Nam' : user.gender === 'F' ? 'Nữ' : user.gender}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Ngày tham gia</label>
                                        </td>
                                        <td>
                                            <span>{format(new Date(user.createDate), 'dd/MM/yyyy')}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Đánh giá</label>
                                        </td>
                                        <td>
                                            {rating ?
                                                <>
                                                    <span className="rate-field">
                                                        {rating} / 5
                                                    </span>
                                                </> : <span>
                                                    Chưa có
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Số năm kinh nghiệm</label>
                                        </td>
                                        <td>
                                            {qualification ?
                                                <span>
                                                    {qualification.experience}
                                                </span> : <span className="status-error">
                                                    Chưa có
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Giới thiệu</label>
                                        </td>
                                        <td>
                                            <span>
                                                {qualification && qualification.descrition}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="certificate">
                            <div className="sep-container">
                                <div className="sep-text"></div>
                            </div>
                            <table className='dialog-field'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>Chứng chỉ</span>
                                        </td>
                                        <td>
                                            {qualification ?
                                                <>
                                                    <button className="any-button" onClick={() => handleOpenDialog(dialogs.dialogCertificate)}>
                                                        Chỉnh sửa
                                                    </button>
                                                    <img src={qualification.certificate} alt="certificate" />
                                                </> : <>
                                                    <button className="any-button" onClick={() => handleOpenDialog(dialogs.dialogCertificate)}>
                                                        Chỉnh sửa
                                                    </button>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

const WorkingPackages = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [packageData, setPackageData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const columns = useMemo(() => [
        {
            Header: 'Tên thành viên',
            accessor: 'gymerName'
        }
    ], []);
    const initialState = useMemo(() => ({
        sortBy: [
            {
                id: "gymerName",
                desc: true
            }
        ]
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading) setIsLoading(true);
            try {
                const response = await axiosInstance.get('/PackageGymers/GetGymerPackageActiveByPT', {
                    params: {
                        PTID: userId
                    }
                });
                const { data } = response.data;
                if (data) {
                    setPackageData(data);
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
                            <span>Mã lỗi: {error.code}</span>
                        </>
                    );
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const dialogs = useMemo(() => ({
        dialogView: {
            title: "Thông tin",
            icon: <i className="fa-solid fa-eye"></i>,
            component: PackageGymerDialog.ViewListGymerPackage
        }
    }), []);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <>
                    <h1>Danh sách thành viên đang huấn luyện</h1>
                    <div className="list-content">
                        <AdvanceTable data={packageData} columns={columns} initialState={initialState} dialogs={dialogs} />
                    </div>
                </>
            )}
        </>
    )
}

const Exercise = ({ userId }) => {
    const columns = useMemo(() => EXERCISE_COLUMNS, []);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const initialState = useMemo(() => ({
        sortBy: [
            {
                id: "name",
                desc: false
            }
        ]
    }), []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Fetch data from the API and update the state
            const response = await axiosInstance.get('/Excercises/GetExcercisesByPTID', {
                params: {
                    PTID: userId
                }
            });
            //Fetch thành công
            if (response.status === 200) {
                const { data } = response.data;
                setData(data);
            }
            setIsLoading(false); // Kết thúc quá trình fetch
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
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dialogs = useMemo(() => ({
        dialogView: {
            title: "Thông tin",
            icon: <i className="fa-solid fa-eye"></i>,
            component: ExerciseDialog.View
        },
        dialogDelete: {
            title: "Loại bỏ",
            icon: <i className="fa-solid fa-trash"></i>,
            component: ExerciseDialog.Delete,
            fetchData: fetchData
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <div className="list-content">
                    <AdvanceTable data={data} columns={columns} initialState={initialState} dialogs={dialogs} />
                </div>
            )}
        </>
    )
}

const CertificationEdit = ({ data, onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const id = data ? data.expertId : props.userId;
    const [imageUrl, setImageUrl] = useState(data ? data.certificate : "");
    const [certData, setCertData] = useState({
        experience: data ? data.experience : 0,
        expertId: id,
        certificate: imageUrl,
        descrition: data ? data.descrition : ""
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleExpChange = (e) => {
        const { name, value } = e.target;

        setCertData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    useEffect(() => {
        setCertData((prevData) => ({
            ...prevData,
            certificate: imageUrl
        }));
    }, [imageUrl])

    const handleCreateCertificate = async (e) => {
        e.preventDefault();

        if (!certData.certificate || certData.certificate.length === 0) {
            alert('Ảnh chứng chỉ hiện chưa có!');
            return;
        }
        try {
            onLoading(true);
            const response = data ? await axiosInstance.put('/Qualifications/UpdateQualification', certData)
                : await axiosInstance.post('/Qualifications/CreateQualification', certData);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                setIsSuccess(true);
                onLoading(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(
                    <>
                        <p>Cập nhật không thành công</p>
                        <p>Mã lỗi: {error.response.status}</p>
                    </>
                );
            } else {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <p>Mã lỗi: {error.code}</p>
                    </>
                );
            }
            onLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        const { key } = e;

        if (!/[0-9]/.test(key) && key !== "Backspace") {
            e.preventDefault();
        }
    };

    const handleOnClose = () => {
        onClose();
        props.fetchData();
    }

    return (
        <>
            {isSuccess ? (
                <Success onClose={handleOnClose}>
                    <span>Đã cập nhật</span>
                </Success>
            ) : (
                <>
                    {id ?
                        <>
                            {errorMessage && <span className="status-error">{errorMessage}</span>}
                            <form onSubmit={handleCreateCertificate}>
                                <div className='dialog-fields'>
                                    <table className='dialog-field'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label>Chứng Chỉ</label>
                                                    <label className='status-lock'>*</label>
                                                </td>
                                                <td className="normal-file-input">
                                                    <ImageInput userId={id} setImageUrl={setImageUrl} imageUrl={imageUrl} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="experience">Số năm kinh nghiệm</label>
                                                    <label className='status-lock'>*</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="experience"
                                                        name="experience"
                                                        pattern="\d+"
                                                        value={certData.experience}
                                                        onChange={handleExpChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder="0"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='dialog-button-tray'>
                                    <button type='submit' className='any-button button-submit' disabled={isLoading || !imageUrl}>Xác nhận</button>
                                    <button type='button' className='any-button button-cancel' onClick={onClose}>Bỏ qua</button>
                                </div>
                            </form>
                        </> : <>
                            <span className="status-error">ID người dùng không xác định</span>
                            <div className='dialog-button-tray'>
                                <button type='button' className='any-button button-cancel' onClick={onClose}>Đóng</button>
                            </div>
                        </>
                    }
                </>
            )}
        </>
    );
};

const FeedbackViewer = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [rating, setRating] = useState(null);
    const [listFeedback, setListFeedback] = useState(null);

    const fetchData = async () => {
        try {
            if (!isLoading)
                setIsLoading(true);
            // Fetch data from the API and update the state
            let response = await axiosInstance.get('/Feedback/GetFeedbackListByExpertID', {
                params: {
                    expertID: userId,
                    isDelete: false
                }
            });
            //Fetch thành công
            if (response) {
                const { data } = response.data;
                setListFeedback(data);
            }

            response = await axiosInstance.get('/Feedback/GetAverageRatingByExpertID', {
                params: {
                    expertID: userId
                }
            });
            //Fetch thành công
            if (response) {
                const { data } = response.data;
                if (data) {
                    setRating(data.averageRate);
                }
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
                        <span>Mã lỗi: {error.code}</span>
                    </>
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {isLoading ? (
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <>
                    {listFeedback ? (
                        <>
                            <div>
                                <span>Đánh giá trung bình: </span>
                                <span>{rating} / 5</span>
                            </div>
                            <div>
                                <PaginatedItems itemsPerPage={5} data={listFeedback} component={FeedbackDetail} />
                            </div>
                        </>
                    ) : (
                        <div>
                            Hiện chưa có đánh giá
                        </div>
                    )}

                </>
            )}
        </>
    )
}

const Schedule = ({ userId }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchScheduleData = async () => {
            if (!isLoading) setIsLoading(true);
            try {
                const response = await axiosInstance.get(`/ExcerciseSchedules/GetWorkingScheduleByPTID/${userId}`);
                const { data } = response.data;
                setScheduleData(data);
            } catch (error) {
                console.error('Xảy ra lỗi khi lấy danh sách dinh dưỡng: ', error);
            }
            setIsLoading(false);
        };

        fetchScheduleData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const Tooltip = ({ data }) => {
        const totalMembers = Array.from(new Set(data.map(item => item.gymerID)));
        const totalWorkShifts = new Set(data.map(item => item.from && item.to));

        return (
            <>
                {totalWorkShifts.size > 0 && (
                    <div className="bar nutrition-bar">
                        <span>Ca làm việc</span>
                        {totalWorkShifts.size > 1 &&
                            <span>x{totalWorkShifts.size}</span>
                        }
                    </div>
                )}
                {totalMembers.length > 0 && (
                    <div className="bar exercise-bar">
                        <span>Thành viên</span>
                        {totalMembers.length > 1 &&
                            <span>x{totalMembers.length}</span>
                        }
                    </div>
                )}
            </>
        )
    }

    const tooltipOpt = useMemo(() => ({
        component: Tooltip
    }), []);

    const dialog = useMemo(() => ({
        scheduleDetail: {
            title: "Danh biểu",
            component: ScheduleDetail
        }
    }), [])

    return (
        <div>
            <div className="schedule-title">
                <h1>Danh biểu</h1>
            </div>
            {isLoading ? (
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : scheduleData.length > 0 ? (
                <Calendar data={scheduleData} tooltipOpt={tooltipOpt} dialog={dialog} />
            ) : (
                <span className="status-error">
                    Nhân viên hiện không có danh biểu
                </span>
            )}
        </div>
    );
}

const FeedbackDetail = ({ data }) => {
    return (
        <div className="feedback-result">
            {data &&
                data.map((item, index) => (
                    <div className="common-frame" key={index}>
                        <div className="rating-flame">
                            <span className="title">Đánh giá</span>
                            <span className="rating">{item.rate}</span>
                        </div>
                        <div className="details-flame">
                            <div className="detail">
                                <div>
                                    <span>Người đánh giá: </span>
                                    <span>{item.gymerName}</span>
                                </div>
                                <div>
                                    <span>Tên gói tập: </span>
                                    <span>{item.packageName}</span>
                                </div>
                            </div>
                            <div>
                                {item.feedback1}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CustomView;