import React from 'react'
import {useFormik} from 'formik'
import  * as yup from 'yup'
import {loginAsyncApi} from '../../redux/UserReducer/userReducer';
import { DispatchType } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { NavigationType, useNavigate } from 'react-router';
type Props = {}


export type UserLoginModel = {
  email:string,
  password:string,

}

export default function Login({ }: Props) {

  const dispatch:DispatchType = useDispatch();
  const navigate = useNavigate();

  const frmLogin = useFormik<UserLoginModel>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email can not is blank!'),//.email('email is invalid'),
      password: yup.string().min(3,'password must be at least 3 characters')
    }),
    onSubmit: (values:UserLoginModel ) => {
       console.log("🚀 ~ Login ~ values:", values);
       const actionAsyncLogin = loginAsyncApi(values);
       dispatch(actionAsyncLogin);
       navigate("/");

    }
  })



  return (
    <form className='container' onSubmit={frmLogin.handleSubmit}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-25">
          <h3>Login</h3>
          <div className="form-group">
            <p>Email</p>
            <input defaultValue={"string"} className='form-control' name="email" onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur}/>
            {frmLogin.errors.email && <div className='text text-danger'>{frmLogin.errors.email}</div>}
          </div>
          <div className="form-group">
            <p>Password</p>
            <input defaultValue={"string"} className='form-control' name="password" type='password'onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur}/>
            {frmLogin.errors.password && <div className='text text-danger'>{frmLogin.errors.password}</div>}
          </div>
          <div className="form-group">
            <button className='btn btn-success' type='submit'>Login</button>
          </div>
        </div>
      </div>
    </form>
  )
}