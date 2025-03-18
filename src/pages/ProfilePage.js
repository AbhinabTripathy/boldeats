import React, { useState } from 'react';
import { Box, Typography, styled, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal } from '@mui/material';
import { Edit, KeyboardArrowDown, KeyboardArrowUp, AccountBalanceWallet } from '@mui/icons-material';

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 180px)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '120px',
  marginBottom: '60px',
  padding: '40px',
  alignItems: 'center',
  justifyContent: 'center'
});

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

const ProfilePage = () => {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: '2024-02-20',
      description: 'Wallet Recharge',
      amount: '+₹500',
      status: 'Success'
    },
    {
      id: 2,
      date: '2024-02-19',
      description: 'Food Order #123',
      amount: '-₹250',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-02-18',
      description: 'Subscription Payment',
      amount: '-₹999',
      status: 'Success'
    },
    {
      id: 4,
      date: '2024-02-17',
      description: 'Wallet Recharge',
      amount: '+₹1000',
      status: 'Success'
    }
  ];

  const handleWalletOpen = () => setIsWalletOpen(true);
  const handleWalletClose = () => setIsWalletOpen(false);

  return (
    <PageContainer>
      <ProfileCard>
        <EditButton>
          <Edit sx={{ fontSize: 24 }} />
        </EditButton>

        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <InfoRow>
              <Label>Name :</Label>
              <Value>Nikita Pradhan</Value>
            </InfoRow>

            <InfoRow>
              <Label>Ph no. :</Label>
              <Value>564189452634</Value>
            </InfoRow>

            <InfoRow>
              <Label>Gender :</Label>
              <Value>Female</Value>
            </InfoRow>

            <InfoRow>
              <Label>Address :</Label>
              <Value>sebfiwaebfkjasevfiu</Value>
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
              view transaction history
            </Typography>
            {isTransactionOpen ? 
              <KeyboardArrowUp sx={{ color: '#666', transition: 'transform 0.3s ease' }} /> : 
              <KeyboardArrowDown sx={{ color: '#666', transition: 'transform 0.3s ease' }} />
            }
          </TransactionButton>
          
          <Collapse in={isTransactionOpen}>
            <TransactionHistory>
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
            </TransactionHistory>
          </Collapse>
        </Box>

        <Note>
          Please Note:
          <br />
          1. You can use wallet money to make a purchase on Boldeats Website only.
          <br />
          2. Your money is 100 % safe with us.
        </Note>

        <WalletModal
          open={isWalletOpen}
          onClose={handleWalletClose}
          aria-labelledby="wallet-modal"
        >
          <WalletCard>
            <Typography variant="h1">Your wallet</Typography>
            
            <WalletInfo>
              <WalletAmount>
                <Typography variant="h3">Balance : ₹350</Typography>
                <Typography variant="h3">last pay : ₹250</Typography>
              </WalletAmount>
              
              <Box>
                <Typography sx={{ textAlign: 'right', mb: 2 }}>Month : jan</Typography>
                <Typography sx={{ textAlign: 'right' }}>recharged : ₹1000</Typography>
              </Box>
            </WalletInfo>
          </WalletCard>
        </WalletModal>
      </ProfileCard>
    </PageContainer>
  );
};

export default ProfilePage; 