import Navbar from '../../Components/Navbar'
import CardItem from '../../Components/CardItem'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCookies } from 'react-cookie'
import 'swiper/css'
import 'swiper/css/navigation'
import './Home.scss'

function Home() {
    const [cookies, setCookie] = useCookies(['recent_user'])
    const recentUser = cookies.recent_user
    console.log(recentUser)

    return (
        <>
            <div className='home-container'>
                <Navbar />
                <div className='cards-container'>
                    <h2>Truy cập gần đây</h2>
                    <hr />
                    <div className='swiper-container'>
                        <Swiper
                            slidesPerView={3}
                            navigation={true}
                            modules={[Navigation]}
                            className='mySwiper'
                        >
                            {recentUser.map((item, index) => (
                                <SwiperSlide>
                                    <CardItem
                                        key={index}
                                        name={item.name !== '' && item.name}
                                        time={item.time !== '' && item.time}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home