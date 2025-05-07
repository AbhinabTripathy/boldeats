import React from 'react';
import { Box, Typography, Button, styled, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '120px',
  paddingBottom: '40px',
  background: '#fff',
});

const Banner = styled(Box)({
  width: '100%',
  minHeight: '190px',
  background: 'linear-gradient(90deg, #C4362A 0%, #ff5e62 60%, #ff9966 100%)',
  borderRadius: '16px',
  marginBottom: '36px',
  boxShadow: '0 4px 16px rgba(196,54,42,0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 16px 32px 16px',
  position: 'relative',
  textAlign: 'center',
  overflow: 'hidden',
});

const FoodEmojis = styled('div')({
  fontSize: '2.7rem',
  marginBottom: '14px',
  letterSpacing: '0.18em',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.18em',
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
});

const QuoteText = styled(Typography)({
  fontWeight: 700,
  fontSize: '2rem',
  color: '#7C3A00',
  marginBottom: '6px',
  '@media (max-width: 600px)': {
    fontSize: '1.2rem',
  },
});

const SubText = styled(Typography)({
  fontWeight: 400,
  fontSize: '1.1rem',
  color: '#7C3A00',
  opacity: 0.85,
  '@media (max-width: 600px)': {
    fontSize: '0.95rem',
  },
});

const BannerWave = styled('div')({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  zIndex: 2,
  lineHeight: 0,
});

const CatererCard = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  padding: '24px',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto 24px auto',
  gap: '32px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '16px',
    padding: '12px',
  },
});

const CardImage = styled('img')({
  width: '220px',
  height: '220px',
  objectFit: 'cover',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  '@media (max-width: 768px)': {
    width: '100%',
    height: '160px',
  },
});

const InfoBox = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const Star = styled('span')({
  color: '#FFD600',
  fontSize: '22px',
  marginRight: '2px',
});

const MenuButton = styled(Button)({
  background: '#C4362A',
  color: '#fff',
  borderRadius: '7px',
  fontSize: '15px',
  fontWeight: 500,
  minWidth: '100px',
  marginRight: '10px',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    background: '#a82a1f',
    opacity: 0.9,
  },
});

const ContactText = styled(Typography)({
  fontSize: '16px',
  color: '#222',
  marginTop: '6px',
  lineHeight: 1.5,
});

const mealImage = require('../assets/images/mealImg.png');

const caterers = [
  {
    name: 'Glorious Caterers',
    address: 'Main road Side, F1/F3/03',
    phone: '098533 37333',
    years: '10+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'chinese',
  },
  {
    name: 'Royal Feast',
    address: 'MG Road, Block 2',
    phone: '098512 11122',
    years: '8+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'chinese',
  },
  {
    name: 'Spice Route Caterers',
    address: 'Sector 21, Near Park',
    phone: '098533 22244',
    years: '12+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'pureveg',
  },
  {
    name: 'Maharaja Foods',
    address: 'Old City, Shop 7',
    phone: '098544 55566',
    years: '15+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'pureveg',
  },
  {
    name: 'Tandoor Treats',
    address: 'Market Lane, 3rd Floor',
    phone: '098577 88899',
    years: '9+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'northindian',
  },
  {
    name: 'Saffron Spice',
    address: 'Green Avenue, 12B',
    phone: '098599 12345',
    years: '11+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'northindian',
  },
  {
    name: 'Punjabi Rasoi',
    address: 'Station Road, 4A',
    phone: '098511 67890',
    years: '7+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'northindian',
  },
  {
    name: 'Biryani House',
    address: 'Lake View, 9C',
    phone: '098522 33344',
    years: '13+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
  },
  {
    name: 'Flavours of India',
    address: 'Sunset Street, 5',
    phone: '098533 77788',
    years: '10+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
  },
  {
    name: 'Masala Magic',
    address: 'Hilltop, 2nd Cross',
    phone: '098544 99900',
    years: '6+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
  },
  {
    name: 'Curry Kingdom',
    address: 'Central Plaza, 1A',
    phone: '098555 11122',
    years: '14+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
  },
  {
    name: 'Desi Delights',
    address: 'Garden Road, 8',
    phone: '098566 22233',
    years: '8+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
  },
  {
    name: 'Annapurna Caterers',
    address: 'Temple Lane, 10',
    phone: '098577 44455',
    years: '16+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
  },
  {
    name: 'Taste of Tradition',
    address: 'Heritage Street, 6',
    phone: '098588 55566',
    years: '9+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
  },
  {
    name: 'Shahi Dawat',
    address: 'Palace Road, 3B',
    phone: '098599 66677',
    years: '10+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
  },
  {
    name: 'Urban Zaika',
    address: 'Metro Complex, 7F',
    phone: '098511 77788',
    years: '5+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
  },
  {
    name: 'Rasoi Ghar',
    address: 'Bazaar Street, 2',
    phone: '098522 88899',
    years: '12+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
  },
  {
    name: 'The Indian Platter',
    address: 'Food Court, 11',
    phone: '098533 99900',
    years: '11+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
  },
  {
    name: 'Zaika Express',
    address: 'Expressway, 4C',
    phone: '098544 11122',
    years: '7+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
  },
  {
    name: 'Royal Rasam',
    address: 'Lotus Lane, 5A',
    phone: '098555 22233',
    years: '13+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
  },
];

const LunchLabel = styled(Box)({
  position: 'absolute',
  top: '18px',
  left: '-35px',
  marginLeft: '24px',
  background: '#1976d2',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1rem',
  padding: '4px 38px',
  borderRadius: '7px',
  transform: 'rotate(-25deg)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  zIndex: 2,
  letterSpacing: 1,
});

const CardImageWrapper = styled(Box)({
  position: 'relative',
  display: 'inline-block',
});

const MenuPage = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      {/* Attractive Banner with Quote and Food Emojis */}
      <Banner>
        <FoodEmojis>
          🍛 🥗 🍲 🍚 🍢 🥒 🥘 🍤 🍥 🥔 🧆 🥭 🥦
        </FoodEmojis>
        <QuoteText sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
          Bringing the Taste of India to Your Events!
        </QuoteText>
        <SubText sx={{ color: '#fff', opacity: 0.92, textShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          Delicious memories, one plate at a time.
        </SubText>
        <BannerWave>
          <svg viewBox="0 0 500 30" preserveAspectRatio="none" style={{ width: '100%', height: 30, display: 'block' }}>
            <path d="M0,10 Q250,40 500,10 L500,30 L0,30 Z" fill="#fff" fillOpacity="0.18" />
          </svg>
        </BannerWave>
      </Banner>
      {/* Info Note */}
      <Typography sx={{ textAlign: 'center', fontSize: '1.08rem', color: '#1976d2', mb: 3, fontWeight: 500 }}>
        For Breakfast and Dinner, contact <span style={{fontWeight:'bold', color:'#C4362A'}}>support@boldeats.in</span>
      </Typography>
      {/* Caterer Cards */}
      {caterers.map((caterer, idx) => (
        <CatererCard key={idx}>
          <CardImageWrapper>
            <LunchLabel>Lunch</LunchLabel>
            <CardImage src={caterer.image} alt={caterer.name} />
          </CardImageWrapper>
          <InfoBox>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              {caterer.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i}>★</Star>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
              <MenuButton onClick={() => navigate('/menu-details', { state: { caterer, menuType: caterer.menuType } })}>Menu</MenuButton>
            </Box>
            <ContactText>
              {caterer.years} years in business · {caterer.address} · {caterer.phone}<br />
              Open 24 hours<br />
              On-site services · Online appointments
            </ContactText>
          </InfoBox>
        </CatererCard>
      ))}
    </PageContainer>
  );
};

export default MenuPage; 