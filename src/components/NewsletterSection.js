import React from 'react';
import { Box, Typography, Container, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send } from '@mui/icons-material';

const StyledSection = styled(Box)({
  padding: '60px 0',
  backgroundColor: '#ff0000',
  color: 'white',
  width: '1251px',
  margin: '0 auto'
});

const SubscribeForm = styled(Box)({
  display: 'flex',
  gap: '10px',
  maxWidth: '500px',
  margin: '0 auto',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const NewsletterSection = () => {
  return (
    <StyledSection>
      <Container maxWidth={false} sx={{ maxWidth: '1251px' }}>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
          Welcome to BoldEats, your ultimate solution to office meal woes, for something healthy, and delicious.
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          Newsletter
        </Typography>
        <SubscribeForm>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Enter your Email"
            size="small"
          />
          <IconButton sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#f5f5f5' } }}>
            <Send sx={{ color: '#ff0000' }} />
          </IconButton>
        </SubscribeForm>
      </Container>
    </StyledSection>
  );
};

export default NewsletterSection; 