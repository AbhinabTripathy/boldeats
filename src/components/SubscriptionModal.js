import React from 'react';
import { Dialog, DialogContent, Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/images/BoldTribe Logo-2.svg';
import { keyframes } from '@mui/system';
import SubscriptionImage from '../assets/images/DC7A1B6C-ED81-4D39-A17D-78C9089B9FC2.png';

// Define animations
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

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const SubscriptionModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+917684836139', '_blank');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          marginTop: isMobile ? '15vh' : '20vh',
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: isMobile ? 0.5 : 0.75,
          position: 'relative',
          animation: `${scaleIn} 0.3s ease-out`,
          maxWidth: isMobile ? '80%' : '400px',
          margin: isMobile ? 'auto 1 1 1' : 'auto 2 2 2',
          maxHeight: isMobile ? '70vh' : '75vh',
        }
      }}
      TransitionProps={{
        enter: true,
        timeout: 300,
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 4,
          top: 4,
          color: 'grey.500',
          '&:hover': {
            color: 'grey.700',
          },
          zIndex: 1,
          animation: `${fadeIn} 0.3s ease-out 0.1s both`,
          padding: 0.5,
        }}
      >
        <CloseIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
      </IconButton>

      <DialogContent sx={{ p: isMobile ? 0.75 : 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: isMobile ? 0.75 : 1,
          }}
        >
          {/* Logo */}
          <Box 
            component="img" 
            src={logo} 
            alt="Logo" 
            sx={{ 
              width: isMobile ? 90 : 120, 
              height: 'auto',
              animation: `${fadeIn} 0.3s ease-out 0.2s both`,
            }} 
          />
          
          {/* Subscription Image */}
          <Box
            component="img"
            src={SubscriptionImage}
            alt="Subscription"
            sx={{
              width: '100%',
              maxWidth: isMobile ? 150 : 200,
              height: 'auto',
              borderRadius: 1,
              boxShadow: 2,
              animation: `${fadeIn} 0.3s ease-out 0.3s both`,
            }}
          />
          
          {/* Text */}
          <Typography
            variant={isMobile ? "body2" : "body1"}
            align="center"
            sx={{ 
              mt: isMobile ? 0.75 : 1.25, 
              fontWeight: 'bold',
              animation: `${fadeIn} 0.3s ease-out 0.4s both`,
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              px: isMobile ? 0.75 : 1,
              lineHeight: 1.2,
            }}
          >
            For Subscription or Bulk Order Contact Us in WhatsApp
          </Typography>
          
          {/* WhatsApp Button */}
          <IconButton
            onClick={handleWhatsAppClick}
            sx={{
              backgroundColor: '#25D366',
              color: 'white',
              '&:hover': {
                backgroundColor: '#128C7E',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              },
              width: isMobile ? 36 : 44,
              height: isMobile ? 36 : 44,
              animation: `${fadeIn} 0.3s ease-out 0.5s both`,
              marginTop: isMobile ? 1.5 : 2,
            }}
          >
            <WhatsAppIcon sx={{ fontSize: isMobile ? 22 : 26 }} />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal; 