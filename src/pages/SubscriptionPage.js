import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import catererImg from '../assets/images/thali2.png'; // Replace with your actual image path

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: '#fff',
  padding: '24px 0',
});

const SubscriptionNotice = styled(Typography)({
  color: '#C4362A',
  fontWeight: 500,
  fontSize: 15,
  margin: '40px 0 0 52px',
  letterSpacing: 0.5,
  lineHeight: 1,
});

const HorizontalLine = styled('hr')({
  border: 'none',
  borderTop: '1.5px solid #d3d3d3',
  margin: '8px 0 32px 52px',
  width: 'calc(100% - 104px)',
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
});

const CardContent = styled(Box)({
  flex: 1,
  padding: '18px 0 18px 28px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minWidth: 0,
});

const TopRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
});

const TitleStars = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const Title = styled(Typography)({
  fontWeight: 600,
  fontSize: 28,
  marginBottom: 0,
  lineHeight: 1.1,
  color: '#222',
});

const StarRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8,
  marginTop: 2,
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
});

const TagRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  margin: '18px 0 0 0',
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
});

const GreenLeft = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minWidth: 0,
});

const GreenLabel = styled(Typography)({
  fontWeight: 600,
  fontSize: 13,
  marginBottom: 2,
  color: '#fff',
  opacity: 0.95,
});

const ItemTypeBox = styled(Box)({
  marginBottom: 8,
  display: 'flex',
  gap: 8,
});

const MealTypeBox = styled(Box)({
  marginBottom: 0,
  display: 'flex',
  gap: 8,
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
}));

const GreenRight = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  minWidth: 0,
  marginLeft: 32,
  flex: 1,
});

const SubscriptionTitle = styled(Typography)({
  fontFamily: 'cursive',
  fontWeight: 700,
  fontSize: 28,
  marginBottom: 8,
  color: '#fff',
  letterSpacing: 1,
  textAlign: 'right',
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
});

const SubscriptionPage = () => {
  return (
    <PageContainer>
      <SubscriptionNotice>
        SUBSCRIPTION TAKEN
        <span style={{ float: 'right', color: '#C4362A', fontWeight: 400, fontSize: 15, marginRight: 50 }}>(1)</span>
      </SubscriptionNotice>
      <HorizontalLine />
      <CardContainer>
        <CatererImage src={catererImg} alt="Caterer" />
        <CardContent>
          <TopRow>
            <TitleStars>
              <Title>Glorious Caterers</Title>
              <StarRow>
                {[1,2,3,4,5].map(i => (
                  <StarIcon key={i} sx={{ color: '#FFD600', fontSize: 22, mr: 0.5 }} />
                ))}
              </StarRow>
            </TitleStars>
            <DetailsBlock>
              <span>10+ years in business &middot;</span>
              <span>Main road Side, F/1/ F3/O3 &middot; 098533 37333</span>
              <span>Open 24 hours</span>
              <span>On-site services&middot;Online appointments</span>
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
              <SmallTag active>Veg</SmallTag>
              <SmallTag>Non-Veg</SmallTag>
            </ItemTypeBox>
            <GreenLabel>MEAL TYPE :</GreenLabel>
            <MealTypeBox>
              <SmallTag active>Breakfast</SmallTag>
              <SmallTag>Lunch</SmallTag>
              <SmallTag>Dinner</SmallTag>
            </MealTypeBox>
          </GreenLeft>
          <GreenRight>
            <SubscriptionTitle>Subscription</SubscriptionTitle>
            <PriceBox>₹1500/-(15 days)</PriceBox>
          </GreenRight>
        </GreenCard>
      </CardContainer>
    </PageContainer>
  );
};

export default SubscriptionPage; 