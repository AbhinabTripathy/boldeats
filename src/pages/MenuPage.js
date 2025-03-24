import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, styled, Tab, Tabs } from '@mui/material';
import mealImage from '../assets/images/mealImg.png';  
import { useNavigate } from 'react-router-dom';

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 90px)', 
  display: 'flex',
  flexDirection: 'column',
  marginTop: '120px',
  paddingBottom: '40px'
});

const CategoryTabs = styled(Tabs)({
  backgroundColor: '#f5f5f5',
  height: '100px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiTabs-indicator': {
    backgroundColor: '#C4362A',
    height: '3px',
  },
  '& .MuiTabs-flexContainer': {
    height: '100%',
    alignItems: 'center',
  },
  '@media (max-width: 768px)': {
    height: '80px',
  }
});

const CategoryTab = styled(Tab)({
  backgroundColor: 'white',
  borderRadius: '30px',
  margin: '0 10px',
  padding: '10px 40px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#000',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    backgroundColor: '#C4362A',
    color: 'white',
  },
  '&:hover': {
    backgroundColor: props => props.selected ? '#C4362A' : 'white',
    color: props => props.selected ? 'white' : '#000',
  },
  '@media (max-width: 768px)': {
    padding: '8px 20px',
    fontSize: '14px',
    margin: '0 5px',
  }
});

const MenuGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '30px',
  padding: '40px',
  maxWidth: '1200px',
  margin: '0 auto',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    padding: '20px',
    gap: '15px',
  }
});

const MenuCard = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  height: '160px',
  width: '100%',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  '@media (max-width: 768px)': {
    height: '120px',
    padding: '10px',
    gap: '10px',
  }
});

const MealImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
  flexShrink: 0,
  '@media (max-width: 768px)': {
    width: '80px',
    height: '80px',
  }
});

const BuyButton = styled(Button)({
  backgroundColor: '#C4362A',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 15px',
  textTransform: 'none',
  fontSize: '12px',
  minWidth: '80px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#b02d23',
  },
  '@media (max-width: 768px)': {
    fontSize: '10px',
    padding: '2px 10px',
    minWidth: '70px',
  }
});

// Add cart context if not already present
const addToCart = (item, isPurchase = true) => {
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItem = {
    ...item,
    quantity: 1,
    isPurchase: true,
    price: item.buyOncePrice
  };
  existingCart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(existingCart));
};

// Define a global function to open the login modal that can be called from any component
window.openLoginModal = () => {
  // Set the flag in localStorage
  localStorage.setItem('requiresLogin', 'true');
  // Try both event types
  window.dispatchEvent(new Event('showLoginModal'));
  window.dispatchEvent(new CustomEvent('showLoginModal'));
};

const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  // Check if user is logged in whenever component renders
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Listen for login events
  useEffect(() => {
    // Function to check login status
    const checkLoginStatus = () => {
      const currentLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(currentLoginStatus);
      
      // If user just logged in and there's a pending cart item in localStorage
      if (currentLoginStatus) {
        const pendingItemStr = localStorage.getItem('pendingCartItem');
        if (pendingItemStr) {
          try {
            // Parse the pending item from localStorage
            const pendingItem = JSON.parse(pendingItemStr);
            // Add the pending item to cart
            addToCart(pendingItem, true);
            // Clear the pending item
            localStorage.removeItem('pendingCartItem');
            // Navigate to cart page
            navigate('/cart');
          } catch (error) {
            console.error('Error parsing pending cart item:', error);
          }
        }
      }
    };

    // Check on mount and when storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Check initially and set up an interval
    checkLoginStatus();
    const loginCheckInterval = setInterval(checkLoginStatus, 500);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(loginCheckInterval);
    };
  }, [navigate]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleCardClick = (item) => {
    const category = getCategoryName(selectedCategory);
    navigate('/product', {
      state: {
        product: {
          ...item,
          description: 'Fresh homestyle meal prepared with high-quality ingredients',
          selectedPrice: item.buyOncePrice,
          isPurchase: true,
          category: category
        }
      }
    });
  };

  const handleBuyClick = (e, item) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      // Store the item that was going to be added to cart in localStorage
      localStorage.setItem('pendingCartItem', JSON.stringify(item));
      
      // Set flags in localStorage that will be checked by Header component
      localStorage.setItem('requiresLogin', 'true');
      localStorage.setItem('loginRedirectUrl', '/cart');
      
      // Try all approaches to trigger the login modal
      
      // 1. Try the direct function exposed by Header component (most reliable)
      if (typeof window.openLoginModalFromHeader === 'function') {
        window.openLoginModalFromHeader();
        return;
      }
      
      // 2. Use the global function approach
      if (typeof window.openLoginModal === 'function') {
        window.openLoginModal();
      }
      
      // 3. Try the event dispatch approach
      window.dispatchEvent(new CustomEvent('showLoginModal'));
      
      // 4. Reload the page as a last resort (this is the most reliable method)
      // Use a short timeout to allow the localStorage to be set
      setTimeout(() => {
        window.location.reload();
      }, 50);
      
      return;
    }
    
    // User is logged in, add to cart
    addToCart(item, true);
    // Navigate to cart page
    navigate('/cart');
  };

  const getCategoryName = (index) => {
    switch(index) {
      case 0:
        return 'Veg';
      case 1:
        return 'Non-Veg';
      case 2:
        return 'Keto';
      default:
        return 'Veg';
    }
  };

  const vegItems = [
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: mealImage,
    },
    // ... other veg items
  ];

  const nonVegItems = [
    {
      title: 'Chicken Biryani with Raita',
      originalPrice: '₹149',
      buyOncePrice: '₹129',
      subscribePrice: '₹119',
      image: mealImage,
    },
    {
      title: 'Fish Curry with Rice',
      originalPrice: '₹139',
      buyOncePrice: '₹119',
      subscribePrice: '₹109',
      image: mealImage,
    },
    // ... other non-veg items
  ];

  const ketoItems = [
    {
      title: 'Keto Bowl with Grilled Chicken',
      originalPrice: '₹199',
      buyOncePrice: '₹179',
      subscribePrice: '₹159',
      image: mealImage,
    },
    {
      title: 'Keto Cauliflower Rice Bowl',
      originalPrice: '₹179',
      buyOncePrice: '₹159',
      subscribePrice: '₹139',
      image: mealImage,
    },
    // ... other keto items
  ];

  // Get current menu items based on selected category
  const getCurrentMenuItems = () => {
    switch(selectedCategory) {
      case 0:
        return vegItems;
      case 1:
        return nonVegItems;
      case 2:
        return ketoItems;
      default:
        return vegItems;
    }
  };

  return (
    <PageContainer>
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <Box sx={{ width: '100%', margin: '0 auto' }}>
          <CategoryTabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            centered
            TabIndicatorProps={{
              style: {
                display: 'none'
              }
            }}
          >
            <CategoryTab 
              label="VEG" 
              selected={selectedCategory === 0}
            />
            <CategoryTab 
              label="NON-VEG" 
              selected={selectedCategory === 1}
            />
            <CategoryTab 
              label="KETO" 
              selected={selectedCategory === 2}
            />
          </CategoryTabs>
        </Box>
      </Box>

      <MenuGrid>
        {getCurrentMenuItems().map((item, index) => (
          <MenuCard 
            key={index}
            onClick={() => handleCardClick(item)}
          >
            <MealImage src={item.image} alt={item.title} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '1.2',
                  '@media (max-width: 768px)': {
                    fontSize: '14px',
                  }
                }}
              >
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, '@media (max-width: 768px)': { '& .MuiTypography-root': { fontSize: '12px', } } }}>
                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#666' }}>
                  {item.originalPrice}
                </Typography>
                <Typography variant="body2">
                  Only For {item.buyOncePrice}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <BuyButton 
                  size="small"
                  onClick={(e) => handleBuyClick(e, item)}
                >
                  {item.buyOncePrice}
                </BuyButton>
              </Box>
            </Box>
          </MenuCard>
        ))}
      </MenuGrid>
    </PageContainer>
  );
};

export default MenuPage; 