import React from 'react';
import { Container, Typography, Paper, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/BoldTribe Logo-2.svg';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6, 4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 6),
  },
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const LogoImage = styled('img')({
  height: '80px',
  width: 'auto',
  marginBottom: '32px',
});

const CancellationPolicy = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="lg">
      <IconButton 
        onClick={() => navigate(-1)}
        sx={{ 
          position: 'absolute',
          left: { xs: '16px', sm: '24px', md: '32px' },
          top: { xs: '16px', sm: '24px', md: '32px' }
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <ContentPaper>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <LogoImage src={logo} alt="BoldEats Logo" />
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: '#333',
          mb: 4,
          fontSize: { xs: '24px', sm: '28px', md: '32px' },
          textAlign: 'center'
        }}>
          Cancellation Policy for BoldEats
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          1. Order Cancellation
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444',
          pl: 2
        }}>
          • Orders can be canceled within 30 minutes of placement.<br />
          • Once food preparation has begun, cancellations may not be possible.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          2. Refund on Cancellation
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          Refunds for cancellations depend on the status of order processing and preparation.
        </Typography>
      </ContentPaper>
    </StyledContainer>
  );
};

export default CancellationPolicy; 