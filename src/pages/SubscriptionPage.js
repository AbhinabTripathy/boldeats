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
  const [subscription, setSubscription] = useState(null);
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
      console.log('Fetching subscriptions...');
      const response = await axios.get('https://api.boldeats.in/api/users/subscription', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('API Response:', response.data);

      if (response.data && response.data.success) {
        setSubscription(response.data.data);
        console.log('Subscription data set:', response.data.data);
      } else {
        setSubscription(null);
        setError('Failed to fetch subscription');
        console.error('Failed to fetch subscription:', response.data);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setSubscription(null);
      setError(err.response?.data?.message || 'Failed to fetch subscription');
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
        SUBSCRIPTION DETAILS
      </SubscriptionNotice>
      <HorizontalLine />
      
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <CircularProgress sx={{ color: '#C4362A' }} />
        </Box>
      ) : error ? (
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
      ) : !subscription ? (
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
            No Active Subscription
          </Typography>
          <Typography variant="body1" sx={{ color: '#888' }}>
            You don't have an active subscription at the moment.
          </Typography>
        </Box>
      ) : (
        <CardContainer>
          <CardContent>
            <TopRow>
              <TitleStars>
                <Title>Subscription Details</Title>
              </TitleStars>
            </TopRow>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                Plan Details
              </Typography>
              <Box sx={{ 
                background: '#f5f5f5', 
                borderRadius: 2, 
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ color: '#666' }}>Plan Amount</Typography>
                  <Typography sx={{ fontWeight: 600 }}>₹{subscription.planAmount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ color: '#666' }}>Payment Method</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{subscription.method}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardContainer>
      )}
    </PageContainer>
  );
};

export default SubscriptionPage; 