import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// import heroImage1 from '../assets/Hero 1.png';
import heroImage2 from '../assets/Hero 2.png';
import heroImage3 from '../assets/Hero3.png';
// import chefImage from '../assets/images/HeroImage/Clip path group-3.png';
// import biryani from '../assets/images/HeroImage/Biryani.png';
// import bowl from '../assets/images/HeroImage/Bowl.png';
// import bowl2 from '../assets/images/HeroImage/Bowl 2.png';
// import biryani2 from '../assets/images/HeroImage/Biryani 2.png';
// import halfBowl from '../assets/images/HeroImage/Half Bowl.png';
import rightView from '../assets/images/HeroImage/Right View.png';
import dottedArrow from '../assets/images/HeroImage/Group 1000002890.png';
import cateringTableImg from '../assets/image-2.png';
// import foodImg1 from '../assets/images/HeroImage/Drinks.png';
import leftImage from '../assets/Left image.png';
// import foodImg2 from '../assets/images/HeroImage/Food2.png';
import chefImg from '../assets/images/HeroImage/Chef .png';
import thaliImg from '../assets/images/HeroImage/Thali.png';
import subscribeBtn from '../assets/images/HeroImage/Subscription Button.png';

const slides = [
  {
    // image: heroImage1, // commented out, using custom layout
    custom: true, // flag for custom rendering
  },
  {
    // image: heroImage2, // commented out, using custom layout
    custom: true, // flag for custom rendering
  },
  {
    // image: heroImage3, // commented out, using custom layout
    custom: true, // flag for custom rendering
  },
];

const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#222',
  fontSize: '1.2rem',
  gap: 2,
  '& svg': {
    fontSize: '2rem',
    marginBottom: 2,
  },
  '& a': {
    color: '#222',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginTop: 2,
  },
}));

const HeroRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'stretch',
  background: 'radial-gradient(circle at 80% 10%, #fbeaea 40%, #fff6f6 100%)',
  marginTop: theme.spacing(16),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: 'auto',
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(1),
  },
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '100vw',
}));

const LeftCol = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 4, 4, 8),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 2, 2, 2),
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const RightCol = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  [theme.breakpoints.down('md')]: {
    minHeight: 300,
    padding: theme.spacing(2, 0),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  height: 'auto',
  borderRadius: 0,
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    borderRadius: 0,
  },
}));

const OurMenuButton = styled(Button)(({ theme }) => ({
  background: '#b71c1c',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  borderRadius: 10,
  padding: theme.spacing(1.2, 4),
  marginTop: theme.spacing(4),
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    background: '#b71c1c',
  },
}));

const SocialsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
}));

const SliderDots = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(2),
  zIndex: 10,
}));

const LineIndicator = styled(Box)(({ active, theme }) => ({
  width: active ? 40 : 24,
  height: 6,
  borderRadius: 3,
  background: active ? '#b71c1c' : '#888',
  margin: '0 8px',
  transition: 'background 0.3s, width 0.3s',
  display: 'inline-block',
}));

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const description = (
    <>
      Maria's Food Catering & Services offers an elegant fine dining experience, blending Filipino flavors with modern culinary techniques. From succulent lechon belly to gourmet seafood sinigang, each dish is beautifully plated and made with fresh, high-quality ingredients.<br />
      Perfect for weddings, corporate events, and special celebrations, Maria's ensures impeccable service and a refined dining experience for every occasion.
    </>
  );

  return (
    <HeroRoot sx={{ justifyContent: 'center', alignItems: 'center', position: 'relative', background: 'radial-gradient(circle at 80% 10%, #fbeaea 40%, #fff6f6 100%)', overflow: 'hidden' }}>
      {activeIndex === 0 ? (
        // --- Custom layout for the first hero slider (matches screenshot) ---
        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'space-between', minHeight: 600, position: 'relative', px: { xs: 2, md: 8 }, pt: { xs: 4, md: 8 } }}>
          {/* Left: Text and Button */}
          <Box sx={{ flex: 1, minWidth: 320, zIndex: 2, pt: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: '2.2rem', md: '3.5rem', lg: '4rem' }, mb: 0, lineHeight: 1.1, color: '#111', textAlign: 'left' }}>
              Choose Your<br />
              <Box component="span" sx={{ color: '#e53935', fontWeight: 700 }}>Food</Box><br />
              Plan With Us
            </Typography>
            {/* Dotted Arrow and Button Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2, position: 'relative', height: 80 }}>
              <Box component="img" src={dottedArrow} alt="Dotted Arrow" sx={{ height: 70, width: 140, mr: 2, position: 'relative', left: 0, top: 0 }} />
              <Button
                sx={{
                  background: '#e53935',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 4px 16px #f8bfbf',
                  textTransform: 'none',
                  ml: 2,
                  minWidth: 120,
                  transition: 'background 0.2s',
                  '&:hover': { background: '#b71c1c' },
                }}
                onClick={() => navigate('/kitchen')}
              >
                Our Menu&nbsp;&nbsp;{'>'}
              </Button>
            </Box>
            {/* Description */}
            <Typography sx={{ color: '#222', fontSize: { xs: '1rem', md: '1.2rem' }, mb: 2, maxWidth: 700, mt: 2, textAlign: 'left' }}>
              {description}
            </Typography>
          </Box>
          {/* Right: Only show Right View.png image, fully visible, no cropping, increased width, shifted right with fixed margin */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 400, mt: { xs: 4, md: 0 } }}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100vw', md: 900 }, height: { xs: 400, md: 600 }, mx: 'auto', background: 'transparent', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible', marginRight: '-65px' }}>
              <img src={rightView} alt="Right View" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 0, boxShadow: 'none', border: 'none', display: 'block' }} />
            </Box>
          </Box>
          {/* Line indicator overlapping the bottom of the hero image */}
          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 32, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <SliderDots sx={{ gap: 2 }}>
              {slides.map((_, idx) => (
                <LineIndicator
                  key={idx}
                  active={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </SliderDots>
          </Box>
        </Box>
      ) : activeIndex === 1 ? (
        // --- Custom layout for the second hero slider (matches screenshot) ---
        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'space-between', minHeight: 450, position: 'relative', px: { xs: 2, md: 8 }, pt: { xs: 4, md: 8 }, background: 'radial-gradient(circle at 80% 10%, #fbeaea 40%, #fff6f6 100%)' }}>
          {/* Left: Title, Description, and Image below */}
          <Box sx={{ flex: 1, minWidth: 320, zIndex: 2, pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem', lg: '2.8rem' }, mb: 4, lineHeight: 1.1, color: '#111', textAlign: 'left' }}>
              Fresh Flavors &<br />Creative Catering Services provider
            </Typography>
            <Typography sx={{ color: '#222', fontSize: { xs: '1.2rem', md: '1.4rem' }, mb: 2, maxWidth: 700, textAlign: 'left' }}>
              Maria's Food Catering & Services offers an elegant fine dining experience, blending Filipino flavors with modern culinary techniques. From succulent lechon belly to gourmet seafood sinigang, each dish is beautifully plated and made with fresh, high-quality ingredients.<br />
              Perfect for weddings, corporate events, and special celebrations, Maria's ensures impeccable service and a refined dining experience for every occasion.
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
              <img src={leftImage} alt="Left" style={{ width: 600, height: 600, objectFit: 'contain', borderRadius: 0, display: 'block', marginLeft: '-65px'}} />
            </Box>
          </Box>
          {/* Right: Catering Table Image */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 400, mt: { xs: 4, md: 0 } }}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100vw', md: 900 }, height: { xs: 400, md: 600 }, mx: 'auto', background: 'transparent', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible', marginRight: '-65px' }}>
              <img src={cateringTableImg} alt="Catering Table" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, boxShadow: 'none', border: 'none', display: 'block' }} />
            </Box>
          </Box>
          {/* Line indicator overlapping the bottom of the hero image */}
          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 32, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <SliderDots sx={{ gap: 2 }}>
              {slides.map((_, idx) => (
                <LineIndicator
                  key={idx}
                  active={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </SliderDots>
          </Box>
        </Box>
      ) : activeIndex === 2 ? (
        // --- Custom layout for the third hero slider (matches screenshot) ---
        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', minHeight: 450, position: 'relative', px: { xs: 2, md: 8 }, pt: { xs: 4, md: 8 }, background: 'radial-gradient(circle at 80% 10%, #fbeaea 40%, #fff6f6 100%)' }}>
          {/* Left: Chef Image */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 320 }}>
            <img src={chefImg} alt="Chef" style={{ width: 600, height: 900, objectFit: 'contain', borderRadius: 0, display: 'block', marginLeft: '-50px' }} />
          </Box>
          {/* Center: Title, Description, Subscribe Button */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 2, mb: 6, marginTop: '-80px' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem', lg: '2.8rem' }, mb: 2, lineHeight: 1.1, color: '#111', textAlign: 'center', marginTop: "-100px" }}>
              Fresh Flavors &<br />Creative Catering Services provider
            </Typography>
            <Box sx={{ my: 2, marginTop: '-60px', cursor: 'pointer' }} onClick={() => navigate('/subscription')}>
              <img src={subscribeBtn} alt="Subscribe" style={{ width: 300, height: 300, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
            </Box>
            <Typography sx={{ color: '#222', fontSize: { xs: '1.2rem', md: '1.3rem' }, maxWidth: 540, textAlign: 'center', mt: 0, marginTop: "-80px" }}>
              Maria's Food Catering & Services offers an elegant fine dining experience, blending Filipino flavors with modern culinary techniques. From succulent lechon belly to gourmet seafood sinigang, each dish is beautifully plated and made with fresh, high-quality ingredients.<br />
              Perfect for weddings, corporate events, and special celebrations, Maria's ensures impeccable service and a refined dining experience for every occasion.
            </Typography>
          </Box>
          {/* Right: Thali Image */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 320 }}>
            <img src={thaliImg} alt="Thali" style={{ width: 600, height: 900, objectFit: 'contain', borderRadius: 0, display: 'block', marginRight: '-40px' }} />
          </Box>
          {/* Line indicator overlapping the bottom of the hero image */}
          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 32, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <SliderDots sx={{ gap: 2 }}>
              {slides.map((_, idx) => (
                <LineIndicator
                  key={idx}
                  active={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </SliderDots>
          </Box>
        </Box>
      ) : (
        // --- Default layout for other hero sliders ---
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 600, position: 'relative' }}>
          <HeroImage
            src={slides[activeIndex].image}
            alt={slides[activeIndex].alt}
            onClick={slides[activeIndex].onClick ? () => slides[activeIndex].onClick(navigate) : undefined}
            style={{ cursor: slides[activeIndex].onClick ? 'pointer' : 'default', width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '700px', borderRadius: 24, boxShadow: '0 8px 32px #e0e0e0', objectFit: 'cover' }}
          />
          {/* Line indicator overlapping the image at the bottom center */}
          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 32, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <SliderDots sx={{ gap: 2 }}>
              {slides.map((_, idx) => (
                <LineIndicator
                  key={idx}
                  active={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </SliderDots>
          </Box>
        </Box>
      )}
    </HeroRoot>
  );
};

export default HeroSection; 