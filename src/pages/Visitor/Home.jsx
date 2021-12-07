import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Stack, Box, Divider, Link } from '@mui/material';
import Footer from '../../components/basic/Footer';
import UiOverlay from '../../components/basic/UiOverlay';
import Content from '../../components/basic/Content';
import CardComponent from '../../components/basic/CardComponent';
import DownhillSkiingOutlinedIcon from '@mui/icons-material/DownhillSkiingOutlined';
import MuiTheme from '../../styles/MuiTheme';

export default function Home() {
  const staticImgUrl = "https://storage.googleapis.com/wsu-oepping.appspot.com/live/current.jpg"
  const getImgUrl = () => `${staticImgUrl}?t=${new Date().getTime()}`

  const [imgUrl, setImgUrl] = React.useState(getImgUrl());

  React.useEffect(() => {
    const timeout = setTimeout(() => setImgUrl(getImgUrl()), 60000)
    console.log('setUrl')
    return () => clearTimeout(timeout)
  },[imgUrl])

  const channelId = 'UCdVMBy8y3RsGxb5wqodHIBg';
  const staticStreamUrl = `https://www.youtube.com/channel/${channelId}/live`;
  return (
    <>
      <UiOverlay />
      <Content>
        <Stack 
          justifyContent='center' 
          gap='40px' 
          direction='row' 
          flexWrap='wrap'
          textAlign='center'
        >
          <Box>
            {/* <DownhillSkiingOutlinedIcon sx={{fontSize: '3rem'}}/> */}
            <Typography variant='h4' sx={{wordBreak: 'break-word'}}>
              Wintersportunion Oepping
            </Typography>
          </Box>
          <Divider sx={{ width: '80%' }} />
          <CardComponent>
            <Typography variant='h5'>
              Foto
            </Typography>
            <img 
              style={{
                width: '100%', 
                borderRadius: MuiTheme.shape.borderRadius,
              }} 
              src={imgUrl}
            />
            <Typography variant='h6'>
              Statischer Link
            </Typography>
            <Link variant='body1' href={staticImgUrl}>
              {staticImgUrl}
            </Link>
            <Button 
              onClick={() => navigator.clipboard.writeText(staticImgUrl)}
              variant='outlined'
            >
              Kopieren
            </Button>
            <Typography variant='body1'>
              Wird alle 60s aktualisiert.
            </Typography>
          </CardComponent>
          <CardComponent>
            <Typography variant='h5'>
              Live Stream
            </Typography>
            <iframe
              style={{
                width: '100%', 
                aspectRatio: '16 / 9', 
                borderRadius: MuiTheme.shape.borderRadius
              }}
              src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`}
              frameBorder="0"
              allowFullScreen
              title="Livestream"
            />
            <Typography variant='h6'>
              Statischer Link
            </Typography>
            <Link variant='body1' href={staticStreamUrl}>
              {staticStreamUrl}
            </Link>
            <Button
              onClick={() => navigator.clipboard.writeText(staticStreamUrl)}
              variant='outlined'
            >
              Kopieren
            </Button>
          </CardComponent>
        </Stack>
      </Content>
      <Footer />
    </>
  )
}
