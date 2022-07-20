import Navbar from '../../Components/Navbar'
import { useState } from 'react'
import { Button } from '../../Components/Button'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import './Info.scss'

function Info() {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')))
    const [modifyInfoButton, setModifyInfoButton] = useState(false)

    const handleModifyInfoFinish = () => {
        axios
            .put('http://localhost:8080/student_management/modify', {
                modifyType: 'self',
                id: userInfo.id.toString(),
                username: 'username',
                password: 'password',
                firstName: userInfo.firstName.trim(),
                lastName: userInfo.lastName.trim(),
                email: userInfo.email,
                phone: userInfo.phone,
                role: userInfo.role,
            })
        localStorage.setItem('user-info', JSON.stringify(userInfo))
        cogoToast.loading('Đang cập nhật...')
        window.setTimeout(() => cogoToast.success('Thành công'), 1300)
        window.setTimeout(() => window.location.reload(), 1500)
    }

    return (
        <div className='info-container'>
            <Navbar />
            <div className='info-content'>
                <h2>Hồ sơ cá nhân</h2>
                <hr />
                Họ và tên:&nbsp;
                <span
                    contentEditable='true'
                    onBlur={event => {
                        const nameSplit = event.currentTarget.textContent.lastIndexOf(' ')
                        const firstName = event.currentTarget.textContent.substring(0, nameSplit)
                        const lastName = event.currentTarget.textContent.substring(nameSplit + 1)
                        setUserInfo({ ...userInfo, firstName: firstName, lastName: lastName })
                    }}
                    onInput={() => setModifyInfoButton(true)}
                >
                    {userInfo.firstName + ' ' + userInfo.lastName}
                </span>
                <br />
                Email:&nbsp;
                <span
                    contentEditable='true'
                    onInput={event => {
                        const email = event.currentTarget.textContent
                        setUserInfo({ ...userInfo, email: email })
                        setModifyInfoButton(true)
                    }}
                >
                    {userInfo.email}
                </span>
                <br />
                Điện thoại:&nbsp;
                <span
                    contentEditable='true'
                    onInput={event => {
                        const phone = event.currentTarget.textContent
                        setUserInfo({ ...userInfo, phone: phone })
                        setModifyInfoButton(true)
                    }}
                >
                    {userInfo.phone}
                </span>
                <br />
                Chức vụ:&nbsp;
                <span
                    contentEditable='false'
                >
                    {userInfo.role === 'student' ? 'Sinh viên' : 'Giáo viên'}
                </span>
                <br/>
                <br/>
                <Button
                    children='Hoàn tất'
                    buttonStyle='btn--primary'
                    buttonSize='btn--extra--large'
                    buttonDisable={!modifyInfoButton}
                    onClick={() => handleModifyInfoFinish()}
                />
            </div>
        </div>
    )
}

export default Info