import React from 'react';
import { Modal, Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import logo from '../assets/images/BoldTribe Logo-2.svg';

const WalletModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="wallet-modal"
      aria-describedby="wallet-details"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : 900,
          height: isMobile ? 'auto' : 238,
          bgcolor: '#9797d3',
          borderRadius: '25px',
          boxShadow: 24,
          padding: isMobile ? '16px' : '16px 24px',
          color: 'white'
        }}
      >
        {/* Close Button */}
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'white',
            position: 'absolute',
            right: 16,
            top: 16,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <Close />
        </IconButton>

        {/* Content Container */}
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: isMobile ? '20px' : '0'
        }}>
          {/* Logo and Title */}
          <Box sx={{ mb: 2 }}>
            <img 
              src={logo} 
              alt="BoldEats" 
              style={{ 
                height: isMobile ? '40px' : '60px',
                display: 'block',
                margin: '0 auto',
                marginBottom: '8px',
                filter: 'brightness(0) invert(1)'
              }} 
            />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 500,
                textAlign: 'center',
                fontSize: isMobile ? '20px' : '24px'
              }}
            >
              Your wallet
            </Typography>
          </Box>

          {/* Wallet Information */}
          <Box sx={{ 
            width: '100%',
            padding: isMobile ? '0 16px' : '0 48px'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between', 
              mb: 2,
              gap: isMobile ? 1 : 0
            }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: isMobile ? '18px' : '20px' }}>
                Balance : ₹0
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: isMobile ? '18px' : '20px' }}>
                Month : -
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              gap: isMobile ? 1 : 0
            }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: isMobile ? '18px' : '20px' }}>
                last pay : ₹0
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: isMobile ? '18px' : '20px' }}>
                recharged : ₹0
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default WalletModal; 