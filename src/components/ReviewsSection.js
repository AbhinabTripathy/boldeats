import React, { useState, useEffect } from 'react';
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

const reviews = [
  {
    name: "Niharika Jain",
    avatar: "/assets/reviewer-avatar.jpg",
    rating: 5,
    review: "Lacus luctus accumsan tortor posuere ac ut consequat semper. Vitae tortor condimentum lacinia quis vel. Quisque id diam vel quam elementum pulvinar etiam non. Est ultricies integer quis auctor elit sed vulputate congue eu consequu."
  },
  {
    name: "Manoranjan Basantia",
    avatar: "/assets/reviewer-avatar.jpg",
    rating: 5,
    review: "Exceptional service and amazing food quality! The catering team went above and beyond to make our event special. The menu was diverse and everything was perfectly prepared. Highly recommend their services for any occasion."
  },
  {
    name: "Nikita Pradhan",
    avatar: "/assets/reviewer-avatar.jpg",
    rating: 5,
    review: "The attention to detail and professionalism of the team is outstanding. The food was not only delicious but also beautifully presented. They accommodated all our special requests and made our corporate event a huge success."
  },
  {
    name: "Arpita Singh",
    avatar: "/assets/reviewer-avatar.jpg",
    rating: 5,
    review: "I've used their services multiple times for family gatherings and each time has been perfect. The food is consistently excellent, the staff is courteous, and the service is prompt. They truly understand customer satisfaction."
  },
  {
    name: "Abhinav Tripathy",
    avatar: "/assets/reviewer-avatar.jpg",
    rating: 5,
    review: "The best catering service I've experienced! From the initial consultation to the final delivery, everything was handled professionally. The food quality and variety exceeded our expectations. Will definitely use their services again."
  }
];

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

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
            src={reviews[currentReview].avatar}
            alt={reviews[currentReview].name}
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
            {reviews[currentReview].name}
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
            {reviews[currentReview].review}
          </Typography>
          <Rating 
            value={reviews[currentReview].rating} 
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
            <NavigationButton onClick={handlePrevious}>
              <ArrowBack />
            </NavigationButton>
            <NavigationButton onClick={handleNext}>
              <ArrowForward />
            </NavigationButton>
          </Box>
        </ReviewCard>
      </Container>
    </StyledSection>
  );
};

export default ReviewsSection; 