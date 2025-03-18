import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, GitHub } from '@mui/icons-material';
import footerImage from '../assets/images/footerImage.png';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#000',
  color: 'white',
  padding: theme.spacing(8, 0, 5),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0, 4),
  }
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1251px !important',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
  }
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  color: '#ff0000',
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '24px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    marginBottom: theme.spacing(1.5),
  }
}));

const SocialLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  '&:hover': {
    color: '#ff0000',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledFooter>
      <ContentContainer>
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }}>
          {/* First Section */}
          <Grid item xs={12} md={3}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white', 
                mb: 3,
                fontSize: { xs: '24px', sm: '28px', md: '32px' },
                lineHeight: 1.2
              }}
            >
              We cook only <span style={{ color: '#ff0000' }}>the most</span>
              <br />
              <span style={{ color: '#ff0000' }}>delicious</span> meals
            </Typography>
            <Box sx={{ mt: 3 }}>
              <img
                src={footerImage}
                alt="Delicious Food"
                style={{ 
                  width: '100%', 
                  maxWidth: isMobile ? '240px' : '280px', 
                  height: 'auto', 
                  borderRadius: '8px' 
                }}
              />
            </Box>
          </Grid>

          {/* Second Section - Address */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading>Address</FooterHeading>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                mb: 1, 
                color: '#fff' 
              }}
            >
              DCB-630, DLF CyberCity,
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                mb: 1, 
                color: '#fff' 
              }}
            >
              IDCO InfoPark,
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                color: '#fff' 
              }}
            >
              Bhubaneswar, 751024
            </Typography>
          </Grid>

          {/* Third Section - Say Hello */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading>Say Hello</FooterHeading>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                mb: 1, 
                color: '#fff' 
              }}
            >
              support@boldtribe.in
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                mb: 3, 
                color: '#fff' 
              }}
            >
              +91 76848 36139
            </Typography>
          </Grid>

          {/* Fourth Section - Social */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading>Social</FooterHeading>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 1, sm: 1.5, md: 2 } 
            }}>
              <SocialLink href="#">
                <Facebook sx={{ fontSize: { xs: 18, sm: 20 } }} /> Facebook
              </SocialLink>
              <SocialLink href="#">
                <Twitter sx={{ fontSize: { xs: 18, sm: 20 } }} /> Twitter
              </SocialLink>
              <SocialLink href="#">
                <GitHub sx={{ fontSize: { xs: 18, sm: 20 } }} /> Dribble
              </SocialLink>
              <SocialLink href="#">
                <Instagram sx={{ fontSize: { xs: 18, sm: 20 } }} /> Instagram
              </SocialLink>
            </Box>
          </Grid>
        </Grid>
      </ContentContainer>
    </StyledFooter>
  );
};

export default Footer; 