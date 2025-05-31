import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, useTheme, useMediaQuery, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import logo from '../assets/BoldTribe Logo-7.svg';
import axios from 'axios';

const WalletModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0); // Placeholder for balance
  const [transactions, setTransactions] = useState([]); // Placeholder for transaction history

  useEffect(() => {
    if (!open) return;
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Fetch user profile
    axios.get('https://api.boldeats.in/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUser(res.data?.data?.user || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });

    // Fetch wallet balance
    axios.get('https://api.boldeats.in/api/payment/wallet', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log('Wallet balance response:', res.data);
        if (res.data && res.data.data) {
          setBalance(res.data.data.balance || 0);
        }
      })
      .catch(error => {
        console.error('Error fetching wallet balance:', error);
        setBalance(0);
      });

    // TODO: Fetch transaction history here if available
    // setTransactions([...]);
  }, [open]);

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
          minHeight: isMobile ? 400 : 350,
          bgcolor: 'transparent',
          borderRadius: '25px',
          boxShadow: 24,
          p: 0,
          color: 'white',
        }}
      >
        {/* Gradient Background */}
        <Box sx={{
          width: '100%',
          height: '100%',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)',
          p: isMobile ? 2 : 4,
          position: 'relative',
        }}>
          {/* Close Button */}
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'white',
              position: 'absolute',
              right: 16,
              top: 16,
              zIndex: 2,
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
            pt: isMobile ? 5 : 2,
            pb: 2
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
                  fontSize: isMobile ? '20px' : '24px',
                  letterSpacing: 1
                }}
              >
                Wallet
              </Typography>
            </Box>

            {/* Hi, User */}
            {!loading && user && (
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: isMobile ? '18px' : '20px', mb: 2 }}>
                Hi {user.name}, welcome to BoldEats Wallet
              </Typography>
            )}

            {/* Total Balance */}
            <Box sx={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 3,
              px: 4,
              py: 2,
              mb: 3,
              minWidth: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: isMobile ? 22 : 28,
              letterSpacing: 1
            }}>
              <span style={{ fontSize: 28, marginRight: 8 }}>₹</span>
              {balance}
            </Box>

            {/* Transaction History */}
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 2, width: '100%' }} />
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, fontSize: isMobile ? 17 : 20 }}>
              Transaction History
            </Typography>
            <Box sx={{ width: '100%', maxHeight: 120, overflowY: 'auto', px: 1 }}>
              {transactions.length === 0 ? (
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, textAlign: 'center', mt: 2 }}>
                  No transactions yet.
                </Typography>
              ) : (
                transactions.map((txn, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>{txn.type === 'add' ? '+' : '-'}₹{txn.amount}</Typography>
                    <Typography sx={{ fontSize: 15, opacity: 0.8 }}>{txn.date}</Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default WalletModal; 