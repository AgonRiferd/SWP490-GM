import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import Cookies from 'universal-cookie';
const BackgroundImage = './background/bg.jpg';

const Login = ({ setIsAuthenticated }) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = BackgroundImage;
  });

  useEffect(() => {
    document.body.style.backgroundImage = `url(${BackgroundImage})`;
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const clearField = () => {
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/Login/Login', {
        phoneNo,
        password
      });

      const { code, data, token } = response.data;

      if (code === 200 && data.role.toLowerCase() === 'staff') {
        cookies.set('token', token, { path: '/' });
        setIsAuthenticated(true);
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
        console.log(error);
      }
      clearField();
    }
  };

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
          autoComplete="phone"
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          className="form-text"
          type="password"
          placeholder="Mật Khẩu"
          value={password}
          autoComplete="current-password"
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