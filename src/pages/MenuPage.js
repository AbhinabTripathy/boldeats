import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, styled, Chip, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FSSAILogo from '../assets/FSSAI_logo.png';
import TheGrandOdishaKitchen from '../assets/87CA09FD-3098-4E33-B005-3843ECA95446-Photoroom_11zon.png';
import axios from 'axios';

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '-10px',
  paddingBottom: '40px',
  background: '#fff',
});

const Banner = styled(Box)({
  width: '100%',
  minHeight: '120px',
  background: 'linear-gradient(90deg, #C4362A 0%, #ff5e62 60%, #ff9966 100%)',
  borderRadius: '12px',
  marginBottom: '16px',
  boxShadow: '0 4px 16px rgba(196,54,42,0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px',
  position: 'relative',
  textAlign: 'center',
  overflow: 'hidden',
  marginTop: '8px',
  '@media (max-width: 600px)': {
    minHeight: '100px',
    padding: '8px',
    marginBottom: '12px',
  }
});

const FoodEmojis = styled('div')({
  fontSize: '1.8rem',
  marginBottom: '8px',
  letterSpacing: '0.12em',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.12em',
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
  '@media (max-width: 600px)': {
    fontSize: '1.5rem',
    marginBottom: '6px',
  }
});

const QuoteText = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#7C3A00',
  marginBottom: '3px',
  '@media (max-width: 600px)': {
    fontSize: '1rem',
    marginBottom: '2px',
  }
});

const SubText = styled(Typography)({
  fontWeight: 400,
  fontSize: '0.9rem',
  color: '#7C3A00',
  opacity: 0.85,
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
  }
});

const BannerWave = styled('div')({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  zIndex: 2,
  lineHeight: 0,
  '& svg': {
    height: '20px',
    '@media (max-width: 600px)': {
      height: '15px',
    }
  }
});

const CardRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto 24px auto',
  gap: '32px',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '0',
    padding: '0',
  },
});

const CardImageLeft = styled('img')({
  width: '160px',
  height: '160px',
  objectFit: 'cover',
  borderTopLeftRadius: '12px',
  borderBottomLeftRadius: '12px',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  marginTop: '20px',
  '@media (max-width: 768px)': {
    width: '100%',
    height: '120px',
    borderRadius: '12px 12px 0 0',
    marginTop: '8px',
  },
  marginLeft: "20px"
});

const CardContentRight = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '18px 0 0 18px',
  '@media (max-width: 768px)': {
    padding: '16px',
  },
});

const StaticPill = styled(Box)(({ color }) => ({
  display: 'inline-block',
  background: color === 'red' ? '#C4362A' : '#43a047',
  color: '#fff',
  borderRadius: '7px',
  fontSize: '15px',
  fontWeight: 500,
  minWidth: '80px',
  padding: '4px 22px',
  marginRight: '10px',
  textAlign: 'center',
  marginTop: '8px',
  marginBottom: '8px',
  pointerEvents: 'none',
  opacity: 0.95,
}));

const PriceButton = styled(Button)({
  background: '#C4362A',
  color: '#fff',
  borderRadius: '7px',
  fontSize: '15px',
  fontWeight: 500,
  minWidth: '100px',
  textTransform: 'none',
  boxShadow: 'none',
  marginTop: '8px',
  marginBottom: '8px',
  '&:hover': {
    background: '#a82a1f',
    opacity: 0.9,
  },
});

const Star = styled('span')({
  color: '#FFD600',
  fontSize: '22px',
  marginRight: '2px',
});

const ContactText = styled(Typography)({
  fontSize: '16px',
  color: '#222',
  marginTop: '6px',
  lineHeight: 1.5,
});

const mealImage = require('../assets/images/mealImg.png');

const odishaLunchMenu = [
  { day: 'Monday', items: [{ desc: 'Rice, Dalma, Bhaja, Khata, Pampad' }] },
  { day: 'Tuesday', items: [
    { desc: 'Rice, Dal, Sessional Curry, Bhaja, Pampad' },
    { desc: 'Rice, Dal, Egg curry, Bhaja, Pampad' },
  ] },
  { day: 'Wednesday', items: [
    { desc: 'Rice, Dal, Mushroom Curry, Bhaja, Pampad' },
    { desc: 'Rice, Dal, Chicken Curry, Bhaja, Pampad' },
    { desc: 'Rice, Dal, Fish Curry, Bhaja, Pampad' },
  ] },
  { day: 'Thursday', items: [
    { desc: 'Rice, Dal, Paneer Curry, Bhaja, Pampad' },
    { desc: 'Rice, Dal, Egg Curry, Bhaja, Pampad' },
  ] },
  { day: 'Friday', items: [
    { desc: 'Rice, Dal, Sessional Curry, Bhaja, Pampad' },
    { desc: 'Rice, Dal, Egg Curry, Bhaja, Pampad' },
    { desc: 'Rice, Dal, Fish Curry, Pampad, Bhaja' },
  ] },
  { day: 'Saturday', items: [
    { desc: 'Rice, Dal, Bhaja, Sessional Curry, Pampad' },
    { desc: 'Rice, Dal, Bhaja, Pampad, Egg Curry' },
  ] },
];

const odishaDinnerMenu = [
  { day: 'Monday', items: [{ desc: 'Roti, Dal Fry, Mixed Veg, Salad' }] },
  { day: 'Tuesday', items: [{ desc: 'Roti, Paneer Curry, Dal, Salad' }] },
  { day: 'Wednesday', items: [{ desc: 'Roti, Chana Masala, Dal, Salad' }] },
  { day: 'Thursday', items: [{ desc: 'Roti, Aloo Gobi, Dal, Salad' }] },
  { day: 'Friday', items: [{ desc: 'Roti, Bhindi Masala, Dal, Salad' }] },
  { day: 'Saturday', items: [{ desc: 'Roti, Dal Makhani, Mixed Veg, Salad' }] },
];

const odishaBreakfastMenu = [
  { day: 'Monday', items: [{ desc: 'Poha, Chutney, Banana' }] },
  { day: 'Tuesday', items: [{ desc: 'Idli, Sambar, Chutney' }] },
  { day: 'Wednesday', items: [{ desc: 'Upma, Chutney, Tea' }] },
  { day: 'Thursday', items: [{ desc: 'Paratha, Curd, Pickle' }] },
  { day: 'Friday', items: [{ desc: 'Dosa, Sambar, Chutney' }] },
  { day: 'Saturday', items: [{ desc: 'Aloo Puri, Chutney, Banana' }] },
];

export const caterers = [
  {
    name: 'The Grand Odisha Kitchen',
    address: 'Patia, Bhubaneswar',
    phone: '+91 8249045766',
    years: '2+',
    image: TheGrandOdishaKitchen,
    serviceType: 'Lunch',
    menuType: 'chinese',
    fssaiNumber: '22022066000045',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Royal Feast',
    address: 'MG Road, Block 2',
    phone: '098512 11122',
    years: '8+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'chinese',
    fssaiNumber: '22022066000046',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Spice Route Caterers',
    address: 'Sector 21, Near Park',
    phone: '098533 22244',
    years: '12+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'pureveg',
    fssaiNumber: '22022066000047',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Maharaja Foods',
    address: 'Old City, Shop 7',
    phone: '098544 55566',
    years: '15+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'pureveg',
    fssaiNumber: '22022066000048',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Tandoor Treats',
    address: 'Market Lane, 3rd Floor',
    phone: '098577 88899',
    years: '9+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'northindian',
    fssaiNumber: '22022066000049',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Saffron Spice',
    address: 'Green Avenue, 12B',
    phone: '098599 12345',
    years: '11+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'northindian',
    fssaiNumber: '22022066000050',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Punjabi Rasoi',
    address: 'Station Road, 4A',
    phone: '098511 67890',
    years: '7+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'northindian',
    fssaiNumber: '22022066000051',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Biryani House',
    address: 'Lake View, 9C',
    phone: '098522 33344',
    years: '13+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
    fssaiNumber: '22022066000052',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Flavours of India',
    address: 'Sunset Street, 5',
    phone: '098533 77788',
    years: '10+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
    fssaiNumber: '22022066000053',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Masala Magic',
    address: 'Hilltop, 2nd Cross',
    phone: '098544 99900',
    years: '6+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
    fssaiNumber: '22022066000054',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Curry Kingdom',
    address: 'Central Plaza, 1A',
    phone: '098555 11122',
    years: '14+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
    fssaiNumber: '22022066000055',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Desi Delights',
    address: 'Garden Road, 8',
    phone: '098566 22233',
    years: '8+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'southindian',
    fssaiNumber: '22022066000056',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Annapurna Caterers',
    address: 'Temple Lane, 10',
    phone: '098577 44455',
    years: '16+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
    fssaiNumber: '22022066000057',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Taste of Tradition',
    address: 'Heritage Street, 6',
    phone: '098588 55566',
    years: '9+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
    fssaiNumber: '22022066000058',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Shahi Dawat',
    address: 'Palace Road, 3B',
    phone: '098599 66677',
    years: '10+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
    fssaiNumber: '22022066000059',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Urban Zaika',
    address: 'Metro Complex, 7F',
    phone: '098511 77788',
    years: '5+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'mondaypureveg',
    fssaiNumber: '22022066000060',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Rasoi Ghar',
    address: 'Bazaar Street, 2',
    phone: '098522 88899',
    years: '12+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
    fssaiNumber: '22022066000061',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'The Indian Platter',
    address: 'Food Court, 11',
    phone: '098533 99900',
    years: '11+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
    fssaiNumber: '22022066000062',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Zaika Express',
    address: 'Expressway, 4C',
    phone: '098544 11122',
    years: '7+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
    fssaiNumber: '22022066000063',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
  {
    name: 'Royal Rasam',
    address: 'Lotus Lane, 5A',
    phone: '098555 22233',
    years: '13+',
    image: mealImage,
    serviceType: 'Lunch',
    menuType: 'wednesdayfridaynonveg',
    fssaiNumber: '22022066000064',
    lunchMenu: odishaLunchMenu,
    dinnerMenu: odishaDinnerMenu,
    breakfastMenu: odishaBreakfastMenu,
  },
];

// Add a styled pill for menu type
const MenuTypePill = styled(Box)(({ color }) => ({
  display: 'inline-block',
  background: color || '#1976d2',
  color: '#fff',
  borderRadius: '7px',
  fontSize: '15px',
  fontWeight: 600,
  minWidth: '110px',
  padding: '4px 22px',
  marginBottom: '8px',
  textAlign: 'center',
  marginRight: '10px',
  letterSpacing: 0.5,
  boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
}));

// Helper to determine menu type label
function getMenuTypeLabel(caterer, idx) {
  // Special case for the first card (Odisha Menu)
  if (idx === 0 && caterer.name === 'The Grand Odisha Kitchen') {
    return { label: 'Breakfast + Lunch + Dinner', color: '#1976d2' };
  }
  if (caterer.menuType === 'chinese') return { label: 'Chinese', color: '#ff9800' };
  const hasBreakfast = !!caterer.breakfastMenu;
  const hasLunch = !!caterer.lunchMenu;
  const hasDinner = !!caterer.dinnerMenu;
  if (hasBreakfast && hasLunch && hasDinner) return { label: 'Breakfast + Lunch + Dinner', color: '#1976d2' };
  if (hasLunch && hasDinner && !hasBreakfast) return { label: 'Lunch + Dinner', color: '#388e3c' };
  if (hasLunch && !hasDinner && !hasBreakfast) return { label: 'Lunch', color: '#43a047' };
  if (caterer.menuType === 'pureveg' || (!hasBreakfast && !hasDinner && hasLunch)) return { label: 'Pure Veg', color: '#43a047' };
  return { label: 'Menu', color: '#1976d2' };
}

const MenuPage = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.boldeats.in/api/users/vendors');
        console.log('Vendors response:', response.data);
        
        if (response.data && response.data.data) {
          setVendors(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('Failed to fetch vendors. Please try again later.');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const getSubscriptionPrice = (vendor) => {
    if (vendor.subscriptionPriceMonthly) {
      return `₹${vendor.subscriptionPriceMonthly} / Month`;
    } else if (vendor.subscriptionPrice15Days) {
      return `₹${vendor.subscriptionPrice15Days} / 15 Days`;
    }
    return 'Contact for Price';
  };

  if (loading) {
    return (
      <PageContainer>
        <Typography sx={{ textAlign: 'center', mt: 4 }}>Loading vendors...</Typography>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Typography sx={{ textAlign: 'center', mt: 4, color: 'error.main' }}>{error}</Typography>
      </PageContainer>
    );
  }

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
        For Breakfast and Dinner, contact <a href="mailto:support@boldeats.in" style={{fontWeight:'bold', color:'#C4362A', textDecoration: 'none'}}>support@boldeats.in</a>
      </Typography>
      {/* Vendor Cards */}
      {vendors.map((vendor, idx) => (
        <CardRow 
          key={idx} 
          onClick={() => {
            console.log('Selected vendor:', vendor);
            console.log('Navigating to menu details with vendor ID:', vendor.id);
            navigate('/menu-details', { 
              state: { 
                caterer: vendor,
                menuType: 'lunch' 
              } 
            });
          }} 
          style={{ cursor: 'pointer' }}
        >
          <CardImageLeft 
            src={vendor.logo ? `https://api.boldeats.in/${vendor.logo}` : 'https://via.placeholder.com/160?text=No+Image'} 
            alt={vendor.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/160?text=No+Image';
            }}
          />
          <CardContentRight>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{vendor.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i}>★</Star>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <img src={FSSAILogo} alt="FSSAI Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
              <Typography sx={{ fontSize: '0.8rem', color: '#666', textAlign: 'right', ml: 1 }}>{vendor.fssaiNumber}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
              <StaticPill color="red">Non-veg</StaticPill>
              <StaticPill color="green">Veg</StaticPill>
            </Box>
            <ContactText>
              <span style={{ fontWeight: 500 }}>{vendor.yearsInBusiness} years in business</span> · {vendor.address}<br />
              Open 24 hours<br />
              On-site services·Online appointments
            </ContactText>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
              <Box
                sx={{ 
                  ml: 'auto', 
                  mr: 2, 
                  fontSize: '0.98rem',
                  py: 0.5,
                  px: 2,
                  minWidth: 120,
                  background: '#C4362A',
                  color: '#fff',
                  borderRadius: '7px',
                  fontWeight: 500,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getSubscriptionPrice(vendor)}
              </Box>
            </Box>
          </CardContentRight>
        </CardRow>
      ))}
    </PageContainer>
  );
};

export default MenuPage; 