import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import cogoToast from 'cogo-toast'
import axios from 'axios'
import './App.scss'

function App() {
  const [details, setDetails] = useState({ username: '', password: '' })
  const [usernameActive, setUsernameActive] = useState(false)
  const [passActive, setPassActive] = useState(false)
  const [cookies, setCookie] = useCookies(['recent_user']);
  const usernameRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const login = (details) => {
    if (details.username === '') {
      //Người dùng chưa điền tài khoản
      cogoToast.error('Vui lòng điền tài khoản')
    } else if (details.password === '') {
      //Người dùng chưa nhập mật khẩu
      cogoToast.error('Vui lòng nhập mật khẩu')
    } else {
      // Gửi request kiểm tra chính chủ
      axios
        .post('http://localhost:8080/student_management/login', {
          username: details.username,
          password: details.password,
        })
        .then((res) => {
          if (res.data.status === 'success') {
            localStorage.setItem(
              'user-info',
              JSON.stringify({
                id: res.data.id,
                role: res.data.role,
                firstName: res.data.firstName.trim(),
                lastName: res.data.lastName.trim(),
                email: res.data.email,
                phone: res.data.phone,
              })
            )
            let recentUser = []
            if (cookies.recent_user) {
              recentUser = cookies.recent_user
            }
            var today = new Date()
            const logintime = today.getHours() + ':' + today.getMinutes() + ' ngày ' + today.getDate() +  '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
            if (!recentUser.find(item => item.name === res.data.firstName + ' ' + res.data.lastName)) {
              recentUser = [...recentUser, {name: res.data.firstName + ' ' + res.data.lastName, time: logintime}]
            } else {
              recentUser.forEach(item => {
                if (item.name === res.data.firstName + ' ' + res.data.lastName) {
                  item.time = logintime
                }
              })
            }
            setCookie('recent_user', recentUser, {
              path: '/home'
            })
            navigate('/home')
          } else {
            cogoToast.error('Tài khoản hoặc mật khẩu không đúng')
          }
        })
    }
  }

  //Xử lý đăng nhập
  const submitHandler = (e) => {
    e.preventDefault()

    login(details)
  }

  //Xử lý front end
  const usernameFocusHandler = () => {
    if (!usernameActive) {
      setUsernameActive(true)
    }
  }

  const usernameBlurHandler = () => {
    if (usernameRef.current.value === '') {
      setUsernameActive(false)
    }
  }

  const passFocusHandler = () => {
    if (!passActive) {
      setPassActive(true)
    }
  }

  const passBlurHandler = () => {
    if (passwordRef.current.value === '') {
      setPassActive(false)
    }
  }

  return (
    <div class='login-form-container'>
      <form onSubmit={submitHandler} className='login-form'>
        <div className='form-content'>
          <h3>Phần mềm quản lý sinh viên</h3>
          <h2>Xin chào</h2>
          {/* Error */}
          <div
            className={`form-group
                    form-username
                    ${usernameActive && 'focus'}`}
          >
            <div className='i-container'>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className='input-container'>
              <h5>Tài khoản</h5>
              <input
                ref={usernameRef}
                type='username'
                name='username'
                id='username'
                onChange={(e) =>
                  setDetails({
                    ...details,
                    username: e.target.value,
                  })
                }
                value={details.username}
                onFocus={usernameFocusHandler}
                onBlur={usernameBlurHandler}
              />
            </div>
          </div>
          <div
            className={`form-group
                    form-pass
                    ${passActive && 'focus'}`}
          >
            <div className='i-container'>
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div className='input-container'>
              <h5>Mật khẩu</h5>
              <input
                ref={passwordRef}
                type='password'
                name='password'
                id='password'
                onChange={(e) =>
                  setDetails({
                    ...details,
                    password: e.target.value,
                  })
                }
                value={details.password}
                onFocus={passFocusHandler}
                onBlur={passBlurHandler}
              />
            </div>
          </div>
          <div className='remember-me'>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: '#e85a4f',
                    '&.Mui-checked': {
                      color: '#e85a4f',
                    },
                  }}
                  size='small'
                />
              }
              label='Ghi nhớ'
            />
          </div>
          <div className='divider'></div>
          <input type='submit' value='Đăng nhập' className='login-submit-btn' />
        </div>
      </form>
      <img src={require('./Teaching-amico.png')} alt='Teaching amico' />
    </div>
  )
}

export default App
