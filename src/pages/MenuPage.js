import React, { useState } from 'react';
import { Box, Typography, Button, styled, Tab, Tabs } from '@mui/material';
import mealImage from '../assets/images/mealImg.png'; // You'll need to add this image to your assets
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
});

const MenuGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '30px',
  padding: '40px',
  maxWidth: '1200px',
  margin: '0 auto',
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
  }
});

const MealImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
  flexShrink: 0
});

const BuyButton = styled(Button)({
  backgroundColor: 'white',
  color: '#000',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '4px 15px',
  textTransform: 'none',
  fontSize: '12px',
  minWidth: '80px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    border: '1px solid #E0E0E0',
  },
});

const SubscribeButton = styled(Button)({
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
});

// Add cart context if not already present
const addToCart = (item, isPurchase = true) => {
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItem = {
    ...item,
    quantity: 1,
    isPurchase,
    price: isPurchase ? item.buyOncePrice : item.subscribePrice
  };
  existingCart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(existingCart));
};

const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);

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
    // Add item to cart with buy once price
    addToCart(item, true);
    // Navigate to cart page
    navigate('/cart');
  };

  const handleSubscribeClick = (e, item) => {
    e.stopPropagation();
    // Add item to cart with subscription price
    addToCart(item, false);
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
                  lineHeight: '1.2'
                }}
              >
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
                  Buy once @ {item.buyOncePrice}
                </BuyButton>
                <SubscribeButton 
                  size="small"
                  onClick={(e) => handleSubscribeClick(e, item)}
                >
                  Subscribe to get @ {item.subscribePrice}
                </SubscribeButton>
              </Box>
            </Box>
          </MenuCard>
        ))}
      </MenuGrid>
    </PageContainer>
  );
};

export default MenuPage; 