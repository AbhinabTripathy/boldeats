import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import organic from '../assets/images/organic.png';
import fresh from '../assets/images/fresh.png';
import chef from '../assets/images/shop.png';
import SubscriptionModal from './SubscriptionModal';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: 'linear-gradient(to right, #BC6363, #FFFFFF)',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  marginTop: theme.spacing(15),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0),
    marginTop: theme.spacing(8),
  }
}));

const SubscriptionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff3d00',
  color: 'white',
  padding: theme.spacing(1.5, 3),
  borderRadius: '4px',
  textTransform: 'none',
  fontSize: { xs: '14px', sm: '16px' },
  '&:hover': {
    backgroundColor: '#dd3500',
  },
}));

const SubscriptionSection = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = React.useState(false);

  const handleSubscriptionClick = () => {
    setOpenModal(true);
  };

  return (
    <StyledSection>
      {/* Organic logo positioned at top left */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '20px', sm: '40px' },
          top: { xs: '20px', sm: '40px' },
          zIndex: 2,
          display: { xs: 'none', sm: 'block' }
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
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 3, sm: 4 }, 
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          position: 'relative',
          zIndex: 2
        }}>
          <Box sx={{ 
            flex: 1, 
            position: 'relative',
            order: { xs: 2, md: 1 }
          }}>
            <img
              src={chef}
              alt="Chefs cooking"
              style={{ 
                width: '100%', 
                maxWidth: { xs: '300px', sm: '350px', md: '400px' },
                margin: '0 auto',
                display: 'block'
              }}
            />
          </Box>
          <Box sx={{ 
            flex: 1, 
            marginRight: { xs: 0, md: '100px' },
            order: { xs: 1, md: 2 },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            {/* Right side content */}
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4, 
                color: '#000000', 
                fontWeight: 'bold',
                fontSize: { xs: '28px', sm: '32px', md: '36px' }
              }}
            >
              Tired of mundane office lunches?
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              {['Home Cooked food for Corporates', 'Customized Menu Options', 'Food Delivery'].map((text, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
                >
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
                  <Typography sx={{ fontSize: { xs: '14px', sm: '15px', md: '16px' } }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 3, 
                fontWeight: 'medium',
                fontSize: { xs: '14px', sm: '15px', md: '16px' }
              }}
            >
              Daily meal subscription for offices and Corporates
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <SubscriptionButton 
                variant="contained"
                onClick={handleSubscriptionClick}
              >
                TAKE SUBSCRIPTION →
              </SubscriptionButton>
            </Box>
          </Box>
        </Box>
      </Container>
      
      <Box 
        sx={{ 
          position: 'absolute',
          right: { xs: '0', sm: '5%' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          display: { xs: 'none', sm: 'block' },
          width: { sm: '200px', md: '300px' },
          height: { sm: '300px', md: '400px' }
        }}
      >
        <img
          src={fresh}
          alt="Fresh"
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))'
          }}
        />
      </Box>
      <SubscriptionModal open={openModal} onClose={() => setOpenModal(false)} />
    </StyledSection>
  );
};

export default SubscriptionSection; 