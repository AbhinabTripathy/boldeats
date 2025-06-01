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

const RefundPolicy = () => {
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
          Refund Policy for BoldEats
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          1. Eligibility
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          Refunds are applicable only for orders that meet the following criteria:
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444',
          pl: 2
        }}>
          • Incorrect or damaged food delivered.<br />
          • Orders not delivered within the committed time frame.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          2. Refund Process
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444',
          pl: 2
        }}>
          • Users must request a refund within 24 hours of receiving the order.<br />
          • Refunds will be processed within 5-7 business days.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          3. Exclusions
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          No refunds for food items that have been consumed or partially consumed unless there is a quality issue.
        </Typography>
      </ContentPaper>
    </StyledContainer>
  );
};

export default RefundPolicy; 