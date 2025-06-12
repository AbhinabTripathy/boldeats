import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, styled, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import catererImg from '../assets/images/thali2.png'; // Replace with your actual image path
import axios from 'axios';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: '#fff',
  padding: '24px 0',
  '@media (max-width: 600px)': {
    padding: '16px 0',
  }
});

const SubscriptionNotice = styled(Typography)({
  color: '#C4362A',
  fontWeight: 500,
  fontSize: 15,
  margin: '40px 0 0 52px',
  letterSpacing: 0.5,
  lineHeight: 1,
  '@media (max-width: 600px)': {
    margin: '20px 0 0 16px',
    fontSize: 14,
  }
});

const HorizontalLine = styled('hr')({
  border: 'none',
  borderTop: '1.5px solid #d3d3d3',
  margin: '8px 0 32px 52px',
  width: 'calc(100% - 104px)',
  '@media (max-width: 600px)': {
    margin: '8px 0 24px 16px',
    width: 'calc(100% - 32px)',
  }
});

const CardContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  border: 'none',
  maxWidth: 1350,
  margin: '0 0 0 52px',
  minHeight: 170,
  position: 'relative',
  padding: 0,
  '@media (max-width: 1024px)': {
    margin: '0 16px',
    flexDirection: 'column',
    minHeight: 'auto',
  },
  '@media (max-width: 600px)': {
    margin: '0 16px',
    borderRadius: 12,
  }
});

const CatererImage = styled('img')({
  width: 200,
  height: 130,
  objectFit: 'cover',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  margin: 0,
  boxShadow: 'none',
  display: 'block',
  '@media (max-width: 1024px)': {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
  },
  '@media (max-width: 600px)': {
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  }
});

const CardContent = styled(Box)({
  flex: 1,
  padding: '18px 0 18px 28px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minWidth: 0,
  '@media (max-width: 1024px)': {
    padding: '18px 16px',
  },
  '@media (max-width: 600px)': {
    padding: '16px',
  }
});

const TopRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
    gap: '16px',
  }
});

const TitleStars = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  }
});

const Title = styled(Typography)({
  fontWeight: 600,
  fontSize: 28,
  marginBottom: 0,
  lineHeight: 1.1,
  color: '#222',
  '@media (max-width: 600px)': {
    fontSize: 24,
  }
});

const StarRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8,
  marginTop: 2,
  '@media (max-width: 600px)': {
    marginLeft: 0,
  }
});

const DetailsBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: 32,
  marginTop: 2,
  fontSize: 14,
  color: '#222',
  fontWeight: 400,
  lineHeight: 1.3,
  minWidth: 220,
  '@media (max-width: 1024px)': {
    marginLeft: 0,
  },
  '@media (max-width: 600px)': {
    fontSize: 13,
  }
});

const TagRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  margin: '18px 0 0 0',
  '@media (max-width: 600px)': {
    gap: 12,
    margin: '16px 0 0 0',
  }
});

const TagButton = styled(Button)(({ color }) => ({
  background: color === 'red' ? '#C4362A' : '#6CB33F',
  color: '#fff',
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 18,
  minWidth: 120,
  height: 38,
  marginRight: 0,
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    background: color === 'red' ? '#a82a1f' : '#4e8c2a',
  },
  '@media (max-width: 600px)': {
    fontSize: 16,
    minWidth: 100,
    height: 34,
  }
}));

const GreenCard = styled(Box)({
  background: 'linear-gradient(90deg, #0d6b2b 60%, #1db954 100%)',
  borderRadius: 14,
  color: '#fff',
  minWidth: 370,
  minHeight: 120,
  padding: '18px 22px',
  margin: '18px 18px 18px 32px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  position: 'relative',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  '@media (max-width: 1024px)': {
    margin: '18px 16px',
    minWidth: 'auto',
  },
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    padding: '16px',
    margin: '16px',
    borderRadius: 12,
    minHeight: 'auto',
  }
});

const GreenLeft = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minWidth: 0,
  '@media (max-width: 600px)': {
    marginBottom: '16px',
  }
});

const GreenLabel = styled(Typography)({
  fontWeight: 600,
  fontSize: 13,
  marginBottom: 2,
  color: '#fff',
  opacity: 0.95,
  '@media (max-width: 600px)': {
    fontSize: 12,
  }
});

const ItemTypeBox = styled(Box)({
  marginBottom: 8,
  display: 'flex',
  gap: 8,
  '@media (max-width: 600px)': {
    marginBottom: 6,
  }
});

const MealTypeBox = styled(Box)({
  marginBottom: 0,
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  '@media (max-width: 600px)': {
    gap: 6,
  }
});

const SmallTag = styled(Box)(({ active }) => ({
  display: 'inline-block',
  background: active ? '#fff' : 'rgba(255,255,255,0.15)',
  color: active ? '#0d6b2b' : '#fff',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 13,
  padding: '2px 16px',
  border: active ? '1.5px solid #0d6b2b' : 'none',
  minWidth: 56,
  textAlign: 'center',
  '@media (max-width: 600px)': {
    fontSize: 12,
    padding: '2px 12px',
    minWidth: 50,
  }
}));

const GreenRight = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  minWidth: 0,
  marginLeft: 32,
  flex: 1,
  '@media (max-width: 600px)': {
    marginLeft: 0,
    alignItems: 'flex-start',
  }
});

const SubscriptionTitle = styled(Typography)({
  fontFamily: 'cursive',
  fontWeight: 700,
  fontSize: 28,
  marginBottom: 8,
  color: '#fff',
  letterSpacing: 1,
  textAlign: 'right',
  '@media (max-width: 600px)': {
    fontSize: 24,
    textAlign: 'left',
  }
});

const PriceBox = styled(Box)({
  background: '#C4362A',
  color: '#fff',
  borderRadius: 10,
  padding: '8px 22px',
  fontWeight: 700,
  fontSize: 22,
  marginTop: 0,
  marginBottom: 0,
  display: 'inline-block',
  textAlign: 'center',
  fontFamily: 'inherit',
  '@media (max-width: 600px)': {
    fontSize: 20,
    padding: '6px 18px',
  }
});

const SubscriptionPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      fetchSubscriptions(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchSubscriptions = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.boldeats.in/api/users/subscription', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.success) {
        setSubscriptions(response.data.data || []);
      } else {
        setError('Failed to fetch subscriptions');
      }
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError(err.response?.data?.message || 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (window.openLoginModalFromHeader) {
      window.openLoginModalFromHeader();
    }
  };

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#333' }}>
            Login to View Your Subscriptions
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
            Please login to access your subscription list and manage your meal plans.
          </Typography>
          <Button
            variant="contained"
            onClick={handleLoginClick}
            sx={{
              backgroundColor: '#C4362A',
              color: 'white',
              padding: '12px 32px',
              fontSize: '16px',
              borderRadius: '25px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#b02d23',
              }
            }}
          >
            Login Now
          </Button>
        </Box>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <CircularProgress sx={{ color: '#C4362A' }} />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#C4362A' }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => fetchSubscriptions(localStorage.getItem('token'))}
            sx={{
              backgroundColor: '#C4362A',
              color: 'white',
              padding: '12px 32px',
              fontSize: '16px',
              borderRadius: '25px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#b02d23',
              }
            }}
          >
            Retry
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SubscriptionNotice>
        SUBSCRIPTION TAKEN
        <span style={{ float: 'right', color: '#C4362A', fontWeight: 400, fontSize: 15, marginRight: 50 }}>
          ({subscriptions.length})
        </span>
      </SubscriptionNotice>
      <HorizontalLine />
      
      {subscriptions.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '40vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
            No Active Subscriptions
          </Typography>
          <Typography variant="body1" sx={{ color: '#888' }}>
            You don't have any active subscriptions at the moment.
          </Typography>
        </Box>
      ) : (
        subscriptions.map((subscription, index) => (
          <CardContainer key={subscription.id || index}>
            <CatererImage 
              src={`https://api.boldeats.in/${subscription.vendor?.logo}`} 
              alt={subscription.vendor?.name || 'Caterer'} 
              onError={(e) => {
                e.target.src = catererImg;
              }}
            />
            <CardContent>
              <TopRow>
                <TitleStars>
                  <Title>{subscription.vendor?.name || 'Glorious Caterers'}</Title>
                  <StarRow>
                    {[...Array(subscription.vendor?.rating || 5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFD600', fontSize: 22, mr: 0.5 }} />
                    ))}
                  </StarRow>
                </TitleStars>
                <DetailsBlock>
                  <span>{subscription.vendor?.yearsInBusiness || '10+'} years in business &middot;</span>
                  <span>{subscription.vendor?.address || 'Main road Side'} &middot; {subscription.vendor?.phoneNumber || '098533 37333'}</span>
                  <span>Open {subscription.vendor?.openingTime || '24 hours'}</span>
                  <span>{subscription.vendor?.services || 'On-site services&middot;Online appointments'}</span>
                </DetailsBlock>
              </TopRow>
              <TagRow>
                <TagButton color="red">Non-veg</TagButton>
                <TagButton color="green">Veg</TagButton>
              </TagRow>
            </CardContent>
            <GreenCard>
              <GreenLeft>
                <GreenLabel>ITEM TYPE :</GreenLabel>
                <ItemTypeBox>
                  <SmallTag active={subscription.itemType === 'veg'}>Veg</SmallTag>
                  <SmallTag active={subscription.itemType === 'non-veg'}>Non-Veg</SmallTag>
                </ItemTypeBox>
                <GreenLabel>MEAL TYPE :</GreenLabel>
                <MealTypeBox>
                  <SmallTag active={subscription.mealType === 'breakfast'}>Breakfast</SmallTag>
                  <SmallTag active={subscription.mealType === 'lunch'}>Lunch</SmallTag>
                  <SmallTag active={subscription.mealType === 'dinner'}>Dinner</SmallTag>
                </MealTypeBox>
              </GreenLeft>
              <GreenRight>
                <SubscriptionTitle>Subscription</SubscriptionTitle>
                <PriceBox>₹{subscription.price}/-({subscription.days} days)</PriceBox>
              </GreenRight>
            </GreenCard>
          </CardContainer>
        ))
      )}
    </PageContainer>
  );
};

export default SubscriptionPage; 