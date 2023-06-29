import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://egts.azurewebsites.net/api/Login/Login', {
        username,
        password
      });

      const { code, data } = response.data;

      if (code === 200 && data.role.toLowerCase() === 'staff') {
        const loginData = JSON.stringify(data);
        localStorage.setItem('loginData', loginData);
        handleLogin(loginData);
      } else {
        setErrorMessage('Bạn không có quyền truy cập.');
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
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = 'url(./background/bg.jpg)'; //Add background image to <body>
    return () => {
      document.body.style.backgroundImage = ''; //Reset background-image when unmount
    };
  }, []);

  const isSubmitDisabled = !(username && password);

  return (
    <div className="login animated bounceInLeft">
      <div className="logo">
        <h2>G&nbsp;</h2>
        <i className="fa-solid fa-dumbbell"></i>
        <h2>&nbsp;M</h2>
      </div>
      <div className="login-title">Đăng Nhập</div>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="login-form">
        <input
          className="form-text"
          type="text"
          placeholder="Tên Đăng Nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;