import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  height: '60px',
  width: 'auto',
  marginBottom: '24px',
});

const AboutPage = () => {
  return (
    <StyledContainer maxWidth="lg">
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
          About BoldEats
        </Typography>

        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444',
          mb: 4
        }}>
          BoldEats is a corporate food delivery service under BoldTribe Innovations Pvt. Ltd. Our mission is to provide high-quality, hygienic, and timely meal deliveries to corporate clients in Bhubaneswar, ensuring convenience and satisfaction.
        </Typography>

        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          color: '#333'
        }}>
          Contact BoldEats
        </Typography>

        <Typography variant="body1" paragraph sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.8,
          color: '#444'
        }}>
          For any queries, reach out to us at:
        </Typography>

        <Box sx={{ pl: 2 }}>
          <Typography variant="body1" paragraph sx={{ 
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: 1.8,
            color: '#444'
          }}>
            Email: support@boldtribe.in
          </Typography>

          <Typography variant="body1" paragraph sx={{ 
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: 1.8,
            color: '#444'
          }}>
            Phone: +91 76848 36139
          </Typography>

          <Typography variant="body1" paragraph sx={{ 
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: 1.8,
            color: '#444'
          }}>
            Address: DCB 630, DLF CyberCity, Bhubaneswar, Odisha, India-751024
          </Typography>
        </Box>
      </ContentPaper>
    </StyledContainer>
  );
};

export default AboutPage; 