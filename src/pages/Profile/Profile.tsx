import React, { useEffect } from 'react'
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useFormik } from 'formik';
import { getProfileAsyncApi } from '../../redux/UserReducer/userReducer';
type Props = {}


export default function Profile({ }: Props) {

  const frmUserProfile = useFormik({
    initialValues:{},
    onSubmit:(values:any) => {

    }
  })

  const { userProfile } = useSelector((state: RootState) => state.userReducer);
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    const actionThunk = getProfileAsyncApi();
      dispatch(actionThunk);
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {/* Profile Section */}
            <div className="text-center">
              <img src={userProfile?.avatar} alt="Avatar" className="profile-avatar" />
              <h4 className="mt-3">John Doe</h4>
            </div>
            <form className="mt-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={userProfile?.email} onChange={frmUserProfile.handleChange} type="email" className="form-control" id="email" placeholder="example@gmail.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input value={userProfile?.name} onChange={frmUserProfile.handleChange} type="text" className="form-control" id="name" placeholder="John Doe" />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input value={userProfile?.phone} onChange={frmUserProfile.handleChange} type="tel" className="form-control" id="phone" placeholder="+123 456 7890" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={userProfile?.password ? userProfile?.password :'123'} onChange={frmUserProfile.handleChange} type="password" className="form-control" id="password" placeholder="********" />
              </div>
              {/* <div className="form-group">
                <label>Giới tính:</label><br />
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="male" name="gender" defaultValue="male" />
                  <label className="form-check-label" htmlFor="male">Nam</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="female" name="gender" defaultValue="female" />
                  <label className="form-check-label" htmlFor="female">Nữ</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="other" name="gender" defaultValue="other" />
                  <label className="form-check-label" htmlFor="other">Khác</label>
                </div>
              </div> */}


              <button type="submit" className="btn btn-primary w-100">Update Profile</button>
            </form>
          </div>
          <div className="col-md-8">
            {/* Order History Section */}
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5>Order History</h5>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th> {/* Thêm cột Image */}
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img src="https://via.placeholder.com/50" alt="Wireless Headphones" className="img-fluid" />
                      </td> {/* Thêm hình ảnh cho sản phẩm */}
                      <td>Wireless Headphones</td>
                      <td>2</td>
                      <td>$50</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <img src="https://via.placeholder.com/50" alt="Bluetooth Speaker" className="img-fluid" />
                      </td>
                      <td>Bluetooth Speaker</td>
                      <td>1</td>
                      <td>$75</td>
                      <td>$75</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <img src="https://via.placeholder.com/50" alt="Smartwatch" className="img-fluid" />
                      </td>
                      <td>Smartwatch</td>
                      <td>1</td>
                      <td>$120</td>
                      <td>$120</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={5} className="text-end">Total Amount</th>
                      <th>$295</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}