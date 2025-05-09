import React, { useState, useEffect } from 'react';
import { Box, Typography, styled, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, TextField, Button, IconButton } from '@mui/material';
import { Edit, KeyboardArrowDown, KeyboardArrowUp, AccountBalanceWallet, Close } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import logo from '../assets/BoldTribe Logo-7.svg';

const ProfileCard = styled(Box)({
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  padding: '40px',
  maxWidth: '1200px',
  width: '100%',
  position: 'relative',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
});

const ProfileImage = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid white',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
});

const EditButton = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  cursor: 'pointer',
  color: '#C4362A',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  gap: '20px'
});

const Label = styled(Typography)({
  fontWeight: 500,
  minWidth: '120px',
  color: '#333'
});

const Value = styled(Typography)({
  color: '#666',
  flex: 1
});

const TransactionButton = styled(Box)(({ isOpen }) => ({
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: isOpen ? '10px 10px 0 0' : '10px',
  marginTop: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f8f8f8'
  }
}));

const TransactionHistory = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '0 0 10px 10px',
  overflow: 'hidden',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 500,
  color: '#333',
  padding: '12px 16px',
  borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
  '&.header': {
    backgroundColor: '#f5f5f5',
    color: '#666'
  }
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fafafa',
  },
  '&:last-child td': {
    borderBottom: 0,
  },
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  }
});

const Note = styled(Typography)({
  color: '#666',
  fontSize: '14px',
  marginTop: '30px',
  padding: '20px',
  backgroundColor: 'rgba(196, 54, 42, 0.05)',
  borderRadius: '10px'
});

const WalletButton = styled(Box)({
  backgroundColor: '#C4362A',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  marginTop: '20px',
  width: 'fit-content',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(196, 54, 42, 0.2)'
  }
});

const WalletModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const WalletCard = styled(Box)({
  backgroundColor: '#8B7FD4',
  borderRadius: '20px',
  padding: '40px',
  width: '90%',
  maxWidth: '600px',
  color: 'white',
  position: 'relative',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  '& h1': {
    fontSize: '32px',
    fontWeight: 600,
    marginBottom: '40px',
    textAlign: 'center'
  }
});

const WalletInfo = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '20px'
});

const WalletAmount = styled(Box)({
  '& h3': {
    fontSize: '24px',
    fontWeight: 500,
    marginBottom: '20px'
  }
});

const EditModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const EditCard = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '40px',
  width: '90%',
  maxWidth: '600px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  '& h1': {
    fontSize: '32px',
    fontWeight: 600,
    marginBottom: '40px',
    textAlign: 'center'
  }
});

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '', address: '' });

  // Fetch user data from API on component mount
  useEffect(() => {
    console.log('ProfilePage mounted - fetching user data');
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get the stored token
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found. Please login again.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://3.108.237.86:3333/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User profile response:', response?.data?.data);
        
        if (response?.data?.data?.user) {
          const user = response?.data?.data?.user;
          setUserData({
            name: user?.name,
            email: user?.email,
            phone: user?.phone_number,
            address: user?.address || 'Not Available',
          });
          setEditData({
            name: user?.name,
            email: user?.email,
            phone: user?.phone_number,
            address: user?.address || 'Not Available',
          });
        }
        
        // Load transactions from localStorage
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch wallet balance for modal (simulate same as WalletModal.js)
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletUser, setWalletUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  useEffect(() => {
    if (!isWalletOpen) return;
    const token = localStorage.getItem('token');
    if (!token) {
      setWalletUser(null);
      setWalletLoading(false);
      return;
    }
    axios.get('http://3.108.237.86:3333/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setWalletUser(res.data?.data?.user || null);
        // setWalletBalance(res.data?.data?.user?.walletBalance || 0); // If you have wallet balance in user data
        setWalletLoading(false);
      })
      .catch(() => {
        setWalletUser(null);
        setWalletLoading(false);
      });
  }, [isWalletOpen]);

  const handleWalletOpen = () => setIsWalletOpen(true);
  const handleWalletClose = () => setIsWalletOpen(false);
  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      // Only send allowed fields
      const payload = {
        name: editData.name,
        phone_number: editData.phone,
        address: editData.address
      };
      const response = await axios.put('http://3.108.237.86:3333/api/users/profile', payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response?.data?.data?.user) {
        setUserData({
          name: response?.data?.data?.user?.name,
          email: response?.data?.data?.user?.email,
          phone: response?.data?.data?.user?.phone_number,
          address: response?.data?.data?.user?.address || 'Not Available',
        });
        handleEditClose();
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
      }
      setError('Failed to update user data. Please try again later.');
    }
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 90px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '120px',
      padding: '40px',
      width: '100%',
      '@media (max-width: 768px)': {
        marginTop: '80px',
        padding: '20px'
      }
    }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Profile
      </Typography>
      {loading ? (
        <Typography>Loading user data...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <ProfileCard>
          <EditButton onClick={handleEditOpen}>
            <Edit sx={{ fontSize: 24 }} />
          </EditButton>

          <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <InfoRow>
                <Label>Name :</Label>
                <Value>{userData ? userData.name : 'Not Available'}</Value>
              </InfoRow>

              <InfoRow>
                <Label>Email :</Label>
                <Value>{userData ? userData.email : 'Not Available'}</Value>
              </InfoRow>

              <InfoRow>
                <Label>Phone no. :</Label>
                <Value>{userData ? userData.phone : 'Not Available'}</Value>
              </InfoRow>

              <InfoRow>
                <Label>Address :</Label>
                <Value>{userData ? userData.address : 'Not Available'}</Value>
              </InfoRow>

              <WalletButton onClick={handleWalletOpen}>
                <AccountBalanceWallet />
                <Typography>Your Wallet</Typography>
              </WalletButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '200px' }}>
              <ProfileImage 
                src="https://example.com/placeholder.jpg" 
                alt="Profile" 
              />
            </Box>
          </Box>

          <Box>
            <TransactionButton 
              onClick={() => setIsTransactionOpen(!isTransactionOpen)}
              isOpen={isTransactionOpen}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {transactions.length > 0 ? 'View Transaction History' : 'No Transactions Yet'}
              </Typography>
              {transactions.length > 0 && (
                isTransactionOpen ? 
                  <KeyboardArrowUp sx={{ color: '#666', transition: 'transform 0.3s ease' }} /> : 
                  <KeyboardArrowDown sx={{ color: '#666', transition: 'transform 0.3s ease' }} />
              )}
            </TransactionButton>
            
            <Collapse in={isTransactionOpen}>
              <TransactionHistory>
                {transactions.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell className="header">Date</StyledTableCell>
                          <StyledTableCell className="header">Description</StyledTableCell>
                          <StyledTableCell className="header" align="right">Amount</StyledTableCell>
                          <StyledTableCell className="header" align="center">Status</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <StyledTableRow key={transaction.id}>
                            <StyledTableCell>{transaction.date}</StyledTableCell>
                            <StyledTableCell>{transaction.description}</StyledTableCell>
                            <StyledTableCell 
                              align="right"
                              sx={{ 
                                color: transaction.amount.startsWith('+') ? '#4caf50' : '#ff0000',
                                fontWeight: 500
                              }}
                            >
                              {transaction.amount}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography
                                sx={{
                                  display: 'inline-block',
                                  padding: '4px 12px',
                                  borderRadius: '12px',
                                  backgroundColor: transaction.status === 'Success' ? '#e8f5e9' : '#fff3e0',
                                  color: transaction.status === 'Success' ? '#2e7d32' : '#ef6c00',
                                  fontSize: '0.875rem'
                                }}
                              >
                                {transaction.status}
                              </Typography>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ 
                    padding: '40px', 
                    textAlign: 'center',
                    backgroundColor: '#f8f8f8'
                  }}>
                    <Typography variant="body1" color="text.secondary">
                      You haven't made any transactions yet. Start ordering food to see your transaction history here!
                    </Typography>
                  </Box>
                )}
              </TransactionHistory>
            </Collapse>
          </Box>

          <Note>
            Please Note:
            <br />
            1. You can use wallet money to make a purchase on Boldeats Website only.
            <br />
            2. Your money is 100 % safe with us.
            <br />
            3. {transactions.length === 0 && "Make your first order to start your transaction history!"}
          </Note>

          <WalletModal
            open={isWalletOpen}
            onClose={handleWalletClose}
            aria-labelledby="wallet-modal"
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
                  onClick={handleWalletClose}
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
                  {!walletLoading && walletUser && (
                    <Typography variant="h6" sx={{ fontWeight: 400, fontSize: isMobile ? '18px' : '20px', mb: 2 }}>
                      Hi {walletUser.name}, welcome to BoldEats Wallet
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
                    {walletBalance}
                  </Box>
                </Box>
              </Box>
            </Box>
          </WalletModal>

          <EditModal
            open={isEditOpen}
            onClose={handleEditClose}
            aria-labelledby="edit-modal"
          >
            <EditCard>
              <IconButton 
                onClick={handleEditClose}
                sx={{ 
                  color: '#333', 
                  position: 'absolute', 
                  right: 16, 
                  top: 16, 
                  zIndex: 2,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                }}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography variant="h1">Edit Profile</Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editData.email}
                margin="normal"
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={editData.address}
                onChange={handleEditChange}
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                Update
              </Button>
            </EditCard>
          </EditModal>
        </ProfileCard>
      )}
    </Box>
  );
};

export default ProfilePage; 