import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery, Modal, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, WhatsApp, Instagram, LinkedIn, Close } from '@mui/icons-material';
import footerImage from '../assets/images/footerImage.png';
import logo from '../assets/images/BoldTribe Logo-2.svg';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#000',
  color: 'white',
  padding: theme.spacing(8, 0, 5),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0, 4),
  }
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1251px !important',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
  }
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  color: '#ff0000',
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '24px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    marginBottom: theme.spacing(1.5),
  }
}));

const SocialLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  '&:hover': {
    color: '#ff0000',
  },
}));

const PolicyLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: '#ff0000',
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(4),
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    padding: theme.spacing(2),
  }
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: '1px solid #eee',
}));

const ModalLogo = styled('img')({
  height: '60px',
  width: 'auto',
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const policyContents = {
    terms: `Terms & Conditions for BoldEats

Welcome to BoldEats! By using our services, you agree to the following terms and conditions. Please read them carefully before using our platform.

1. Introduction

These Terms & Conditions govern your use of BoldEats, including our website, mobile application, and services. By accessing our platform, you agree to comply with these terms.

2. Services Offered

BoldEats specializes in corporate food delivery services, ensuring timely and quality meal delivery for offices and business spaces.

3. User Responsibilities

Users must provide accurate information when placing an order.

Unauthorized use of our platform is strictly prohibited.

Users must comply with all applicable laws and regulations in Odisha.

4. Payment & Pricing

All prices are subject to change without prior notice.

Payment must be made through authorized payment methods.

In case of non-payment or fraudulent transactions, services may be suspended.

5. Order Acceptance & Cancellation

Orders are subject to acceptance and availability.

We reserve the right to cancel any order due to unforeseen circumstances.

6. Liability & Disclaimers

We are not liable for any direct or indirect damages arising from the use of our services.

BoldEats is not responsible for third-party service failures.

7. Governing Law

These Terms & Conditions are governed by the laws of Odisha, India. Any disputes shall be subject to the jurisdiction of the courts in Bhubaneswar`,
    
    privacy: `Privacy Policy for BoldEats

We value your privacy and ensure the protection of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.

1. Data Collection

We collect personal details such as name, contact details, payment information, and order history when you use our services.

2. Data Usage

Your data is used for processing orders, improving services, and marketing purposes (with consent).

3. Data Protection

We implement security measures to prevent unauthorized access to your information.

4. Third-Party Sharing

We do not sell or share your data with third parties, except for service fulfillment.

5. Cookies Policy

Our website uses cookies to enhance user experience. You can disable cookies in your browser settings.

6. Policy Updates

We may update this policy periodically. Changes will be communicated through our website.`,
    
    refund: `Refund Policy for BoldEats

1. Eligibility

Refunds are applicable only for orders that meet the following criteria:

Incorrect or damaged food delivered.

Orders not delivered within the committed time frame.

2. Refund Process

Users must request a refund within 24 hours of receiving the order.

Refunds will be processed within 5-7 business days.

3. Exclusions

No refunds for food items that have been consumed or partially consumed unless there is a quality issue.`,
    
    cancellation: `Cancellation Policy for BoldEats

1. Order Cancellation

Orders can be canceled within 30 minutes of placement.

Once food preparation has begun, cancellations may not be possible.

2. Refund on Cancellation

Refunds for cancellations depend on the status of order processing and preparation.`,
    
    about: `About BoldEats

BoldEats is a corporate food delivery service under BoldTribe Innovations Pvt. Ltd. Our mission is to provide high-quality, hygienic, and timely meal deliveries to corporate clients in Bhubaneswar, ensuring convenience and satisfaction.

Contact BoldEats

For any queries, reach out to us at:

Email: support@boldtribe.in

Phone: +91 76848 36139

Address: DCB 630, DLF CyberCity, Bhubaneswar, Odisha, India-751024`
  };

  return (
    <>
      <StyledFooter>
        <ContentContainer>
          <Grid container spacing={{ xs: 4, sm: 6, md: 8 }}>
            {/* First Section */}
            <Grid item xs={12} md={3}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  mb: 3,
                  fontSize: { xs: '24px', sm: '28px', md: '32px' },
                  lineHeight: 1.2
                }}
              >
                We cook only <span style={{ color: '#ff0000' }}>the most</span>
                <br />
                <span style={{ color: '#ff0000' }}>delicious</span> meals
              </Typography>
              <Box sx={{ mt: 3 }}>
                <img
                  src={footerImage}
                  alt="Delicious Food"
                  style={{ 
                    width: '100%', 
                    maxWidth: isMobile ? '240px' : '280px', 
                    height: 'auto', 
                    borderRadius: '8px' 
                  }}
                />
              </Box>
            </Grid>

            {/* Second Section - Address */}
            <Grid item xs={12} sm={6} md={3}>
              <FooterHeading>Address</FooterHeading>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                  mb: 1, 
                  color: '#fff' 
                }}
              >
                DCB-630, DLF CyberCity,
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                  mb: 1, 
                  color: '#fff' 
                }}
              >
                IDCO InfoPark,
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                  color: '#fff' 
                }}
              >
                Bhubaneswar, 751024
              </Typography>

              {/* Policy Links */}
              <Box sx={{ mt: 3 }}>
                <PolicyLink 
                  component="button" 
                  onClick={() => handleOpenModal(policyContents.terms)}
                >
                  Terms & Conditions
                </PolicyLink>
                <PolicyLink 
                  component="button" 
                  onClick={() => handleOpenModal(policyContents.privacy)}
                >
                  Privacy Policy
                </PolicyLink>
                <PolicyLink 
                  component="button" 
                  onClick={() => handleOpenModal(policyContents.refund)}
                >
                  Refund Policy
                </PolicyLink>
                <PolicyLink 
                  component="button" 
                  onClick={() => handleOpenModal(policyContents.cancellation)}
                >
                  Cancellation Policy
                </PolicyLink>
                <PolicyLink 
                  component="button" 
                  onClick={() => handleOpenModal(policyContents.about)}
                >
                  About BoldEats
                </PolicyLink>
              </Box>
            </Grid>

            {/* Third Section - Say Hello */}
            <Grid item xs={12} sm={6} md={3}>
              <FooterHeading>Say Hello</FooterHeading>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                  mb: 1, 
                  color: '#fff' 
                }}
              >
                support@boldtribe.in
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '14px', sm: '15px', md: '16px' }, 
                  mb: 3, 
                  color: '#fff' 
                }}
              >
                +91 76848 36139
              </Typography>
            </Grid>

            {/* Fourth Section - Social */}
            <Grid item xs={12} sm={6} md={3}>
              <FooterHeading>Social</FooterHeading>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: { xs: 1, sm: 1.5, md: 2 } 
              }}>
                <SocialLink href="#">
                  <Facebook sx={{ fontSize: { xs: 18, sm: 20 } }} /> Facebook
                </SocialLink>
                <SocialLink href="https://wa.me/+917684836139" target="_blank" rel="noopener noreferrer">
                  <WhatsApp sx={{ fontSize: { xs: 18, sm: 20 } }} /> WhatsApp
                </SocialLink>
                <SocialLink href="https://www.instagram.com/boldeats.india?igsh=cjhobjAxeDBkdGx5" target="_blank" rel="noopener noreferrer">
                  <Instagram sx={{ fontSize: { xs: 18, sm: 20 } }} /> Instagram
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/company/boldeats-india/" target="_blank" rel="noopener noreferrer">
                  <LinkedIn sx={{ fontSize: { xs: 18, sm: 20 } }} /> LinkedIn
                </SocialLink>
              </Box>
            </Grid>
          </Grid>
        </ContentContainer>
      </StyledFooter>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="policy-modal"
      >
        <ModalContent>
          <ModalHeader>
            <ModalLogo src={logo} alt="BoldEats Logo" />
            <CloseButton onClick={handleCloseModal}>
              <Close />
            </CloseButton>
          </ModalHeader>
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-line',
              fontSize: { xs: '14px', sm: '16px' },
              lineHeight: 1.6
            }}
          >
            {modalContent}
          </Typography>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer; 