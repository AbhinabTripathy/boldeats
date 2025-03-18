import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageContainer = styled(Box)({
  maxWidth: '1200px',
  margin: '120px auto 40px',
  padding: '0 40px',
});

const ProductContainer = styled(Box)({
  display: 'flex',
  gap: '60px',
  marginTop: '40px',
});

const ImageContainer = styled(Box)({
  flex: '0 0 45%',
  position: 'relative',
});

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const ProductInfo = styled(Box)({
  flex: '1',
});

const PriceText = styled(Typography)({
  fontSize: '24px',
  fontWeight: 500,
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '24px',
});

const StrikethroughPrice = styled(Typography)({
  textDecoration: 'line-through',
  color: '#666',
  fontSize: '20px',
});

const BuyButton = styled(Button)({
  backgroundColor: 'white',
  color: '#000',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  width: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    border: '1px solid #E0E0E0',
  },
  '&.Mui-disabled': {
    backgroundColor: 'white',
    color: '#000',
    opacity: 0.7,
    border: '1px solid #E0E0E0',
  }
});

const SubscribeButton = styled(Button)({
  backgroundColor: '#C4362A',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  width: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#b02d23',
  },
  '&.Mui-disabled': {
    backgroundColor: '#C4362A',
    color: 'white',
    opacity: 0.7,
  }
});

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {
    product: {
      title: 'Rice, Dal, Veg Curry, Papad, Salad',
      originalPrice: '₹99',
      buyOncePrice: '₹89',
      subscribePrice: '₹79',
      image: '/path/to/your/image.jpg',
      description: 'Fresh homestyle meal prepared with high-quality ingredients',
      selectedPrice: '₹89',
      isPurchase: true,
      category: 'Veg'
    }
  };

  const handleActionButtonClick = (isPurchase) => {
    const userName = "User"; // This should be replaced with actual user name from your auth system
    const whatsappNumber = "917684836139";
    let message = "";

    if (isPurchase) {
      message = `Hi ${userName}, buying once ${product.title} with price ${product.buyOncePrice}. Please provide me the Payment details.`;
    } else {
      message = `Hi ${userName}, buying Subscription ${product.title} with price ${product.subscribePrice}. Please provide me the Payment details and details of the subscriptions.`;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const getBreadcrumbCategory = () => {
    if (product.category === 'Keto') {
      // Check if the title includes chicken, fish, or other non-veg indicators
      if (product.title.toLowerCase().includes('chicken') || 
          product.title.toLowerCase().includes('fish') ||
          product.title.toLowerCase().includes('mutton') ||
          product.title.toLowerCase().includes('egg')) {
        return 'Keto Non-Veg';
      }
      return 'Keto Veg';
    }
    return product.category;
  };

  return (
    <PageContainer>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/menu')}
        >
          Menu
        </Link>
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/menu')}
        >
          {getBreadcrumbCategory()}
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <ProductContainer>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.title} />
        </ImageContainer>

        <ProductInfo>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            {product.title}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Starts from
            </Typography>
            <PriceText>
              <StrikethroughPrice>{product.originalPrice}</StrikethroughPrice>
              <Typography sx={{ fontWeight: 600, fontSize: '24px' }}>
                {product.selectedPrice}
              </Typography>
            </PriceText>
          </Box>

          <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
            <BuyButton 
              disabled={!product.isPurchase}
              onClick={() => handleActionButtonClick(true)}
            >
              Buy once @ {product.buyOncePrice}
            </BuyButton>
            <SubscribeButton 
              onClick={() => handleActionButtonClick(false)}
            >
              Subscribe to get @ {product.subscribePrice}
            </SubscribeButton>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Product Info
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              {product.description}
            </Typography>
          </Box>
        </ProductInfo>
      </ProductContainer>
    </PageContainer>
  );
};

export default ProductPage; 