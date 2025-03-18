import React from 'react';
import { Box, Typography, Container, IconButton, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import quotes from '../assets/images/quotes.png';

const StyledSection = styled(Box)({
  padding: '80px 0',
  backgroundColor: '#f5f5f5',
  position: 'relative',
});

const QuoteIcon = styled('img')({
  position: 'absolute',
  top: '40px',
  left: '40px',
  width: '48px',
  height: 'auto',
});

const ReviewCard = styled(Box)({
  padding: '40px',
  textAlign: 'center',
  width: '1251px',
  height: '290px',
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

const NavigationButton = styled(IconButton)({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f8f8f8',
  },
});

const ReviewsSection = () => {
  return (
    <StyledSection>
      <Container maxWidth="lg">
        <QuoteIcon src={quotes} alt="quotes" />
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 6, 
            textAlign: 'left',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Reviews
        </Typography>
        <ReviewCard>
          <Avatar
            src="/assets/reviewer-avatar.jpg"
            alt="Reviewer"
            sx={{ 
              width: 100, 
              height: 100, 
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
              color: '#333'
            }}
          >
            Niharika jain
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: '700px',
              margin: '0 auto 24px',
              lineHeight: 1.8
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
                fontSize: '28px'
              }
            }} 
          />
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
              position: 'absolute',
              right: '40px',
              bottom: '40px'
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