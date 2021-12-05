import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Stack, Box, Divider } from '@mui/material';
import Footer from '../components/basic/Footer';
import UiOverlay from '../components/basic/UiOverlay';
import Content from '../components/basic/Content';
import CardComponent from '../components/basic/CardComponent';
import DownhillSkiingOutlinedIcon from '@mui/icons-material/DownhillSkiingOutlined';
import MuiTheme from '../styles/MuiTheme';

export default function Home() {
  const staticImgUrl = "https://storage.googleapis.com/wsu-oepping.appspot.com/live/current.jpg"
  const getImgUrl = () => `${staticImgUrl}?t=${new Date().getTime()}`

  const [imgUrl, setImgUrl] = React.useState(getImgUrl());

  React.useEffect(() => {
    const timeout = setTimeout(() => setImgUrl(getImgUrl()), 60000)
    console.log('setUrl')
    return () => clearTimeout(timeout)
  },[imgUrl])

  const embedId = '6T-QUo_0xtQ';
  return (
    <>
      <UiOverlay />
      <Content>
        <Stack 
          justifyContent='center' 
          gap='40px' 
          direction='row' 
          flexWrap='wrap'
        >
          <Box sx={{textAlign: 'center'}}>
            <DownhillSkiingOutlinedIcon sx={{fontSize: '3rem'}}/>
            <Typography variant='h3' textAlign='center'>
              Wintersportunion Oepping
            </Typography>
          </Box>
          <Divider sx={{ width: '80%' }} />
          <CardComponent>
            <Typography variant='h4'>
              Foto
            </Typography>
            <img 
              style={{
                width: '100%', 
                borderRadius: MuiTheme.shape.borderRadius,
              }} 
              src={imgUrl}
            />
            <Button 
              variant='contained'
              href={imgUrl}
            >
              Aktuelles Foto (Link für current.jpg)
            </Button>
            <Typography variant='body1' textAlign='center'>
              Anmerkung link: ?t=(nummer) braucht ma nd, is nur dass nd vom browser cache bezogen wird.
            </Typography>
          </CardComponent>
          <CardComponent>
            <Typography variant='h4'>
              Live Stream
            </Typography>
            <iframe
              style={{
                width: '100%', 
                aspectRatio: '16 / 9', 
                borderRadius: MuiTheme.shape.borderRadius
              }}
              src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`}
              frameBorder="0"
              allowFullScreen
              title="Livestream"
            />
          </CardComponent>
        </Stack>
      </Content>
      <Footer />
    </>
  )
}
