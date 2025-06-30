import React from 'react';
import { Box, Typography, Container, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send } from '@mui/icons-material';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#ff0000',
  color: 'white',
  width: '100%',
  maxWidth: '1251px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0),
  }
}));

const SubscribeForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  maxWidth: '500px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 2),
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
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
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  }
}));

const NewsletterSection = () => {
  const [query, setQuery] = React.useState('');
  const [error, setError] = React.useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (!query) {
      setError('Please enter your query');
      return;
    }

    // Open default email client with query as subject
    const mailtoLink = `mailto:support@boldeats.in?subject=${encodeURIComponent(query)}&body=Hello,%0D%0A%0D%0AThank you!`;
    window.location.href = mailtoLink;
  };

  return (
    <StyledSection>
      <Container maxWidth={false} sx={{ 
        maxWidth: '1251px',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 1,
            fontSize: { xs: '14px', sm: '15px', md: '16px' },
            px: { xs: 2, sm: 3, md: 0 }
          }}
        >
          Welcome to BoldEats, your ultimate solution to office meal woes, for something healthy, and delicious.
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontSize: { xs: '24px', sm: '28px', md: '32px' }
          }}
        >
          Newsletter
        </Typography>
        <SubscribeForm>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Enter your Query"
            size="small"
            value={query}
            onChange={handleQueryChange}
            error={!!error}
            helperText={error}
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'white',
                marginLeft: 0,
                marginTop: '4px'
              }
            }}
          />
          <IconButton 
            onClick={handleSubmit}
            sx={{ 
              backgroundColor: 'white', 
              '&:hover': { backgroundColor: '#f5f5f5' },
              [theme => theme.breakpoints.down('sm')]: {
                width: '100%',
                height: '40px'
              }
            }}
          >
            <Send sx={{ color: '#ff0000' }} />
          </IconButton>
        </SubscribeForm>
      </Container>
    </StyledSection>
  );
};

export default NewsletterSection; 