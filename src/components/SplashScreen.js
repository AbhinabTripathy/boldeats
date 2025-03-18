import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/BoldTribe Logo-2.svg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
`;

const logoAnimation = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

const SplashContainer = styled(Box)(({ isExiting }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(49, 47, 43, 0.45)',
  backdropFilter: 'blur(4px)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  animation: isExiting ? `${fadeOut} 0.5s ease-out forwards` : 'none'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  animation: `${logoAnimation} 2s ease-out`,
  padding: theme.spacing(4),
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(3px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  }
}));

const Logo = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.2))',
  [theme.breakpoints.down('sm')]: {
    width: '100px',
    height: '100px',
  }
}));

const TextContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  animation: `${fadeIn} 1s ease-out 1s forwards`,
  opacity: 0,
  padding: theme.spacing(3),
  borderRadius: '15px',
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(3px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
  margin: theme.spacing(0, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 1),
  }
}));

const BrandName = styled(Typography)(({ theme }) => ({
  color: '#ff0000',
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  animation: `${fadeIn} 1s ease-out 2s forwards`,
  opacity: 0,
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  fontSize: { xs: '28px', sm: '32px', md: '36px' }
}));

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = React.useState(false);

  useEffect(() => {
    // Check if splash screen has been shown before
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
      // If splash has been shown before, redirect immediately to home
      navigate('/');
      return;
    }

    // If this is the first visit, show splash screen
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        // Set flag in localStorage
        localStorage.setItem('hasSeenSplash', 'true');
        navigate('/');
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // If splash has been shown before, don't render anything
  if (localStorage.getItem('hasSeenSplash')) {
    return null;
  }

  return (
    <SplashContainer isExiting={isExiting}>
      <LogoContainer>
        <Logo src={logo} alt="BoldEats Logo" />
      </LogoContainer>
      <TextContainer>
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            maxWidth: { xs: '100%', sm: '500px', md: '600px' },
            textAlign: 'center',
            lineHeight: 1.5,
            fontWeight: 500,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            fontSize: { xs: '18px', sm: '20px', md: '24px' },
            px: { xs: 2, sm: 3, md: 0 }
          }}
        >
          Craving home food? Get the warmth of mom's cooking with BoldEats!
        </Typography>
      </TextContainer>
      <BrandName variant="h4">
        - BoldEats
      </BrandName>
    </SplashContainer>
  );
};

export default SplashScreen; 