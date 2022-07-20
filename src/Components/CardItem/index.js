import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import './CardItem.scss'

function CardItem(props) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    image={require('./default-pfp.png')}
                    alt='profile picture'
                />
                <CardContent>
                    <Typography variant='body2' color='#9e9d8a'>
                    <span className='name'>{props.name}</span>
                        <br />
                        Truy cập lúc {props.time}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardItem