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
  useMediaQuery,
  useTheme
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
  AccountBalanceWallet,
  Settings,
  Logout,
  Menu
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/BoldTribe Logo-2.svg';
import WalletModal from './WalletModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
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
  [theme.breakpoints.down('md')]: {
    height: '70px',
  }
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  height: '100%',
  padding: '0',
  position: 'relative',
  marginLeft: '-20px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    padding: '0 16px',
  }
}));

const NavbarSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '60px',
  padding: '0 40px',
  borderRadius: '0 50px 50px 0',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '1134px',
  height: '84px',
  marginLeft: '0',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    padding: '0 20px',
  },
  [theme.breakpoints.down('md')]: {
    height: '70px',
    padding: '0 10px',
  }
}));

const Logo = styled('img')(({ theme }) => ({
  height: '100px',
  marginLeft: '40px',
  [theme.breakpoints.down('md')]: {
    height: '100px',
    marginLeft: '20px',
  }
}));

const NavigationLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '120px',
  marginLeft: '180px',
  marginRight: '60px',
  [theme.breakpoints.down('lg')]: {
    gap: '60px',
    marginLeft: '60px',
    marginRight: '20px',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    marginLeft: '10px',
    color: '#000000',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    }
  }
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    left: 0,
    right: 'auto',
  }
}));

const MobileNavList = styled(List)({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const MobileNavItem = styled(ListItem)({
  padding: '12px 0',
  '& .MuiListItemText-root': {
    '& .MuiTypography-root': {
      fontSize: '18px',
      fontWeight: 500,
      color: '#ff0000',
      '&:hover': {
        color: '#cc0000',
      }
    }
  }
});

const MobileIconSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '20px',
  padding: '16px 0',
  borderTop: '1px solid #eee',
});

const MobileIconItem = styled(ListItem)({
  padding: '12px 0',
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: '#ff0000',
  },
  '& .MuiListItemText-root': {
    '& .MuiTypography-root': {
      fontSize: '16px',
      fontWeight: 500,
      color: '#000',
    }
  }
});

const NavLink = styled(RouterLink)(({ isActive }) => ({
  color: '#ff0000',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: isActive ? 700 : 500,
  letterSpacing: '1.2px',
  '&:hover': {
    color: '#cc0000',
  },
  cursor: 'pointer',
  padding: '8px 0'
}));

const AccountSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  position: 'absolute',
  right: '-30px',
  [theme.breakpoints.down('md')]: {
    right: '0',
    gap: '15px',
  }
}));

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

const AccountButton = styled(Button)({
  color: '#000',
  backgroundColor: 'white',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  justifyContent: 'flex-start',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'scale(1.02)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '24px',
    color: '#666'
  }
});

const DropdownPaper = styled(Paper)({
  marginTop: '10px',
  padding: '8px',
  backgroundColor: 'white',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: '160px',
});

const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  padding: '32px'
});

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

const ModalLogo = styled('img')({
  height: '150px',
  display: 'block',
  margin: '0 auto 24px'
});

const PhoneInputContainer = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
  marginBottom: '16px',
  marginTop: '16px'
});

const CountryCodeSelect = styled(Select)({
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
  }
});

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

const AccountMenuItem = styled(Button)({
  color: '#000',
  backgroundColor: 'white',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  justifyContent: 'flex-start',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'scale(1.02)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '24px',
    color: '#666'
  }
});

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const location = window.location.pathname;
  
  // Check login status on component mount
  React.useEffect(() => {
    if (!isLoggedIn && window.location.pathname === '/profile') {
      navigate('/');
      setOpenLoginModal(true);
    }
  }, [isLoggedIn, navigate]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (isLoggedIn) {
      setIsWalletOpen(true);
    } else {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
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
    navigate('/');
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
    console.log('Register with:', {
      firstName,
      lastName,
      phone: countryCode + phone,
      password: registerPassword
    });
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    handleCloseRegisterModal();
    navigate('/');
  };

  const handleWalletOpen = () => {
    setIsWalletOpen(true);
  };

  const handleWalletClose = () => {
    setIsWalletOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

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
                onClick={handleMobileMenuToggle}
              >
                <Menu />
              </MobileMenuButton>
            )}
            <Logo src={logo} alt="BoldEats" />
            <NavigationLinks>
              <NavLink to="/" isActive={location === '/'}>Home</NavLink>
              <NavLink to="/menu" isActive={location === '/menu'}>Menu</NavLink>
              <NavLink to="/subscription" isActive={location === '/subscription'}>Subscription</NavLink>
              <NavLink to="/cart" isActive={location === '/cart'}>Cart</NavLink>
            </NavigationLinks>
          </NavbarSection>

          <AccountSection sx={{ display: { xs: 'none', md: 'flex' } }}>
            {isLoggedIn && (
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
            )}
            <IconContainer>
              <IconWrapper onClick={handleClick}>
                <AccountCircle 
                  sx={{ 
                    color: '#ff0000', 
                    fontSize: 28,
                    cursor: 'pointer'
                  }} 
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
        </HeaderContainer>
      </StyledAppBar>

      <MobileDrawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={handleMobileMenuToggle}>
            <Close />
          </IconButton>
        </Box>
        <MobileNavList>
          <MobileNavItem button onClick={() => handleMobileNavClick('/')}>
            <ListItemText primary="Home" />
          </MobileNavItem>
          <MobileNavItem button onClick={() => handleMobileNavClick('/menu')}>
            <ListItemText primary="Menu" />
          </MobileNavItem>
          <MobileNavItem button onClick={() => handleMobileNavClick('/subscription')}>
            <ListItemText primary="Subscription" />
          </MobileNavItem>
          <MobileNavItem button onClick={() => handleMobileNavClick('/cart')}>
            <ListItemText primary="Cart" />
          </MobileNavItem>
        </MobileNavList>

        <MobileIconSection>
          {isLoggedIn ? (
            <>
              <MobileIconItem button onClick={() => {
                handleMobileNavClick('/profile');
                handleMobileMenuToggle();
              }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MobileIconItem>
              <MobileIconItem button onClick={() => {
                handleWalletOpen();
                handleMobileMenuToggle();
              }}>
                <ListItemIcon>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
              </MobileIconItem>
              <MobileIconItem button onClick={() => {
                handleLogout();
                handleMobileMenuToggle();
              }}>
                <ListItemIcon>
                  <Logout sx={{ color: '#C4362A' }} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: '#C4362A' }} />
              </MobileIconItem>
            </>
          ) : (
            <>
              <MobileIconItem button onClick={() => {
                handleOpenLoginModal();
                handleMobileMenuToggle();
              }}>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </MobileIconItem>
              <MobileIconItem button onClick={() => {
                handleOpenRegisterModal();
                handleMobileMenuToggle();
              }}>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </MobileIconItem>
            </>
          )}
        </MobileIconSection>
      </MobileDrawer>

      <WalletModal 
        open={isWalletOpen} 
        onClose={handleWalletClose}
      />

      <LoginModal 
        open={openLoginModal} 
        onClose={handleCloseLoginModal}
        onLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <RegisterModal 
        open={openRegisterModal} 
        onClose={handleCloseRegisterModal}
        onRegister={handleRegister}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        phone={phone}
        setPhone={setPhone}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        registerPassword={registerPassword}
        setRegisterPassword={setRegisterPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    </>
  );
};

export default Header; 