import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Popper, 
  Grow, 
  Paper,
  Modal,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  AccountCircle, 
  Login, 
  PersonAdd, 
  Email, 
  Lock,
  Visibility,
  VisibilityOff,
  LoginOutlined,
  Close,
  Person,
  Phone,
  HowToReg,
  // AccountBalanceWallet,
  Settings,
  Logout,
  Menu as MenuIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/BoldTribe Logo-2.svg';
// import WalletModal from './WalletModal';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  position: 'fixed',
  height: '90px',
  display: 'flex',
  alignItems: 'center',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  height: '100%',
  padding: '0',
  position: 'relative',
  marginLeft: '-20px'
});

const NavbarSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  padding: '0 30px',
  borderRadius: '0 50px 50px 0',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '800px',
  height: '70px',
  marginLeft: '0',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    borderRadius: '0',
    padding: '0 20px',
    justifyContent: 'space-between'
  }
}));

const Logo = styled('img')({
  height: '150px',
  marginLeft: '-10px'
});

const NavigationLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '100px',
  marginLeft: '80px',
  marginRight: '30px',
  width: '100%',
  justifyContent: 'flex-start',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const MobileMenuButton = styled(IconButton)({
  color: '#ff0000',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 0, 0.04)',
  },
});

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    backgroundColor: '#FFFFFF',
    padding: '20px',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}));

const MobileNavList = styled(List)({
  marginTop: '20px',
});

const MobileNavItem = styled(ListItem)({
  padding: '12px 20px',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 0, 0.04)',
  },
});

const MobileNavLink = styled(RouterLink)(({ isActive }) => ({
  color: '#ff0000',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: isActive ? 700 : 500,
  letterSpacing: '1px',
  width: '100%',
  display: 'block',
  '&:hover': {
    color: '#cc0000',
  },
}));

const NavLink = styled(RouterLink)(({ isActive }) => ({
  color: '#ff0000',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: isActive ? 700 : 500,
  letterSpacing: '1px',
  '&:hover': {
    color: '#cc0000',
  },
  cursor: 'pointer',
  padding: '8px 0',
  whiteSpace: 'nowrap'
}));

const AccountSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  position: 'absolute',
  right: '-30px',
  marginLeft: '-50px'
});

const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: '50px',
  padding: '0 10px',
  height: '45px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
});

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

const AccountButton = styled(Button)(({ theme }) => ({
  color: '#000',
  backgroundColor: 'white',
  padding: '6px 12px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  justifyContent: 'flex-start',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'scale(1.02)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '20px',
    color: '#666'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 8px',
    fontSize: '13px',
    '& .MuiListItemIcon-root': {
      minWidth: '16px',
    }
  }
}));

const DropdownPaper = styled(Paper)(({ theme }) => ({
  marginTop: '10px',
  padding: '6px',
  backgroundColor: 'white',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minWidth: '160px',
  [theme.breakpoints.down('sm')]: {
    padding: '4px',
    gap: '8px',
    minWidth: '140px',
    marginTop: '5px'
  }
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  padding: '24px',
  maxHeight: '90vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '3px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    maxWidth: '320px',
    padding: '16px',
    borderRadius: '15px',
    margin: '10px',
    maxHeight: '85vh',
    '& .MuiTextField-root': {
      marginBottom: '12px',
    },
    '& .MuiButton-root': {
      padding: '8px',
      fontSize: '14px',
    }
  }
}));

const ModalOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300,
  padding: '16px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  }
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: '16px',
  top: '16px',
  color: '#666',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: '#333',
  },
});

const LoginButton = styled(Button)({
  backgroundColor: '#C4362A',
  color: 'white',
  borderRadius: '25px',
  padding: '12px',
  width: '100%',
  fontSize: '16px',
  textTransform: 'none',
  marginTop: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#b02d23',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 15px rgba(196, 54, 42, 0.2)',
  },
});

const ModalLogo = styled('img')(({ theme }) => ({
  height: '120px',
  display: 'block',
  margin: '0 auto 20px',
  [theme.breakpoints.down('sm')]: {
    height: '80px',
    marginBottom: '16px'
  }
}));

const PhoneInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
  marginBottom: '16px',
  marginTop: '16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '8px',
    '& .MuiSelect-root': {
      width: '100%',
    },
    '& .MuiTextField-root': {
      width: '100%',
    }
  }
}));

const CountryCodeSelect = styled(Select)(({ theme }) => ({
  width: '120px',
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 14px',
  },
  '& .MuiMenuItem-root': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& .MuiSelect-select': {
      padding: '10px 12px',
    }
  }
}));

const countryCodes = [
  { code: '+91', flag: '🇮🇳', country: 'India' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+61', flag: '🇦🇺', country: 'Australia' },
  { code: '+86', flag: '🇨🇳', country: 'China' },
  { code: '+81', flag: '🇯🇵', country: 'Japan' },
  { code: '+82', flag: '🇰🇷', country: 'South Korea' },
  { code: '+65', flag: '🇸🇬', country: 'Singapore' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+966', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: '+49', flag: '🇩🇪', country: 'Germany' },
  { code: '+33', flag: '🇫🇷', country: 'France' },
  { code: '+39', flag: '🇮🇹', country: 'Italy' },
  { code: '+34', flag: '🇪🇸', country: 'Spain' },
  { code: '+7', flag: '🇷🇺', country: 'Russia' },
  { code: '+55', flag: '🇧🇷', country: 'Brazil' },
  { code: '+52', flag: '🇲🇽', country: 'Mexico' },
  { code: '+27', flag: '🇿🇦', country: 'South Africa' },
  { code: '+234', flag: '🇳🇬', country: 'Nigeria' },
  { code: '+20', flag: '🇪🇬', country: 'Egypt' },
];

const RegisterButton = styled(Button)({
  backgroundColor: '#C4362A',
  color: 'white',
  borderRadius: '25px',
  padding: '12px',
  width: '100%',
  fontSize: '16px',
  textTransform: 'none',
  marginTop: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#b02d23',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 15px rgba(196, 54, 42, 0.2)',
  },
});

const LoginLink = styled(Button)({
  color: '#C4362A',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
});

const AccountMenuItem = styled(Button)(({ theme }) => ({
  color: '#000',
  backgroundColor: 'white',
  padding: '6px 12px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '92%',
  justifyContent: 'flex-start',
  marginLeft: 'auto',
  marginRight: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'scale(1.02)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '20px',
    color: '#666'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 8px',
    fontSize: '13px',
    width: '90%',
    marginRight: '6px',
    '& .MuiListItemIcon-root': {
      minWidth: '16px',
    }
  }
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  // Register form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  // const [isWalletOpen, setIsWalletOpen] = useState(false);
  const location = window.location.pathname;
  
  // Close mobile drawer when switching to desktop view
  React.useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  // Add a public function to window object to open login modal from anywhere
  React.useEffect(() => {
    // Define the function on the window object
    window.openLoginModalFromHeader = () => {
      setOpenLoginModal(true);
    };
    
    return () => {
      // Clean up
      delete window.openLoginModalFromHeader;
    };
  }, []);

  // Check for login requirement
  React.useEffect(() => {
    const checkLoginRequirement = () => {
      const requiresLogin = localStorage.getItem('requiresLogin') === 'true';
      
      if (requiresLogin && !isLoggedIn) {
        // Open login modal if login is required and user is not logged in
        setOpenLoginModal(true);
        // Clear the flag to prevent repeatedly opening the modal
        localStorage.removeItem('requiresLogin');
      }
    };
    
    // Check immediately when component mounts
    checkLoginRequirement();
    
    // Also check when storage changes
    window.addEventListener('storage', checkLoginRequirement);
    
    // Check regularly with an interval
    const loginCheckInterval = setInterval(checkLoginRequirement, 500);
    
    // Listen for custom showLoginModal event
    const handleShowLoginModal = () => {
      // Always open the login modal when this event is triggered
      // regardless of login status
      setOpenLoginModal(true);
      console.log("Login modal opening triggered by event");
    };
    
    window.addEventListener('showLoginModal', handleShowLoginModal);
    
    return () => {
      window.removeEventListener('storage', checkLoginRequirement);
      window.removeEventListener('showLoginModal', handleShowLoginModal);
      clearInterval(loginCheckInterval);
    };
  }, [isLoggedIn]);

  // Check login status on component mount
  React.useEffect(() => {
    if (!isLoggedIn && window.location.pathname === '/profile') {
      navigate('/');
      setOpenLoginModal(true);
    }
  }, [isLoggedIn, navigate]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLoginModal = () => {
    handleClose();
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  const handleOpenRegisterModal = () => {
    handleClose();
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
    setFirstName('');
    setLastName('');
    setPhone('');
    setRegisterPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', email, password);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    handleCloseLoginModal();
    
    // Check if there's a redirect URL after login
    const redirectUrl = localStorage.getItem('loginRedirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('loginRedirectUrl');
      navigate(redirectUrl);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    handleClose();
    navigate('/');
    setOpenLoginModal(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Store user data in localStorage
    const userData = {
      firstName,
      lastName,
      phone: countryCode + phone,
      gender,
      // Address will be fetched from cart later
      address: ''
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Clear any existing cart data for the new user
    localStorage.removeItem('cart');
    localStorage.removeItem('addresses');
    localStorage.removeItem('transactions');
    
    handleCloseRegisterModal();
    
    // Check if there's a redirect URL after registration
    const redirectUrl = localStorage.getItem('loginRedirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('loginRedirectUrl');
      navigate(redirectUrl);
    } else {
      navigate('/profile');
    }
  };

  // const handleWalletOpen = () => {
  //   setIsWalletOpen(true);
  // };

  // const handleWalletClose = () => {
  //   setIsWalletOpen(false);
  // };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileMenuContent = (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        px: 2
      }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* {isLoggedIn && (
            <IconWrapper onClick={handleWalletOpen}>
              <AccountBalanceWallet 
                sx={{ 
                  color: '#ff0000', 
                  fontSize: 24,
                  cursor: 'pointer'
                }}
              />
            </IconWrapper>
          )} */}
          <IconWrapper onClick={handleClick}>
            <AccountCircle 
              sx={{ 
                color: '#ff0000', 
                fontSize: 28
              }} 
            />
          </IconWrapper>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <MobileNavList>
        <MobileNavItem>
          <MobileNavLink to="/" isActive={location === '/'} onClick={handleDrawerToggle}>
            Home
          </MobileNavLink>
        </MobileNavItem>
        <MobileNavItem>
          <MobileNavLink to="/menu" isActive={location === '/menu'} onClick={handleDrawerToggle}>
            Menu
          </MobileNavLink>
        </MobileNavItem>
        <MobileNavItem>
          <MobileNavLink to="/subscription" isActive={location === '/subscription'} onClick={handleDrawerToggle}>
            Subscription
          </MobileNavLink>
        </MobileNavItem>
        <MobileNavItem>
          <MobileNavLink to="/cart" isActive={location === '/cart'} onClick={handleDrawerToggle}>
            Cart
          </MobileNavLink>
        </MobileNavItem>
      </MobileNavList>
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        mt: 2,
        borderTop: '1px solid #eee',
        pt: 2
      }}>
        <Popper 
          open={open} 
          anchorEl={anchorEl} 
          placement="bottom-start" 
          transition
          style={{ 
            width: '100%',
            zIndex: 1500 
          }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <DropdownPaper sx={{ 
                width: '100%',
                borderRadius: '0',
                boxShadow: 'none',
                borderTop: '1px solid #eee',
                backgroundColor: '#f8f8f8'
              }}>
                {!isLoggedIn ? (
                  <>
                    <AccountButton
                      startIcon={<Login />}
                      onClick={() => {
                        handleClose();
                        handleOpenLoginModal();
                        handleDrawerToggle();
                      }}
                      component="button"
                    >
                      Login
                    </AccountButton>
                    <AccountButton
                      startIcon={<PersonAdd />}
                      onClick={() => {
                        handleClose();
                        handleOpenRegisterModal();
                        handleDrawerToggle();
                      }}
                      component="button"
                      sx={{ 
                        backgroundColor: '#C4362A',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#b02d23',
                        }
                      }}
                    >
                      Register
                    </AccountButton>
                  </>
                ) : (
                  <>
                    <AccountMenuItem
                      onClick={() => {
                        handleClose();
                        handleDrawerToggle();
                        navigate('/profile');
                      }}
                    >
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </AccountMenuItem>
                    <AccountMenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </AccountMenuItem>
                    <AccountMenuItem
                      onClick={() => {
                        handleClose();
                        handleDrawerToggle();
                        handleLogout();
                      }}
                      sx={{
                        color: '#C4362A',
                        '& .MuiListItemIcon-root': {
                          color: '#C4362A'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </AccountMenuItem>
                  </>
                )}
              </DropdownPaper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );

  return (
    <>
    <StyledAppBar>
      <HeaderContainer>
        <NavbarSection>
          {isMobile && (
            <MobileMenuButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </MobileMenuButton>
          )}
          <RouterLink to="/" style={{ display: 'block', cursor: 'pointer' }}>
            <Logo src={logo} alt="BoldEats" />
          </RouterLink>
          {!isMobile && (
            <NavigationLinks>
              <NavLink to="/" isActive={location === '/'}>Home</NavLink>
              <NavLink to="/menu" isActive={location === '/menu'}>Menu</NavLink>
              {/* <NavLink to="/subscription" isActive={location === '/subscription'}>Subscription</NavLink> */}
              <NavLink to="/cart" isActive={location === '/cart'}>Cart</NavLink>
            </NavigationLinks>
          )}
        </NavbarSection>

        {!isMobile && (
          <AccountSection>
            {/* {isLoggedIn && (
              <IconContainer>
                <IconWrapper onClick={handleWalletOpen}>
                  <AccountBalanceWallet 
                    sx={{ 
                      color: '#ff0000', 
                      fontSize: 24,
                      cursor: 'pointer'
                    }}
                  />
                </IconWrapper>
              </IconContainer>
            )} */}
            <IconContainer>
              <IconWrapper>
                <AccountCircle 
                  sx={{ 
                    color: '#ff0000', 
                    fontSize: 28
                  }} 
                  onClick={handleClick}
                />
              </IconWrapper>
            </IconContainer>
            <Popper 
              open={open} 
              anchorEl={anchorEl} 
              placement="bottom-end" 
              transition
              style={{ zIndex: 1500 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <DropdownPaper>
                    {!isLoggedIn ? (
                      <>
                        <AccountButton
                          startIcon={<Login />}
                          onClick={handleOpenLoginModal}
                          component="button"
                        >
                          Login
                        </AccountButton>
                        <AccountButton
                          startIcon={<PersonAdd />}
                          onClick={handleOpenRegisterModal}
                          component="button"
                          sx={{ 
                            backgroundColor: '#C4362A',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#b02d23',
                            }
                          }}
                        >
                          Register
                        </AccountButton>
                      </>
                    ) : (
                      <>
                        <AccountMenuItem
                          onClick={() => {
                            handleClose();
                            navigate('/profile');
                          }}
                        >
                          <ListItemIcon>
                            <Person fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Profile" />
                        </AccountMenuItem>
                        <AccountMenuItem>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Settings" />
                        </AccountMenuItem>
                        <AccountMenuItem
                          onClick={handleLogout}
                          sx={{
                            color: '#C4362A',
                            '& .MuiListItemIcon-root': {
                              color: '#C4362A'
                            }
                          }}
                        >
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </AccountMenuItem>
                      </>
                    )}
                  </DropdownPaper>
                </Grow>
              )}
            </Popper>
          </AccountSection>
        )}
      </HeaderContainer>
    </StyledAppBar>

    {isMobile && (
      <MobileDrawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {mobileMenuContent}
      </MobileDrawer>
    )}

    {/* Login Modal */}
    <Modal
      open={openLoginModal}
      onClose={handleCloseLoginModal}
      aria-labelledby="login-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        [theme.breakpoints.down('sm')]: {
          padding: '8px',
        }
      }}
    >
      <ModalOverlay onClick={handleCloseLoginModal}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseLoginModal}>
            <Close />
          </CloseButton>
          <ModalLogo src={logo} alt="BoldEats" />
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoginButton
              type="submit"
              variant="contained"
              startIcon={<LoginOutlined />}
            >
              Login
            </LoginButton>
          </form>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <LoginLink 
                onClick={handleOpenRegisterModal}
                component="button"
              >
                Register
              </LoginLink>
            </Typography>
          </Box>
        </ModalContainer>
      </ModalOverlay>
    </Modal>

    {/* Register Modal */}
    <Modal
      open={openRegisterModal}
      onClose={handleCloseRegisterModal}
      aria-labelledby="register-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        [theme.breakpoints.down('sm')]: {
          padding: '8px',
        }
      }}
    >
      <ModalOverlay onClick={handleCloseRegisterModal}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseRegisterModal}>
            <Close />
          </CloseButton>
          <ModalLogo src={logo} alt="BoldEats" />
          <form onSubmit={handleRegister}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 2,
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                gap: 1
              }
            }}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <PhoneInputContainer>
              <CountryCodeSelect
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                variant="outlined"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {countryCodes.map((country) => (
                  <MenuItem 
                    key={country.code} 
                    value={country.code}
                    sx={{
                      minHeight: '40px',
                      '&:hover': {
                        backgroundColor: 'rgba(196, 54, 42, 0.04)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(196, 54, 42, 0.08)',
                        '&:hover': {
                          backgroundColor: 'rgba(196, 54, 42, 0.12)',
                        },
                      },
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{country.flag}</span>
                    <span>{country.code}</span>
                  </MenuItem>
                ))}
              </CountryCodeSelect>
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{
                  maxLength: 10,
                  pattern: '[0-9]*'
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </PhoneInputContainer>

            <TextField
              fullWidth
              select
              margin="normal"
              label="Gender"
              variant="outlined"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                [theme.breakpoints.down('sm')]: {
                  marginTop: '8px',
                  marginBottom: '12px'
                }
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                [theme.breakpoints.down('sm')]: {
                  marginTop: '8px',
                  marginBottom: '12px'
                }
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                [theme.breakpoints.down('sm')]: {
                  marginTop: '8px',
                  marginBottom: '12px'
                }
              }}
            />

            <RegisterButton
              type="submit"
              variant="contained"
              startIcon={<HowToReg />}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  marginTop: '16px',
                  padding: '8px',
                  fontSize: '14px'
                }
              }}
            >
              Register
            </RegisterButton>
          </form>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Have an account?{' '}
              <LoginLink 
                onClick={handleOpenLoginModal}
              >
                Login
              </LoginLink>
            </Typography>
          </Box>
        </ModalContainer>
      </ModalOverlay>
    </Modal>

    {/* <WalletModal 
      open={isWalletOpen} 
      onClose={handleWalletClose}
    /> */}
    </>
  );
};

export default Header; 