import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: { xs: '80px auto 20px', sm: '100px auto 30px', md: '120px auto 40px' },
  padding: { xs: '0 16px', sm: '0 24px', md: '0 40px' },
}));

const ProductContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: '30px', sm: '40px', md: '60px' },
  marginTop: { xs: '20px', sm: '30px', md: '40px' },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: { xs: '1', md: '0 0 45%' },
  position: 'relative',
  width: '100%',
  maxWidth: { xs: '100%', md: '45%' },
  margin: '0 auto',
}));

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const ProductInfo = styled(Box)(({ theme }) => ({
  flex: '1',
  width: '100%',
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: { xs: '20px', sm: '22px', md: '24px' },
  fontWeight: 500,
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  gap: { xs: '8px', sm: '10px', md: '12px' },
  marginBottom: { xs: '16px', sm: '20px', md: '24px' },
  flexWrap: 'wrap',
}));

const StrikethroughPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: '#666',
  fontSize: { xs: '16px', sm: '18px', md: '20px' },
}));

const BuyButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#000',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' },
  textTransform: 'none',
  fontSize: { xs: '14px', sm: '15px', md: '16px' },
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
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#C4362A',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' },
  textTransform: 'none',
  fontSize: { xs: '14px', sm: '15px', md: '16px' },
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
}));

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
        sx={{ 
          fontSize: { xs: '14px', sm: '16px' },
          '& .MuiBreadcrumbs-separator': {
            margin: { xs: '0 4px', sm: '0 8px' }
          }
        }}
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
        <Typography 
          color="text.primary"
          sx={{ 
            fontSize: { xs: '14px', sm: '16px' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.title}
        </Typography>
      </Breadcrumbs>

      <ProductContainer>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.title} />
        </ImageContainer>

        <ProductInfo>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: { xs: 2, sm: 2.5, md: 3 }, 
              fontWeight: 600,
              fontSize: { xs: '24px', sm: '28px', md: '32px' }
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ mb: { xs: 3, sm: 3.5, md: 4 } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: { xs: 1.5, sm: 2 }, 
                fontWeight: 600,
                fontSize: { xs: '16px', sm: '18px', md: '20px' }
              }}
            >
              Starts from
            </Typography>
            <PriceText>
              <StrikethroughPrice>{product.originalPrice}</StrikethroughPrice>
              <Typography 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: { xs: '20px', sm: '22px', md: '24px' }
                }}
              >
                {product.selectedPrice}
              </Typography>
            </PriceText>
          </Box>

          <Box 
            sx={{ 
              mb: { xs: 3, sm: 3.5, md: 4 }, 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 2 }
            }}
          >
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

          <Box sx={{ mb: { xs: 3, sm: 3.5, md: 4 } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: { xs: 1.5, sm: 2 }, 
                fontWeight: 600,
                fontSize: { xs: '16px', sm: '18px', md: '20px' }
              }}
            >
              Product Info
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: { xs: '14px', sm: '15px', md: '16px' }
              }}
            >
              {product.description}
            </Typography>
          </Box>
        </ProductInfo>
      </ProductContainer>
    </PageContainer>
  );
};

export default ProductPage; 