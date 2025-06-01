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

const PrivacyPolicy = () => {
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
          Privacy Policy for BoldEats
        </Typography>

        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          We value your privacy and ensure the protection of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          1. Data Collection
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          We collect personal details such as name, contact details, payment information, and order history when you use our services.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          2. Data Usage
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          Your data is used for processing orders, improving services, and marketing purposes (with consent).
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          3. Data Protection
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          We implement security measures to prevent unauthorized access to your information.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          4. Third-Party Sharing
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          We do not sell or share your data with third parties, except for service fulfillment.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          5. Cookies Policy
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          Our website uses cookies to enhance user experience. You can disable cookies in your browser settings.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: '#333'
        }}>
          6. Policy Updates
        </Typography>
        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          We may update this policy periodically. Changes will be communicated through our website.
        </Typography>
      </ContentPaper>
    </StyledContainer>
  );
};

export default PrivacyPolicy; 