import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import heroImage1 from '../assets/image-2.png';
import heroImage2 from '../assets/images/hero2.png';
import heroImage3 from '../assets/images/hero3.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import BehanceIcon from '@mui/icons-material/Brush'; // Placeholder for Behance

const slides = [
  {
    image: heroImage1,
    title: (
      <>
        Fresh Flavors &<br />Creative Catering Services<br />provider
      </>
    ),
    description: (
      <>
        Maria's Food Catering & Services offers an elegant fine dining experience, blending Filipino flavors with modern culinary techniques. From succulent lechon belly to gourmet seafood sinigang, each dish is beautifully plated and made with fresh, high-quality ingredients.<br />
        Perfect for weddings, corporate events, and special celebrations, Maria's ensures impeccable service and a refined dining experience for every occasion.
      </>
    ),
  },
  {
    image: heroImage2,
    title: (
      <>
        Savor Every Bite<br />with Exquisite Presentation<br />and Taste
      </>
    ),
    description: (
      <>
        Experience a fusion of tradition and innovation. Our chefs craft each dish with passion, ensuring a memorable dining experience for you and your guests.<br />
        Book us for your next event and taste the difference!
      </>
    ),
  },
  {
    image: heroImage3,
    title: (
      <>
        Celebrate Moments<br />with Gourmet Catering<br />Excellence
      </>
    ),
    description: (
      <>
        From intimate gatherings to grand celebrations, we deliver culinary perfection and impeccable service every time.<br />
        Discover our menu and let us make your event unforgettable.
      </>
    ),
  },
];

const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#222',
  fontSize: '1.2rem',
  gap: 2,
  '& svg': {
    fontSize: '2rem',
    marginBottom: 2,
  },
  '& a': {
    color: '#222',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginTop: 2,
  },
}));

const HeroRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'stretch',
  background: '#fff',
  marginTop: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: 'auto',
    marginTop: theme.spacing(6),
  },
  position: 'relative',
}));

const LeftCol = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 4, 4, 8),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 2, 2, 2),
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const RightCol = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  [theme.breakpoints.down('md')]: {
    minHeight: 300,
    padding: theme.spacing(2, 0),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  height: 'auto',
  borderRadius: 0,
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    borderRadius: 0,
  },
}));

const OurMenuButton = styled(Button)(({ theme }) => ({
  background: '#b71c1c',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  borderRadius: 10,
  padding: theme.spacing(1.2, 4),
  marginTop: theme.spacing(4),
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    background: '#b71c1c',
  },
}));

const SocialsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
}));

const SliderDots = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(2),
  zIndex: 10,
}));

const Dot = styled(Box)(({ active, theme }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  background: active ? '#b71c1c' : '#eee',
  border: active ? '2px solid #b71c1c' : '2px solid #eee',
  cursor: 'pointer',
  transition: 'background 0.3s, border 0.3s',
}));

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[activeIndex];

  return (
    <HeroRoot>
      <LeftCol>
        <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' }, mb: 2, lineHeight: 1.1 }}>
          {currentSlide.title}
        </Typography>
        <Typography sx={{ color: '#222', fontSize: { xs: '1rem', md: '1.2rem' }, mb: 2, maxWidth: 540 }}>
          {currentSlide.description}
        </Typography>
        <OurMenuButton onClick={() => navigate('/kitchen')}>
          Our Menu&nbsp;&nbsp;{'>'}
        </OurMenuButton>
        <SocialsRow>
          <SocialIcon>
            <FacebookIcon />
            <Link href="#" target="_blank">Fb</Link>
          </SocialIcon>
          <SocialIcon>
            <BehanceIcon />
            <Link href="#" target="_blank">Behance</Link>
          </SocialIcon>
          <SocialIcon>
            <WhatsAppIcon />
            <Link href="#" target="_blank">WhatsApp</Link>
          </SocialIcon>
          <SocialIcon>
            <PhoneIcon />
            <Link href="#" target="_blank">Phone</Link>
          </SocialIcon>
        </SocialsRow>
      </LeftCol>
      <RightCol>
        <HeroImage src={currentSlide.image} alt="Catering" />
      </RightCol>
      <SliderDots>
        {slides.map((_, idx) => (
          <Dot
            key={idx}
            active={idx === activeIndex}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </SliderDots>
    </HeroRoot>
  );
};

export default HeroSection; 