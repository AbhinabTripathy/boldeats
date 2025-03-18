import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import thaliImage from '../assets/images/thali1.png';
import thali2 from '../assets/images/thali2.png';
import thali3 from '../assets/images/thali3.png';
import thali4 from '../assets/images/thali4.png';
import backgroundImage from '../assets/images/hero1.png';
import hero2 from '../assets/images/hero2.png';
import hero3 from '../assets/images/hero3.png';
import hero4 from '../assets/images/hero4.png';

const heroConfigs = [
  {
    background: '#312F2B',
    image: backgroundImage,
    thali: thaliImage,
    title: [
      { 
        text: 'Order', 
        color: '#ff0000',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      },
      { 
        text: 'Your Favorite', 
        color: 'white',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      }
    ],
    subtitle: [
      { 
        text: 'Meals', 
        color: '#ff0000',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      },
      { 
        text: 'in Just a Few', 
        color: 'white',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      }
    ],
    endText: { 
      text: 'Clicks!', 
      color: '#ff0000',
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
    }
  },
  {
    background: '#D4A84B',
    image: hero2,
    thali: thali2,
    title: [
      { 
        text: 'Satisfy', 
        color: '#ff0000',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      },
      { 
        text: 'Your Cravings', 
        color: 'white',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      }
    ],
    subtitle: [
      { 
        text: 'Meals', 
        color: '#ff0000',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      },
      { 
        text: 'in Just a Few', 
        color: 'white',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      }
    ],
    endText: { 
      text: 'Minutes!', 
      color: '#ff0000',
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
    }
  },
  {
    background: 'linear-gradient(to right, #A6AC5A, #C5CF78)',
    image: hero4,
    thali: thali3,
    title: [
      { 
        text: 'Delicious', 
        color: '#ff0000',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      },
      { 
        text: 'Keto Meals', 
        color: 'white',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      }
    ],
    subtitle: [
      { 
        text: 'Delivered', 
        color: '#ff0000',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      },
      { 
        text: 'Fresh Daily', 
        color: 'white',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      }
    ],
    endText: { 
      text: 'For You!', 
      color: '#ff0000',
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
    }
  },
  {
    background: 'linear-gradient(to right, #D78704, #F6B629)',
    image: hero3,
    thali: thali4,
    title: [
      { 
        text: 'Low-Carb', 
        color: '#ff0000',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      },
      { 
        text: 'High-Taste', 
        color: 'white',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' }
      }
    ],
    subtitle: [
      { 
        text: 'Stay Fit', 
        color: '#ff0000',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      },
      { 
        text: 'Every Bite', 
        color: 'white',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
      }
    ],
    endText: { 
      text: 'Always!', 
      color: '#ff0000',
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
    }
  }
];

const StyledHeroSection = styled(Box)(({ activeIndex }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  transition: 'all 0.5s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: heroConfigs[activeIndex].background,
    zIndex: 0,
    transition: 'background 0.5s ease-in-out',
    borderRadius: '0 300px 400px 0'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '65%',
    height: '100%',
    backgroundImage: `url(${heroConfigs[activeIndex].image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.4)',
    zIndex: 1,
    borderRadius: '300px 0 0 400px',
    transition: 'all 0.5s ease-in-out'
  }
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
  width: '100%'
});

const ExploreButton = styled(Button)({
  backgroundColor: '#ff0000',
  color: 'white',
  padding: '15px 40px',
  borderRadius: '30px',
  fontSize: '20px',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#cc0000',
  },
  marginTop: '-20px'
});

const rotate = keyframes`
  from {
    transform: rotate(0deg) scale(1.2);
  }
  to {
    transform: rotate(360deg) scale(1.2);
  }
`;

const ThaliImage = styled('img')(({ slideIndex }) => ({
  width: slideIndex === 0 ? '600px' : '500px',
  height: slideIndex === 0 ? '600px' : '500px',
  objectFit: 'contain',
  filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25))',
  position: 'relative',
  zIndex: 3,
  marginLeft: slideIndex === 0 ? '-300px' : '-250px',
  animation: `${rotate} 20s linear infinite`
}));

const SliderDots = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '10px',
  zIndex: 5
});

const Dot = styled(Box)(({ active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? '#ff0000' : 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
}));

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleExplore = () => {
    navigate('/menu');
  };

  const currentSlide = heroConfigs[activeIndex];

  return (
    <StyledHeroSection activeIndex={activeIndex}>
      <ContentWrapper>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 8,
            position: 'relative',
            mt: { xs: 8, md: 12 }
          }}>
            <Box sx={{
              flex: '0 1 50%',
              position: 'relative',
              zIndex: 3,
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: currentSlide.title[0].fontSize,
                    lineHeight: 1.1,
                    color: 'white',
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2, md: 0 }
                  }}>
                    <span style={{ color: currentSlide.title[0].color }}>{currentSlide.title[0].text}</span>
                    <span style={{ 
                      marginLeft: { xs: 0, sm: '20px' }, 
                      color: currentSlide.title[1].color 
                    }}>{currentSlide.title[1].text}</span>
                  </Box>
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: currentSlide.subtitle[0].fontSize,
                    lineHeight: 1.1,
                    color: 'white',
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2, md: 0 }
                  }}>
                    <span style={{ color: currentSlide.subtitle[0].color }}>{currentSlide.subtitle[0].text}</span>
                    <span style={{ 
                      marginLeft: { xs: 0, sm: '20px' }, 
                      color: currentSlide.subtitle[1].color 
                    }}>{currentSlide.subtitle[1].text}</span>
                  </Box>
                </Typography>

                {currentSlide.endText && (
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: currentSlide.endText.fontSize,
                      lineHeight: 1.1,
                      color: 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: currentSlide.endText.color }}>{currentSlide.endText.text}</span>
                    </Box>
                  </Typography>
                )}

                <Box sx={{ mt: 2 }}>
                  <ExploreButton 
                    variant="contained" 
                    size="large"
                    onClick={handleExplore}
                  >
                    EXPLORE MORE
                  </ExploreButton>
                </Box>
              </Box>
            </Box>
            <Box sx={{
              flex: '0 1 50%',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 3,
            }}>
              <ThaliImage 
                src={currentSlide.thali} 
                alt="Indian Thali" 
                slideIndex={activeIndex}
              />
            </Box>
          </Box>
        </Container>
      </ContentWrapper>
      <SliderDots>
        {[0, 1, 2, 3].map((index) => (
          <Dot
            key={index}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </SliderDots>
    </StyledHeroSection>
  );
};

export default HeroSection; 