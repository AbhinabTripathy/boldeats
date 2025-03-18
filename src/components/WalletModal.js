import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import logo from '../assets/images/BoldTribe Logo-2.svg';

const WalletModal = ({ open, onClose }) => {
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
          width: 900,
          height: 238,
          bgcolor: '#9797d3',
          borderRadius: '25px',
          boxShadow: 24,
          padding: '16px 24px',
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
          alignItems: 'center'
        }}>
          {/* Logo and Title */}
          <Box sx={{ mb: 2 }}>
            <img 
              src={logo} 
              alt="BoldEats" 
              style={{ 
                height: '60px',
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
                fontSize: '24px'
              }}
            >
              Your wallet
            </Typography>
          </Box>

          {/* Wallet Information */}
          <Box sx={{ 
            width: '100%',
            padding: '0 48px'
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 2
            }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '20px' }}>
                Balance : ₹350
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '20px' }}>
                Month : jan
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '20px' }}>
                last pay : ₹250
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '20px' }}>
                recharged : ₹1000
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default WalletModal; 