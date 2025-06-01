import React from 'react';
import { Box, Container, Typography, Paper, IconButton } from '@mui/material';
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

const TermsConditions = () => {
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
          Terms & Conditions for BoldEats
        </Typography>

        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          Welcome to BoldEats! By using our services, you agree to the following terms and conditions. Please read them carefully before using our platform.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          These Terms & Conditions govern your use of BoldEats, including our website, mobile application, and services. By accessing our platform, you agree to comply with these terms.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          2. Services Offered
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          BoldEats specializes in corporate food delivery services, ensuring timely and quality meal delivery for offices and business spaces.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          3. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          • Users must provide accurate information when placing an order.<br />
          • Unauthorized use of our platform is strictly prohibited.<br />
          • Users must comply with all applicable laws and regulations in Odisha.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          4. Payment & Pricing
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          • All prices are subject to change without prior notice.<br />
          • Payment must be made through authorized payment methods.<br />
          • In case of non-payment or fraudulent transactions, services may be suspended.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          5. Order Acceptance & Cancellation
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          • Orders are subject to acceptance and availability.<br />
          • We reserve the right to cancel any order due to unforeseen circumstances.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          6. Liability & Disclaimers
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          • We are not liable for any direct or indirect damages arising from the use of our services.<br />
          • BoldEats is not responsible for third-party service failures.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          7. Governing Law
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          These Terms & Conditions are governed by the laws of Odisha, India. Any disputes shall be subject to the jurisdiction of the courts in Bhubaneswar.
        </Typography>
      </ContentPaper>
    </StyledContainer>
  );
};

export default TermsConditions; 