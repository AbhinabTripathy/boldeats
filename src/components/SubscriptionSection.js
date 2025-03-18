import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import organic from '../assets/images/organic.png';
import fresh from '../assets/images/fresh.png';
import chef from '../assets/images/shop.png';
const StyledSection = styled(Box)({
  padding: '80px 0',
  background: 'linear-gradient(to right, #BC6363, #FFFFFF)',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  marginTop: '120px',
});

const SubscriptionButton = styled(Button)({
  backgroundColor: '#ff3d00',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '4px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#dd3500',
  },
});

const SubscriptionSection = () => {
  const navigate = useNavigate();

  const handleSubscriptionClick = () => {
    navigate('/subscription');
  };

  return (
    <StyledSection>
      {/* Organic logo positioned at top left */}
      <Box
        sx={{
          position: 'absolute',
          left: '40px',
          top: '40px',
          zIndex: 2,
        }}
      >
        <img
          src={organic}
          alt="Organic"
          style={{
            width: '80px',
            height: '100px',
          }}
        />
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <img
              src={chef}
              alt="Chefs cooking"
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </Box>
          <Box sx={{ flex: 1, marginRight: '100px' }}>
            {/* Right side content */}
            <Typography variant="h4" sx={{ mb: 4, color: '#000000', fontWeight: 'bold' }}>
              Tired of mundane office lunches?
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              {['Home Cooked food for Corporates', 'Customized Menu Options', 'Food Delivery'].map((text, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    component="span"
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ff3d00',
                      mr: 2
                    }}
                  />
                  <Typography>{text}</Typography>
                </Box>
              ))}
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Daily meal subscription for offices and Corporates
            </Typography>

            <SubscriptionButton 
              variant="contained"
              onClick={handleSubscriptionClick}
            >
              TAKE SUBSCRIPTION →
            </SubscriptionButton>
          </Box>
        </Box>
      </Container>
      
      <Box 
        sx={{ 
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1
        }}
      >
        <img
          src={fresh}
          alt="Fresh"
          style={{ 
            width: '300px',
            height: '400px',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))'
          }}
        />
      </Box>
    </StyledSection>
  );
};

export default SubscriptionSection; 