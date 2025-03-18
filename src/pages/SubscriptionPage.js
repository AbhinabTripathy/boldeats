import React, { useState } from 'react';
import { Box, Typography, TextField, Button, styled } from '@mui/material';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '90px',
  marginBottom: '90px',
  justifyContent: 'center',
  alignItems: 'center'
});

const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  padding: '40px 0'
});

const RedSection = styled(Box)({
  backgroundColor: '#C4362A',
  padding: '20px',
  color: 'white',
  height: '200px',
  position: 'relative',
  marginBottom: '300px',
  width: '100%'
});

const SubscriptionCard = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '40px',
  width: '1165px',
  height: '395px',
  margin: '0 auto',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  border: '2px solid #E0E0E0',
  position: 'absolute',
  top: '150px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  '@media (max-width: 1200px)': {
    width: '90%',
    height: 'auto',
    minHeight: '395px'
  },
  marginTop: '120px'
});

const AmountButton = styled(Button)(({ selected }) => ({
  backgroundColor: 'white',
  color: '#000',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '8px 16px',
  margin: '0 8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  textTransform: 'none',
  fontWeight: 'normal',
}));

const SubscribeButton = styled(Button)({
  backgroundColor: '#D87C74',
  color: 'white',
  padding: '12px 40px',
  borderRadius: '4px',
  fontSize: '16px',
  textTransform: 'none',
  marginTop: '24px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#C4362A',
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#E0E0E0',
    },
  },
});

const SubscriptionPage = () => {
  const [customAmount, setCustomAmount] = useState('');
  const amounts = [1000, 1500, 1700, 2000];

  const handleAmountSelect = (amount) => {
    setCustomAmount(amount.toString());
  };

  return (
    <PageContainer>
      <MainContent>
        <RedSection>
          <Box sx={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '40px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'normal', mb: 1 }}>
              Nikita
            </Typography>
            <Typography variant="body1">
              5464984568489
            </Typography>
          </Box>
        </RedSection>

        <SubscriptionCard>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', fontSize: '24px' }}>
            Please enter an amount
          </Typography>
          
          <CustomTextField
            fullWidth
            placeholder="Please enter an amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            sx={{ mb: 4 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap' }}>
            {amounts.map((amount) => (
              <AmountButton
                key={amount}
                onClick={() => handleAmountSelect(amount)}
              >
                ₹{amount}
              </AmountButton>
            ))}
          </Box>

          <Box>
            <SubscribeButton variant="contained">
              subscribe
            </SubscribeButton>
          </Box>
        </SubscriptionCard>
      </MainContent>
    </PageContainer>
  );
};

export default SubscriptionPage; 