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
          width: { xs: '90%', sm: '80%', md: '900px' },
          height: { xs: 'auto', sm: '238px' },
          minHeight: { xs: '300px', sm: '238px' },
          bgcolor: '#9797d3',
          borderRadius: '25px',
          boxShadow: 24,
          padding: { xs: '24px 16px', sm: '16px 24px' },
          color: 'white',
          overflow: 'auto'
        }}
      >
        {/* Close Button */}
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'white',
            position: 'absolute',
            right: { xs: 8, sm: 16 },
            top: { xs: 8, sm: 16 },
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
          pt: { xs: 2, sm: 0 }
        }}>
          {/* Logo and Title */}
          <Box sx={{ mb: { xs: 3, sm: 2 } }}>
            <img 
              src={logo} 
              alt="BoldEats" 
              style={{ 
                height: { xs: '50px', sm: '60px' },
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
                fontSize: { xs: '20px', sm: '24px' }
              }}
            >
              Your wallet
            </Typography>
          </Box>

          {/* Wallet Information */}
          <Box sx={{ 
            width: '100%',
            padding: { xs: '0 16px', sm: '0 48px' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: { xs: 3, sm: 2 },
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              gap: { xs: 2, sm: 0 }
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 400, 
                  fontSize: { xs: '16px', sm: '20px' },
                  width: { xs: '100%', sm: 'auto' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                Balance : ₹350
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 400, 
                  fontSize: { xs: '16px', sm: '20px' },
                  width: { xs: '100%', sm: 'auto' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                Month : jan
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              gap: { xs: 2, sm: 0 }
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 400, 
                  fontSize: { xs: '16px', sm: '20px' },
                  width: { xs: '100%', sm: 'auto' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                last pay : ₹250
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 400, 
                  fontSize: { xs: '16px', sm: '20px' },
                  width: { xs: '100%', sm: 'auto' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
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