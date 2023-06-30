import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.backgroundImage = 'url(./background/bg.jpg)'; //Add background image to <body>
    return () => {
      document.body.style.backgroundImage = ''; //Reset background-image when unmount
    };
  }, []);

  const clearField = () => {
    setPassword('');
  }

  // Create an instance of Axios with default configuration
  const api = axios.create({
    baseURL: 'https://egts.azurewebsites.net/api',
  });

  const handleSubmit = async () => {
    try {
      const response = await api.post('/Login/Login', {
        phoneNo,
        password
      });

      const { code, data } = response.data;

      if (code === 200 && data.role.toLowerCase() === 'staff') {
        const loginData = JSON.stringify(data);
        localStorage.setItem('loginData', loginData);
        handleLogin(true);
      } else {
        setErrorMessage('Bạn không có quyền truy cập.');
        clearField();
      }
      // Xử lý phản hồi thành công
      // Lưu thông tin đăng nhập, điều hướng tới trang chính, vv.
    } catch (error) {
      // Xử lý lỗi
      if (error.response) {
        // Lỗi được trả về từ phía server
        setErrorMessage(error.response.data.message);
      } else {
        // Lỗi không có phản hồi từ server
        setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
      clearField();
    }
  };

  // const handleSubmit = () => {
  //   handleLogin(true);
  // }

  const isSubmitDisabled = !(phoneNo && password);

  return (
    <div className="login animated bounceInLeft">
      <div className="logo">
        <h2>G&nbsp;</h2>
        <i className="fa-solid fa-dumbbell"></i>
        <h2>&nbsp;M</h2>
      </div>
      <div className="login-title">Đăng Nhập</div>
      {errorMessage && <p className='status-error'>{errorMessage}</p>}
      <form className="login-form">
        <input
          className="form-text"
          type="text"
          placeholder="Số điện thoại"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          className="form-text"
          type="password"
          placeholder="Mật Khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-submit" type='button' disabled={isSubmitDisabled} onClick={handleSubmit}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;