import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, styled, CircularProgress, Snackbar, Alert, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
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

const SubscriptionNotice = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#C4362A',
  fontWeight: 500,
  fontSize: 15,
  margin: '40px 0 0 52px',
  letterSpacing: 0.5,
  lineHeight: 1,
  width: 'calc(100% - 104px)',
  '@media (max-width: 600px)': {
    margin: '20px 0 0 16px',
    fontSize: 14,
    width: 'calc(100% - 32px)',
  }
});

const SubscriptionCount = styled(Box)({
  color: '#C4362A',
  fontWeight: 400,
  fontSize: 15,
  marginLeft: 8,
  display: 'inline-block',
  '@media (max-width: 600px)': {
    fontSize: 13,
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
  alignItems: 'center',
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  border: 'none',
  width: '96%',
  maxWidth: '96%',
  margin: '0 auto 0 auto',
  minHeight: 170,
  position: 'relative',
  padding: 0,
  '@media (max-width: 1024px)': {
    margin: '0 2%',
    flexDirection: 'column',
    minHeight: 'auto',
    width: '96%',
    maxWidth: '96%',
  },
  '@media (max-width: 600px)': {
    margin: '0 2%',
    borderRadius: 12,
    width: '96%',
    maxWidth: '96%',
  }
});

const CatererImage = styled('img')({
  width: 220,
  height: 160,
  objectFit: 'cover',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  margin: 0,
  boxShadow: 'none',
  display: 'block',
  alignSelf: 'center',
  '@media (max-width: 1024px)': {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    alignSelf: 'center',
  },
  '@media (max-width: 600px)': {
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignSelf: 'center',
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
  fontSize: 22,
  marginBottom: 0,
  lineHeight: 1.1,
  color: '#222',
  '@media (max-width: 600px)': {
    fontSize: 18,
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

const TagLabel = styled(Box)(({ color }) => ({
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none', // not clickable
  userSelect: 'none',
  '@media (max-width: 600px)': {
    fontSize: 16,
    minWidth: 100,
    height: 34,
  }
}));

const getMenuTypeLabel = (menuType) => {
  if (menuType === 'veg') return 'Veg';
  if (menuType === 'non-veg') return 'Non-Veg';
  if (menuType === 'both') return 'Veg, Non-Veg';
  return menuType;
};

const getMealTypeLabel = (mealType) => {
  if (mealType === 'lunch') return 'Lunch';
  if (mealType === 'dinner') return 'Dinner';
  if (mealType === 'breakfast') return 'Breakfast';
  return mealType;
};

const StatusBox = styled(Box)(({ status }) => ({
  background: status === 'Active'
    ? 'linear-gradient(90deg, #0d6b2b 60%, #1db954 100%)'
    : 'linear-gradient(90deg, #C4362A 60%, #e57373 100%)',
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
}));

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
  display: 'inline-flex',
  alignItems: 'center',
  textAlign: 'center',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  gap: 6,
  '@media (max-width: 600px)': {
    fontSize: 18,
    padding: '6px 12px',
    gap: 4,
  }
});

const DailyOrderCard = styled(Box)({
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  padding: '24px',
  margin: '24px auto',
  width: '96%',
  maxWidth: '96%',
  '@media (max-width: 600px)': {
    padding: '16px',
    margin: '16px auto',
    borderRadius: 12,
  }
});

const OrderHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
  }
});

const OrderDate = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#333',
  '@media (max-width: 600px)': {
    fontSize: '16px',
  }
});

const OrderStatus = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '20px',
  backgroundColor: '#f5f5f5',
  '& svg': {
    fontSize: '20px',
  },
  '@media (max-width: 600px)': {
    padding: '6px 12px',
  }
});

const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginTop: '20px',
  '@media (max-width: 600px)': {
    gap: '12px',
  }
});

const ActionButton = styled(Button)({
  borderRadius: '25px',
  padding: '8px 24px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  '@media (max-width: 600px)': {
    padding: '6px 20px',
    fontSize: '14px',
  }
});

const AnimatedCardsContainer = styled(Box)({
  display: 'flex',
  gap: '24px',
  margin: '24px auto',
  width: '96%',
  maxWidth: '96%',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    gap: '16px',
  }
});

const AnimatedCard = styled(Box)(({ status }) => ({
  flex: 1,
  background: status === 'accepted' 
    ? 'linear-gradient(-45deg, #1a472a, #2d5a3f, #0d6b2b, #1db954)'
    : status === 'processing'
    ? 'linear-gradient(-45deg, #FF9800, #FFB74D, #F57C00, #EF6C00)'
    : status === 'delivered'
    ? 'linear-gradient(-45deg, #2196F3, #64B5F6, #1976D2, #1565C0)'
    : 'linear-gradient(-45deg, #1a1a1a, #2d2d2d, #404040, #333333)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  borderRadius: '20px',
  padding: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    animation: 'shine 3s infinite',
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  '@keyframes shine': {
    '0%': {
      left: '-100%',
    },
    '100%': {
      left: '100%',
    },
  },
  '@media (max-width: 600px)': {
    padding: '20px',
  }
}));

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  color: '#fff',
});

const CardTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& svg': {
    fontSize: '24px',
  },
  '@media (max-width: 600px)': {
    fontSize: '18px',
  }
});

const CardDate = styled(Typography)({
  fontSize: '14px',
  opacity: 0.9,
  '@media (max-width: 600px)': {
    fontSize: '12px',
  }
});

const AnimatedCardContent = styled(Box)({
  color: '#fff',
});

const AnimatedButton = styled(Button)({
  marginTop: '20px',
  borderRadius: '12px',
  padding: '10px 24px',
  color: '#fff',
  border: '2px solid rgba(255,255,255,0.5)',
  backdropFilter: 'blur(5px)',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '2px solid rgba(255,255,255,0.8)',
    background: 'rgba(255,255,255,0.1)',
  },
  '@media (max-width: 600px)': {
    padding: '8px 20px',
    fontSize: '14px',
  }
});

const StatusIndicator = styled(Box)(({ status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(5px)',
  marginTop: '16px',
  '& svg': {
    animation: status === 'processing' ? 'pulse 2s infinite' : 'none',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  }
}));

const SuccessMessage = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  padding: '16px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '12px',
  backdropFilter: 'blur(5px)',
  marginTop: '16px',
  textAlign: 'center',
});

const NextDayInfo = styled(Typography)({
  color: '#fff',
  opacity: 0.9,
  fontSize: '14px',
  marginTop: '8px',
  fontStyle: 'italic',
});

const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#C4362A',
  fontWeight: 500,
  fontSize: 15,
  margin: '40px 0 0 52px',
  letterSpacing: 0.5,
  lineHeight: 1,
  width: 'calc(100% - 104px)',
  '@media (max-width: 600px)': {
    margin: '20px 0 0 16px',
    fontSize: 14,
    width: 'calc(100% - 32px)',
  }
});

const OtpContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  marginTop: '16px',
  padding: '16px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '12px',
  backdropFilter: 'blur(5px)',
});

const OtpInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    width: '200px',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& input': {
    textAlign: 'center',
    letterSpacing: '0.5em',
    fontSize: '1.2em',
  },
});

const VerifyButton = styled(Button)({
  marginTop: '8px',
  background: 'rgba(255,255,255,0.2)',
  color: '#fff',
  padding: '8px 24px',
  borderRadius: '20px',
  '&:hover': {
    background: 'rgba(255,255,255,0.3)',
  },
});

const CommentContainer = styled(Box)({
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '16px',
  marginTop: '16px',
  backdropFilter: 'blur(5px)',
});

const CommentInput = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
  },
});

const PostButton = styled(Button)({
  marginTop: '8px',
  background: '#C4362A',
  color: '#fff',
  padding: '8px 24px',
  borderRadius: '20px',
  '&:hover': {
    background: '#b02d23',
  },
});

const DeliveredFoodImage = styled(Box)({
  marginTop: '16px',
  width: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
});

const CommentList = styled(Box)({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const CommentItem = styled(Box)({
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '8px',
  padding: '12px',
  '& .timestamp': {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '4px',
  },
});

const MealTypeDropdown = styled(FormControl)({
  marginTop: '16px',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255,255,255,0.7)',
  },
});

const NonVegDropdown = styled(FormControl)({
  marginTop: '12px',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255,255,255,0.7)',
  },
});

const SubmitButton = styled(Button)({
  marginTop: '16px',
  width: '100%',
  background: '#C4362A',
  color: '#fff',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': {
    background: '#b02d23',
  },
  '&.Mui-disabled': {
    background: 'rgba(196, 54, 42, 0.5)',
    color: 'rgba(255, 255, 255, 0.7)',
  }
});

const ConfirmationMessage = styled(Box)({
  marginTop: '16px',
  padding: '16px',
  background: 'rgba(76, 175, 80, 0.1)',
  borderRadius: '8px',
  textAlign: 'center',
  color: '#fff',
});

const SubscriptionPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [orderRejected, setOrderRejected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [deliveredImage, setDeliveredImage] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedNonVegType, setSelectedNonVegType] = useState('');
  const [mealSubmitted, setMealSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

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

  // Function to check if current time is within order window
  const isWithinOrderWindow = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const cutoffTime = 8 * 60 + 45; // 8:45 AM

    // Check if it's Monday to Saturday (0 is Sunday)
    if (day === 0) return false;
    
    // Check if time is between 12:00 AM and 8:45 AM
    return currentTime <= cutoffTime;
  };

  // Function to get next working day
  const getNextWorkingDay = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // If tomorrow is Sunday, add one more day
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    
    return tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Function to check if it's Wednesday or Friday
  const isNonVegDay = () => {
    const today = new Date().getDay();
    return today === 3 || today === 5; // 3 is Wednesday, 5 is Friday
  };

  const handleOrderAction = async (action) => {
    try {
      const isValidTime = isWithinOrderWindow();
      const nextDay = getNextWorkingDay();

      if (action === 'accept') {
        if (isValidTime) {
          setOrderAccepted(true);
          setAlertMessage('Please select your meal type for today');
        } else {
          setOrderAccepted(true);
          setAlertMessage(`Please select your meal type for ${nextDay}`);
        }
        setAlertSeverity('success');
      } else {
        setOrderRejected(true);
        setAlertMessage('Order Rejected for Today');
        setAlertSeverity('info');
      }
      setShowAlert(true);
    } catch (error) {
      console.error('Error handling order:', error);
      setAlertMessage('Failed to process your request. Please try again.');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleOtpVerify = () => {
    // Here you would typically verify the OTP with your backend
    if (otp.length === 6) {
      setOtpVerified(true);
      setAlertMessage('Order delivery confirmed successfully!');
      setAlertSeverity('success');
      setShowAlert(true);
    } else {
      setAlertMessage('Please enter a valid 6-digit OTP');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        timestamp: new Date().toLocaleString(),
      };
      setComments([newComment, ...comments]);
      setComment('');
      setAlertMessage('Comment posted successfully!');
      setAlertSeverity('success');
      setShowAlert(true);
    }
  };

  // Function to get formatted date
  const getFormattedDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to check if non-veg should be available
  const isNonVegAvailable = () => {
    const now = new Date();
    const orderTime = now.getHours() * 60 + now.getMinutes();
    const cutoffTime = 8 * 60 + 45; // 8:45 AM

    if (orderTime > cutoffTime) {
      // If after 8:45 AM, check next day
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDay = tomorrow.getDay();
      return tomorrowDay === 3 || tomorrowDay === 5; // Wednesday or Friday
    } else {
      // If before 8:45 AM, check current day
      const today = now.getDay();
      return today === 3 || today === 5;
    }
  };

  // Function to handle meal submission
  const handleMealSubmit = () => {
    const now = new Date();
    const orderTime = now.getHours() * 60 + now.getMinutes();
    const cutoffTime = 8 * 60 + 45; // 8:45 AM
    
    let deliveryDate = new Date();
    if (orderTime > cutoffTime) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // Skip Sunday
      if (deliveryDate.getDay() === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
    }

    const mealType = selectedMealType === 'pureveg' ? 'Pure Veg' : 'Regular';
    const nonVegOption = selectedNonVegType ? ` with ${selectedNonVegType.charAt(0).toUpperCase() + selectedNonVegType.slice(1)} Curry` : '';
    
    setSubmissionMessage(`Your ${mealType}${nonVegOption} meal has been confirmed for ${getFormattedDate(deliveryDate)}`);
    setMealSubmitted(true);
    setAlertMessage('Meal preference submitted successfully!');
    setAlertSeverity('success');
    setShowAlert(true);
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
      <SectionHeader>
        <span>SUBSCRIPTION DETAILS</span>
        <SubscriptionCount>(1)</SubscriptionCount>
      </SectionHeader>
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
        <>
          <CardContainer>
            <CatererImage 
              src={subscription.vendor?.logo ? `https://api.boldeats.in/${subscription.vendor.logo}` : catererImg}
              alt={subscription.vendor?.name || 'Caterer'}
              onError={e => { e.target.src = catererImg; }}
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
                  <span>On-site services 0Online appointments</span>
                </DetailsBlock>
              </TopRow>
              <TagRow>
                <TagLabel color="red">Non-veg</TagLabel>
                <TagLabel color="green">Veg</TagLabel>
              </TagRow>
            </CardContent>
            <StatusBox status={subscription.subscription?.status}>
              <GreenLeft>
                <GreenLabel>ITEM TYPE : {subscription.subscription?.menuType === 'both' ? '(Regular)' : subscription.subscription?.menuType === 'veg' ? '(Veg)' : '(Non-Veg)'}</GreenLabel>
                <ItemTypeBox>
                  <SmallTag active={subscription.subscription?.menuType === 'veg' || subscription.subscription?.menuType === 'both'}>Veg</SmallTag>
                  <SmallTag active={subscription.subscription?.menuType === 'non-veg' || subscription.subscription?.menuType === 'both'}>Non-Veg</SmallTag>
                </ItemTypeBox>
                <GreenLabel>MEAL TYPE :</GreenLabel>
                <MealTypeBox>
                  <SmallTag active>Lunch</SmallTag>
                </MealTypeBox>
              </GreenLeft>
              <GreenRight>
                <SubscriptionTitle>Subscription</SubscriptionTitle>
                <PriceBox sx={{ background: subscription.subscription?.status === 'Active' ? '#C4362A' : '#b71c1c' }}>
                  ₹{subscription.planAmount}/-<span style={{ fontWeight: 400, fontSize: '0.95em', marginLeft: 4 }}>({subscription.subscription?.duration || '15 days'})</span>
                </PriceBox>
              </GreenRight>
            </StatusBox>
          </CardContainer>

          <SectionHeader>
            <span>ORDER ACCEPT AND STATUS</span>
          </SectionHeader>
          <HorizontalLine />

          <AnimatedCardsContainer>
            {/* Order Accepting Card */}
            <AnimatedCard status={orderAccepted ? 'accepted' : 'pending'}>
              <CardHeader>
                <CardTitle>
                  <AccessTimeIcon />
                  Daily Order
                </CardTitle>
                <CardDate>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </CardDate>
              </CardHeader>
              <AnimatedCardContent>
                {!orderAccepted && !orderRejected ? (
                  <>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                      Please confirm your meal{' '}
                      {isWithinOrderWindow() ? 'for today' : `for ${getNextWorkingDay()}`}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                      Order acceptance window: 12:00 AM - 8:45 AM (Mon-Sat)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <AnimatedButton
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleOrderAction('accept')}
                      >
                        Accept
                      </AnimatedButton>
                      <AnimatedButton
                        startIcon={<CancelIcon />}
                        onClick={() => handleOrderAction('reject')}
                      >
                        Reject
                      </AnimatedButton>
                    </Box>
                  </>
                ) : orderAccepted && !mealSubmitted ? (
                  <SuccessMessage>
                    <CheckCircleIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      Order Accepted Successfully!
                    </Typography>
                    
                    {/* Meal Type Selection */}
                    <MealTypeDropdown>
                      <InputLabel>Select Meal Type</InputLabel>
                      <Select
                        value={selectedMealType}
                        onChange={(e) => {
                          setSelectedMealType(e.target.value);
                          setSelectedNonVegType(''); // Reset non-veg selection when meal type changes
                        }}
                        label="Select Meal Type"
                      >
                        <MenuItem value="regular">Regular</MenuItem>
                        <MenuItem value="pureveg">Pure Veg</MenuItem>
                      </Select>
                    </MealTypeDropdown>

                    {/* Non-veg Options for Wednesday and Friday */}
                    {isNonVegAvailable() && selectedMealType === 'regular' && (
                      <NonVegDropdown>
                        <InputLabel>Select Non-Veg Option</InputLabel>
                        <Select
                          value={selectedNonVegType}
                          onChange={(e) => setSelectedNonVegType(e.target.value)}
                          label="Select Non-Veg Option"
                        >
                          <MenuItem value="egg">Egg Curry</MenuItem>
                          <MenuItem value="chicken">Chicken Curry</MenuItem>
                          <MenuItem value="fish">Fish Curry</MenuItem>
                        </Select>
                      </NonVegDropdown>
                    )}

                    {/* Submit Button */}
                    <SubmitButton
                      onClick={handleMealSubmit}
                      disabled={!selectedMealType || (selectedMealType === 'regular' && isNonVegAvailable() && !selectedNonVegType)}
                    >
                      Confirm Meal Selection
                    </SubmitButton>

                    <NextDayInfo>
                      {isWithinOrderWindow() 
                        ? "Your meal will be delivered today"
                        : `Your meal will be delivered on ${getNextWorkingDay()}`}
                    </NextDayInfo>
                  </SuccessMessage>
                ) : mealSubmitted && (
                  <SuccessMessage>
                    <CheckCircleIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
                    <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                      Meal Selection Confirmed!
                    </Typography>
                    <ConfirmationMessage>
                      {submissionMessage}
                    </ConfirmationMessage>
                  </SuccessMessage>
                )}
              </AnimatedCardContent>
            </AnimatedCard>

            {/* Delivery Status Card */}
            <AnimatedCard status={subscription.orderStatus === 'delivered' ? 'delivered' : 'processing'}>
              <CardHeader>
                <CardTitle>
                  <LocalShippingIcon />
                  Delivery Status
                </CardTitle>
                <CardDate>
                  Updated {new Date().toLocaleTimeString()}
                </CardDate>
              </CardHeader>
              <AnimatedCardContent>
                <StatusIndicator status={subscription.orderStatus}>
                  {subscription.orderStatus === 'delivered' ? (
                    <>
                      <DoneAllIcon />
                      <Typography>Order Delivered</Typography>
                    </>
                  ) : (
                    <>
                      <LocalShippingIcon />
                      <Typography>Order Processing</Typography>
                    </>
                  )}
                </StatusIndicator>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                  {subscription.orderStatus === 'delivered' 
                    ? 'Your order has been delivered successfully'
                    : 'Your order is being prepared and will be delivered soon'}
                </Typography>

                {subscription.orderStatus === 'delivered' && (
                  <>
                    {/* Delivered Food Image */}
                    <DeliveredFoodImage>
                      {deliveredImage ? (
                        <img src={deliveredImage} alt="Delivered Food" />
                      ) : (
                        <Box sx={{
                          height: '200px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255,255,255,0.05)',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          <ImageIcon sx={{ fontSize: 40, opacity: 0.5 }} />
                          <Typography sx={{ opacity: 0.7 }}>
                            {selectedMealType === 'pureveg' 
                              ? 'Pure Veg Food Image Will Appear Here'
                              : 'Food Image Will Appear Here'}
                          </Typography>
                        </Box>
                      )}
                    </DeliveredFoodImage>

                    {/* Comment Section */}
                    <CommentContainer>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        Share Your Feedback on{' '}
                        {selectedMealType === 'pureveg' 
                          ? 'Pure Veg Meal'
                          : isNonVegDay() && selectedNonVegType 
                            ? `${selectedNonVegType.charAt(0).toUpperCase() + selectedNonVegType.slice(1)} Curry`
                            : 'Regular Meal'}
                      </Typography>
                      <CommentInput
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                        variant="outlined"
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <PostButton
                          endIcon={<SendIcon />}
                          onClick={handleCommentSubmit}
                        >
                          Post Comment
                        </PostButton>
                      </Box>

                      {/* Comments List */}
                      <CommentList>
                        {comments.map((comment, index) => (
                          <CommentItem key={index}>
                            <Typography sx={{ color: '#fff' }}>{comment.text}</Typography>
                            <Typography className="timestamp">{comment.timestamp}</Typography>
                          </CommentItem>
                        ))}
                      </CommentList>
                    </CommentContainer>
                  </>
                )}
              </AnimatedCardContent>
            </AnimatedCard>
          </AnimatedCardsContainer>
        </>
      )}

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={alertSeverity} 
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default SubscriptionPage; 