import Navbar from '../../Components/Navbar'
import { useState, useEffect } from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Classlist.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button } from '../../Components/Button'
import axios from 'axios'
import cogoToast from 'cogo-toast'

function Classlist() {
    const [userList, setUserList] = useState([])
    const [currentToggled, setCurrentToggled] = useState({})
    const [open, setOpen] = useState(false)
    const [modifyOpen, setModifyOpen] = useState(false)
    const [modifyButton, setModifyButton] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user-info'))

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        fontSize: '1.5rem',
        lineHeight: '2.2',
        color: '#e98074',
        bgcolor: '#d8c3a5',
        border: '1px solid #e85a4f',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: 0,
    }

    useEffect(() => {
        axios
            .get('http://localhost:8080/student_management/user')
            .then((res) => {
                setUserList(res.data.users)
            })
            .catch(() => {
                cogoToast.error('Có lỗi xảy ra')
            })
    }, [])

    const handleModifyProfile = (id) => {
        setCurrentToggled(userList.find(item => item.id === id))
        setModifyOpen(true)
    }

    const handleOpenProfile = (id) => {
        setCurrentToggled(userList.find(item => item.id === id))
        setOpen(true)
    }

    const handleModifyFinish = () => {
        axios
            .put('http://localhost:8080/student_management/modify', {
                modifyType: 'student',
                id: currentToggled.id.toString(),
                username: currentToggled.username,
                password: currentToggled.password,
                firstName: currentToggled.first_name.trim(),
                lastName: currentToggled.last_name.trim(),
                email: currentToggled.email,
                phone: currentToggled.phone,
                role: currentToggled.role,
            })
        setModifyOpen(false)
        setOpen(false)
        cogoToast.loading('Đang cập nhật...')
        window.setTimeout(() => cogoToast.success('Thành công'), 1300)
        window.setTimeout(() => window.location.reload(), 1500)
    }

    return (
        <div className='classlist-container'>
            <Navbar />
            <div className='classlist-content'>
                <h2>Danh sách sinh viên</h2>
                <hr />
                <ul>
                    {userList.map((item, index) => (
                        item.role !== 'teacher' && (<li key={index} onClick={() => handleOpenProfile(item.id)}>
                            {item.first_name + ' ' + item.last_name}
                            {userInfo.role === 'teacher' && <FontAwesomeIcon icon={faPenToSquare} className='edit-icon' border onClick={() => handleModifyProfile(item.id)} />}
                        </li>)
                    ))}
                </ul>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby='parent-modal-title'
                    aria-describedby='parent-modal-description'
                >
                    <Box sx={{ ...style }}>
                        <h2 id='parent-modal-title'>Hồ sơ sinh viên</h2>
                        <p id='parent-modal-description'>
                            Họ và tên: {currentToggled.first_name + ' ' + currentToggled.last_name}
                            <br />
                            {userInfo.role === 'teacher' && <>
                                Tài khoản:  {currentToggled.username}
                                <br />
                                Mật khẩu: {currentToggled.password}
                                <br />
                            </>}
                            Email: {currentToggled.email}
                            <br />
                            Điện thoại: {currentToggled.phone}
                        </p>
                    </Box>
                </Modal>
                <Modal
                    open={modifyOpen}
                    onClose={() => {
                        setModifyOpen(false)
                        setOpen(false)
                    }}
                    aria-labelledby='parent-modal-title'
                    aria-describedby='parent-modal-description'
                >
                    <Box sx={{ ...style }}>
                        <h2 id='parent-modal-title'>Hồ sơ sinh viên</h2>
                        <p id='parent-modal-description'>
                            <label>Họ và tên:&nbsp;</label>
                            <span
                                className='classlist-span'
                                contentEditable={true}
                                onBlur={event => {
                                    const nameSplit = event.currentTarget.textContent.lastIndexOf(' ')
                                    const firstName = event.currentTarget.textContent.substring(0, nameSplit)
                                    const lastName = event.currentTarget.textContent.substring(nameSplit + 1)
                                    setCurrentToggled({ ...currentToggled, first_name: firstName, last_name: lastName })
                                }}
                                onInput={() => setModifyButton(true)}
                            >
                                {currentToggled.first_name + ' ' + currentToggled.last_name}
                            </span>
                            <br />
                            <label>Tài khoản:&nbsp;</label>
                            <span
                                className='classlist-span'
                                contentEditable='true'
                                onInput={event => {
                                    const username = event.currentTarget.textContent
                                    setCurrentToggled({ ...currentToggled, username: username })
                                    setModifyButton(true)
                                }}
                            >
                                {currentToggled.username}
                            </span>
                            <br />
                            <label>Mật khẩu:&nbsp;</label>
                            <span
                                className='classlist-span'
                                contentEditable='true'
                                onInput={event => {
                                    const password = event.currentTarget.textContent
                                    setCurrentToggled({ ...currentToggled, password: password })
                                    setModifyButton(true)
                                }}
                            >
                                {currentToggled.password}
                            </span>
                            {userInfo.role === 'teacher' && (<br />)}
                            <label>Email:&nbsp;</label>
                            <span
                                className='classlist-span'
                                contentEditable='true'
                                onInput={event => {
                                    const email = event.currentTarget.textContent
                                    setCurrentToggled({ ...currentToggled, email: email })
                                    setModifyButton(true)
                                }}
                            >
                                {currentToggled.email}
                            </span>
                            <br />
                            <label>Điện thoại:&nbsp;</label>
                            <span
                                className='classlist-span'
                                contentEditable='true'
                                onInput={event => {
                                    const phone = event.currentTarget.textContent
                                    setCurrentToggled({ ...currentToggled, phone: phone })
                                    setModifyButton(true)
                                }}
                            >
                                {currentToggled.phone}
                            </span>
                        </p>
                        <br />
                        <Button
                            children='Hoàn tất'
                            buttonStyle='btn--primary'
                            buttonSize='btn--extra--large'
                            buttonDisable={!modifyButton}
                            onClick={() => handleModifyFinish()}
                        />
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default Classlist
