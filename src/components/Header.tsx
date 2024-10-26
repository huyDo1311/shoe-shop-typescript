import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/configStore';
import { ACCESS_TOKEN, settings, USER_LOGIN } from '../util/config';

type Props = {}

export default function Header({ }: Props) {

  const { userLogin } = useSelector((state: RootState) => state.userReducer);

  const renderLoginUI = () => {
    if (userLogin) {
      return (<div className="d-flex justify-content-between">
        <li className="nav-item">
          <a className="nav-link" href="/profile">{userLogin.email}</a>
        </li>
        <li className="nav-item">
          <a onClick={() => {
            settings.eraseCookie(ACCESS_TOKEN);
            settings.eraseCookie(USER_LOGIN );

            settings.clearStorage(ACCESS_TOKEN);
            settings.clearStorage(USER_LOGIN);

            window.location.reload();
          }} className="nav-link" href="/">Đăng xuất</a>
        </li>
      </div>)
    } else {
      return (<div className="d-flex justify-content-between">
        <li className="nav-item">
          <a className="nav-link" href="/login">Đăng nhập</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Đăng ký</a>
        </li>
      </div>)
    }
  }



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">MyStore</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Giới thiệu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Sản phẩm</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Liên hệ</a>
              </li>
            </ul>
            <form className="d-flex me-3">
              <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Tìm kiếm" />
              <button className="btn btn-outline-success" type="submit">Tìm</button>
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-cart" /> Giỏ hàng (0)
                </a>
              </li>

              {renderLoginUI()}

            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}