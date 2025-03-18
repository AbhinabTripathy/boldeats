import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, GitHub } from '@mui/icons-material';
import footerImage from '../assets/images/footerImage.png';

const StyledFooter = styled(Box)({
  backgroundColor: '#000',
  color: 'white',
  padding: '60px 0 40px',
  width: '100%'
});

const ContentContainer = styled(Container)({
  maxWidth: '1251px !important',
  margin: '0 auto',
  padding: '0 20px'
});

const FooterHeading = styled(Typography)({
  color: '#ff0000',
  marginBottom: '20px',
  fontWeight: 'bold',
  fontSize: '24px'
});

const SocialLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  '&:hover': {
    color: '#ff0000',
  },
});

const Footer = () => {
  return (
    <StyledFooter>
      <ContentContainer>
        <Grid container spacing={8}>
          {/* First Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" sx={{ 
              color: 'white', 
              mb: 3,
              fontSize: '32px',
              lineHeight: 1.2
            }}>
              We cook only <span style={{ color: '#ff0000' }}>the most</span>
              <br />
              <span style={{ color: '#ff0000' }}>delicious</span> meals
            </Typography>
            <Box sx={{ mt: 3 }}>
              <img
                src={footerImage}
                alt="Delicious Food"
                style={{ width: '100%', maxWidth: '280px', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          </Grid>

          {/* Second Section - Address */}
          <Grid item xs={12} md={3}>
            <FooterHeading>Address</FooterHeading>
            <Typography variant="body1" sx={{ fontSize: '16px', mb: 1, color: '#fff' }}>
              DCB-630, DLF CyberCity,
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '16px', mb: 1, color: '#fff' }}>
              IDCO InfoPark,
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '16px', color: '#fff' }}>
              Bhubaneswar, 751024
            </Typography>
          </Grid>

          {/* Third Section - Say Hello */}
          <Grid item xs={12} md={3}>
            <FooterHeading>Say Hello</FooterHeading>
            <Typography variant="body1" sx={{ fontSize: '16px', mb: 1, color: '#fff' }}>
              support@boldtribe.in
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '16px', mb: 3, color: '#fff' }}>
              +91 76848 36139
            </Typography>
          </Grid>

          {/* Fourth Section - Social */}
          <Grid item xs={12} md={3}>
            <FooterHeading>Social</FooterHeading>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <SocialLink href="#">
                <Facebook sx={{ fontSize: 20 }} /> Facebook
              </SocialLink>
              <SocialLink href="#">
                <Twitter sx={{ fontSize: 20 }} /> Twitter
              </SocialLink>
              <SocialLink href="#">
                <GitHub sx={{ fontSize: 20 }} /> Dribble
              </SocialLink>
              <SocialLink href="#">
                <Instagram sx={{ fontSize: 20 }} /> Instagram
              </SocialLink>
            </Box>
          </Grid>
        </Grid>
      </ContentContainer>
    </StyledFooter>
  );
};

export default Footer; 