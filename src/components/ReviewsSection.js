import React from 'react';
import { Box, Typography, Container, IconButton, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import quotes from '../assets/images/quotes.png';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: '#f5f5f5',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0),
  }
}));

const QuoteIcon = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(5),
  left: theme.spacing(5),
  width: '48px',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '36px',
    top: theme.spacing(3),
    left: theme.spacing(3),
  }
}));

const ReviewCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: 'center',
  width: '100%',
  maxWidth: '1251px',
  minHeight: '290px',
  height: 'auto',
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    minHeight: 'auto',
  }
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f8f8f8',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
    }
  }
}));

const ReviewsSection = () => {
  return (
    <StyledSection>
      <Container maxWidth="lg">
        <QuoteIcon src={quotes} alt="quotes" />
        <Typography 
          variant="h4" 
          sx={{ 
            mb: { xs: 4, sm: 5, md: 6 }, 
            textAlign: 'left',
            fontWeight: 'bold',
            color: '#333',
            fontSize: { xs: '28px', sm: '32px', md: '36px' }
          }}
        >
          Reviews
        </Typography>
        <ReviewCard>
          <Avatar
            src="/assets/reviewer-avatar.jpg"
            alt="Reviewer"
            sx={{ 
              width: { xs: 80, sm: 90, md: 100 }, 
              height: { xs: 80, sm: 90, md: 100 }, 
              margin: '0 auto 24px',
              border: '3px solid #fff',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: '#333',
              fontSize: { xs: '20px', sm: '22px', md: '24px' }
            }}
          >
            Niharika jain
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: { xs: '100%', sm: '600px', md: '700px' },
              margin: '0 auto 24px',
              lineHeight: 1.8,
              fontSize: { xs: '14px', sm: '15px', md: '16px' },
              px: { xs: 2, sm: 3, md: 0 }
            }}
          >
            Lacus luctus accumsan tortor posuere ac ut consequat semper. Vitae
            tortor condimentum lacinia quis vel. Quisque id diam vel quam
            elementum pulvinar etiam non. Est ultricies integer quis auctor elit sed
            vulputate congue eu consequu.
          </Typography>
          <Rating 
            value={5} 
            readOnly 
            sx={{ 
              mb: 4,
              '& .MuiRating-icon': {
                color: '#FFD700',
                fontSize: { xs: '24px', sm: '26px', md: '28px' }
              }
            }} 
          />
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: { xs: 2, sm: 3 },
              position: { xs: 'relative', sm: 'absolute' },
              right: { xs: 'auto', sm: '40px' },
              bottom: { xs: '20px', sm: '40px' },
              mt: { xs: 2, sm: 0 }
            }}
          >
            <NavigationButton>
              <ArrowBack />
            </NavigationButton>
            <NavigationButton>
              <ArrowForward />
            </NavigationButton>
          </Box>
        </ReviewCard>
      </Container>
    </StyledSection>
  );
};

export default ReviewsSection; 