import React, { useState, useEffect, useCallback, useRef } from 'react';

// Country codes and phone patterns for international support with flag SVGs
const COUNTRIES = [
  {
    id: 'us',
    code: '+1',
    name: 'United States',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K',
    pattern: /^\d{10}$/,
    placeholder: '(555) 123-4567',
    maxLength: 14,
    digitLength: 10
  },
  {
    id: 'ca',
    code: '+1',
    name: 'Canada',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xMC41IDNMMTIgNUgxNEwxMi41IDdMMTQgOUgxMkwxMC41IDExTDkgOUg3TDguNSA3TDcgNUg5TDEwLjUgM1oiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K',
    pattern: /^\d{10}$/,
    placeholder: '(555) 123-4567',
    maxLength: 14,
    digitLength: 10
  },
  {
    id: 'gb',
    code: '+44',
    name: 'United Kingdom',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2MTVIMHoiIGZpbGw9IiMwMTIxNjkiLz4KPC9zdmc+',
    pattern: /^\d{10,11}$/,
    placeholder: '7911 123456',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'au',
    code: '+61',
    name: 'Australia',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+',
    pattern: /^\d{9}$/,
    placeholder: '412 345 678',
    maxLength: 11,
    digitLength: 9
  },
  {
    id: 'de',
    code: '+49',
    name: 'Germany',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjAwMDAiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkNFMDAiLz48L3N2Zz4K',
    pattern: /^\d{10,11}$/,
    placeholder: '30 12345678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'fr',
    code: '+33',
    name: 'France',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0VEMjkzOSIvPjwvc3ZnPgo=',
    pattern: /^\d{9}$/,
    placeholder: '6 12 34 56 78',
    maxLength: 12,
    digitLength: 9
  },
  {
    id: 'es',
    code: '+34',
    name: 'Spain',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZDNDAwIi8+PHJlY3QgeT0iMyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjkiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K',
    pattern: /^\d{9}$/,
    placeholder: '612 34 56 78',
    maxLength: 11,
    digitLength: 9
  },
  {
    id: 'it',
    code: '+39',
    name: 'Italy',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDk5NDYiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMkIzNyIvPjwvc3ZnPgo=',
    pattern: /^\d{10}$/,
    placeholder: '312 345 6789',
    maxLength: 12,
    digitLength: 10
  },
  {
    id: 'jp',
    code: '+81',
    name: 'Japan',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iNCIgZmlsbD0iI0JDMDAyRCIvPjwvc3ZnPgo=',
    pattern: /^\d{10,11}$/,
    placeholder: '90 1234 5678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'kr',
    code: '+82',
    name: 'South Korea',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwNDhCQSIvPjxwYXRoIGQ9Ik0xMC41IDQuNUMxMi40MyA0LjUgMTQgNi4wNyAxNCA3LjVTMTIuNDMgMTAuNSAxMC41IDEwLjVDOC41NyAxMC41IDcgOC45MyA3IDcuNVM4LjU3IDQuNSAxMC41IDQuNVoiIGZpbGw9IiNEQzE0M0MiLz48L3N2Zz4K',
    pattern: /^\d{10,11}$/,
    placeholder: '10 1234 5678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'cn',
    code: '+86',
    name: 'China',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjREUyOTEwIi8+PHBvbHlnb24gcG9pbnRzPSI0LDMgNS41LDUuNSAzLDUuNSA1LDcgMi41LDcgNCwzIiBmaWxsPSIjRkZERTAwIi8+PC9zdmc+',
    pattern: /^\d{11}$/,
    placeholder: '138 0013 8000',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'in',
    code: '+91',
    name: 'India',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjk5MzMiLz48cmVjdCB5PSI1IiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iIzEzOEEwOCIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjIiIHN0cm9rZT0iIzAwMDA4MCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4K',
    pattern: /^\d{10}$/,
    placeholder: '98765 43210',
    maxLength: 12,
    digitLength: 10
  },
  {
    id: 'br',
    code: '+55',
    name: 'Brazil',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+PHBhdGggZD0iTTEwLjUgMkwxOCA3LjVMMTAuNSAxM0wzIDcuNUwxMC41IDJaIiBmaWxsPSIjRkVERjAwIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwMjc3NiIvPjwvc3ZnPgo=',
    pattern: /^\d{10,11}$/,
    placeholder: '11 91234 5678',
    maxLength: 14,
    digitLength: 11
  },
  {
    id: 'mx',
    code: '+52',
    name: 'Mexico',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMTEyNiIvPjwvc3ZnPgo=',
    pattern: /^\d{10}$/,
    placeholder: '55 1234 5678',
    maxLength: 12,
    digitLength: 10
  }
];

// Robust phone formatting functions with consistent patterns
const formatPhoneNumber = (value, countryId) => {
  // Always work with digits only
  const phoneNumber = typeof value === 'string' ? value.replace(/[^\d]/g, '') : '';
  const country = COUNTRIES.find(c => c.id === countryId);
  if (!country || phoneNumber.length === 0) return phoneNumber;

  // Limit digits to country's max digit length
  const limitedNumber = phoneNumber.slice(0, country.digitLength);

  switch (countryId) {
    case 'us':
    case 'ca':
      // US/Canada format: (XXX) XXX-XXXX
      if (limitedNumber.length <= 3) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `(${limitedNumber.slice(0,3)}) ${limitedNumber.slice(3)}`;
      }
      return `(${limitedNumber.slice(0,3)}) ${limitedNumber.slice(3,6)}-${limitedNumber.slice(6)}`;

    case 'gb':
      // UK format: XXXX XXX XXXX
      if (limitedNumber.length <= 4) return limitedNumber;
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,4)} ${limitedNumber.slice(4)}`;
      }
      return `${limitedNumber.slice(0,4)} ${limitedNumber.slice(4,7)} ${limitedNumber.slice(7)}`;

    case 'jp':
    case 'kr':
      // Japan/Korea format: XX XXXX XXXX
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,6)} ${limitedNumber.slice(6)}`;

    case 'cn':
      // China format: XXX XXXX XXXX
      if (limitedNumber.length <= 3) return limitedNumber;
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3)}`;
      }
      return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3,7)} ${limitedNumber.slice(7)}`;

    case 'in':
      // India format: XXXXX XXXXX
      if (limitedNumber.length <= 5) return limitedNumber;
      return `${limitedNumber.slice(0,5)} ${limitedNumber.slice(5)}`;

    case 'br':
      // Brazil format: XX XXXXX XXXX
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,7)} ${limitedNumber.slice(7)}`;

    case 'mx':
      // Mexico format: XX XXXX XXXX
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,6)} ${limitedNumber.slice(6)}`;

    default:
      // Generic formatting for other countries - XXX XXX XXXX
      if (limitedNumber.length <= 3) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3)}`;
      }
      return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3,6)} ${limitedNumber.slice(6)}`;
  }
};

const isValidPhoneNumber = (value, countryId) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const country = COUNTRIES.find(c => c.id === countryId);
  if (!country) return phoneNumber.length >= 10 && phoneNumber.length <= 15;
  return country.pattern.test(phoneNumber);
};

// Get current country data
const getCurrentCountry = (countryId) => {
  return COUNTRIES.find(c => c.id === countryId) || COUNTRIES[0];
};

/**
 * Mobile-only homepage component built exactly from Figma Mobile Device frames
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const FigmaMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState('us');
  const [phoneInputState, setPhoneInputState] = useState('normal'); // normal, loading, valid, invalid
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationPhone, setVerificationPhone] = useState('');
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [verificationState, setVerificationState] = useState('normal'); // normal, filled, valid, invalid
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [drawerFullyClosed, setDrawerFullyClosed] = useState(false);

  // Resend countdown state
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendSubmitting, setResendSubmitting] = useState(false);

  // State preservation for drawer reopening
  const [previousDrawerState, setPreviousDrawerState] = useState({
    expanded: false,
    showDisclaimer: false,
    showVerification: false,
    verificationCode: '',
    phoneNumber: ''
  });

  // Helper function to save current drawer state
  const saveCurrentDrawerState = useCallback(() => {
    setPreviousDrawerState({
      expanded: drawerExpanded,
      showDisclaimer: showDisclaimer,
      showVerification: showVerification,
      verificationCode: verificationCode,
      phoneNumber: phoneNumber
    });
  }, [drawerExpanded, showDisclaimer, showVerification, verificationCode, phoneNumber]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Refs
  const phoneContainerRef = useRef(null);
  const flagImageRef = useRef(null);
  const resendTimerRef = useRef(null);
  const drawerRef = useRef(null);

  // Simplified phone number formatting handler without cursor management
  const handlePhoneChange = useCallback((e) => {
    const rawValue = e.target.value;
    const currentCountry = getCurrentCountry(selectedCountryId);

    // Extract only digits from the input
    const digitsOnly = rawValue.replace(/[^\d]/g, '');

    // Prevent typing beyond country's digit limit
    if (digitsOnly.length > currentCountry.digitLength) {
      return; // Don't update if trying to exceed limit
    }

    // Format the phone number
    const formattedValue = formatPhoneNumber(digitsOnly, selectedCountryId);

    // Update the state
    setPhoneNumber(formattedValue);
  }, [selectedCountryId]);

  // Simplified key handling - let browser handle backspace naturally
  const handlePhoneKeyDown = useCallback((e) => {
    // Only handle Enter key for submission
    if (e.key === 'Enter') {
      handlePhoneSubmit();
    }
    // Let browser handle backspace and other keys naturally
  }, []);

  // Country change handler with flag update
  const handleCountryChange = useCallback((e) => {
    const newCountryId = e.target.value;
    const newCountry = getCurrentCountry(newCountryId);

    setSelectedCountryId(newCountryId);

    // Update flag image
    if (flagImageRef.current && newCountry.flag) {
      flagImageRef.current.src = newCountry.flag;
      flagImageRef.current.alt = newCountry.name;
    }

    // Reformat existing phone number for new country
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
      const newFormattedValue = formatPhoneNumber(cleanNumber, newCountryId);
      setPhoneNumber(newFormattedValue);
    }

    console.log(`🌍 Country changed to: ${newCountry.code} (${newCountry.name})`);
  }, [phoneNumber]);

  // Handle phone submission with validation and verification
  const handlePhoneSubmit = useCallback(async () => {
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedPhone || phoneSubmitting) return;

    // Check if this is the test number 5555555555
    const cleanedTestNumber = trimmedPhone.replace(/\D/g, '');
    const isTestNumber = cleanedTestNumber === '5555555555';

    if (isTestNumber) {
      console.log('🧪 Test number detected - showing loading then verification UI');

      // Set loading state immediately
      setPhoneSubmitting(true);
      setPhoneInputState('loading');

      // Show loading for a moment, then transition to verification
      setTimeout(() => {
        setPhoneInputState('valid');
        setVerificationPhone(trimmedPhone);
        setPhoneSubmitting(false);

        // Small delay before showing verification UI
        setTimeout(() => {
          setShowVerification(true);
          setDrawerExpanded(true); // Ensure drawer stays expanded for verification
        }, 200);
      }, 800); // Show loading for 800ms
      return;
    }

    // Validate phone number format with selected country
    const currentCountry = getCurrentCountry(selectedCountryId);
    if (!isValidPhoneNumber(trimmedPhone, selectedCountryId)) {
      console.warn('Invalid phone number format for', currentCountry.name);

      // Show invalid state with shake animation
      setPhoneInputState('invalid');
      if (phoneContainerRef.current) {
        phoneContainerRef.current.classList.add('shake');
        setTimeout(() => {
          phoneContainerRef.current?.classList.remove('shake');
          setPhoneInputState('normal');
        }, 400);
      }
      return;
    }

    try {
      setPhoneSubmitting(true);
      setPhoneInputState('loading');

      console.log('📱 Submitting phone number:', { phone: trimmedPhone, countryCode: currentCountry.code });

      // Use the new homepage phone submission endpoint
      const response = await fetch('/api/home-settings/submit-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: trimmedPhone,
          countryCode: currentCountry.code
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Phone number submitted successfully');

        if (result.requiresVerification) {
          // Move to verification step
          console.log('🔐 Moving to verification step');
          setPhoneInputState('normal'); // Reset to normal for verification
          setVerificationPhone(trimmedPhone);

          // Smooth transition to verification UI
          setTimeout(() => {
            setShowVerification(true);
            setDrawerExpanded(true); // Ensure drawer stays expanded for verification
          }, 500);
        } else {
          // Old flow - direct success
          setPhoneSubmitted(true);
          setPhoneInputState('valid');
          setPhoneNumber('');

          // Reset success state after 3 seconds
          setTimeout(() => {
            setPhoneSubmitted(false);
            setPhoneInputState('normal');
          }, 3000);
        }
      } else {
        console.error('❌ Failed to submit phone number:', result.error || 'Unknown error');

        // Show error state with shake animation
        setPhoneInputState('invalid');
        if (phoneContainerRef.current) {
          phoneContainerRef.current.classList.add('shake');
          setTimeout(() => {
            phoneContainerRef.current?.classList.remove('shake');
            setPhoneInputState('normal');
          }, 400);
        }
      }
    } catch (error) {
      console.error('❌ Error submitting phone number:', error);

      // Show error state with shake animation
      setPhoneInputState('invalid');
      if (phoneContainerRef.current) {
        phoneContainerRef.current.classList.add('shake');
        setTimeout(() => {
          phoneContainerRef.current?.classList.remove('shake');
          setPhoneInputState('normal');
        }, 400);
      }
    } finally {
      setPhoneSubmitting(false);
    }
  }, [phoneNumber, phoneSubmitting, selectedCountryId]);

  // Verification code submission handler
  const handleVerificationSubmit = useCallback(async () => {
    const trimmedCode = verificationCode.trim();

    if (!trimmedCode || verificationSubmitting) return;

    // Check if this is the test number with test code
    const cleanedTestNumber = verificationPhone.replace(/\D/g, '');
    const isTestNumber = cleanedTestNumber === '5555555555';

    if (isTestNumber) {
      console.log('🧪 Test verification - accepting any 4-digit code');
      if (trimmedCode.length === 4) {
        setVerificationSubmitting(true);
        setPhoneInputState('loading');

        // Simulate verification delay
        setTimeout(() => {
          setVerificationState('valid');
          setPhoneSubmitted(true);
          setVerificationSubmitting(false);
        }, 1000); // 1 second verification simulation

        // First show success state, then fully close drawer
        setTimeout(() => {
          setDrawerFullyClosed(true);
          setShowVerification(false);
          setDrawerExpanded(false);
          setShowDisclaimer(false);
        }, 2000);

        // Reset to initial state after being fully closed
        setTimeout(() => {
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
          setVerificationState('normal');
          setVerificationSubmitting(false);
          setDrawerFullyClosed(false);
          // Reset resend countdown
          setResendCountdown(0);
          setCanResend(false);
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
          }
          // Reset previous drawer state
          setPreviousDrawerState({
            expanded: false,
            showDisclaimer: false,
            showVerification: false,
            verificationCode: '',
            phoneNumber: ''
          });
        }, 5000);
        return;
      }
    }

    // Validate code format (4 digits)
    if (!/^\d{4}$/.test(trimmedCode)) {
      console.warn('Invalid verification code format');

      // Show invalid state with shake animation
      setVerificationState('invalid');
      setTimeout(() => {
        setVerificationState('filled');
      }, 400);
      return;
    }

    try {
      setVerificationSubmitting(true);
      setPhoneInputState('loading');

      console.log('🔐 Submitting verification code');

      const response = await fetch('/api/home-settings/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: verificationPhone,
          code: trimmedCode
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Phone verification successful');
        setVerificationState('valid');
        setPhoneSubmitted(true);

        // First show success state, then fully close drawer
        setTimeout(() => {
          setDrawerFullyClosed(true);
          setShowVerification(false);
          setDrawerExpanded(false);
          setShowDisclaimer(false);
        }, 2000);

        // Reset to initial state after being fully closed
        setTimeout(() => {
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
          setVerificationState('normal');
          setVerificationSubmitting(false);
          setDrawerFullyClosed(false);
          // Reset resend countdown
          setResendCountdown(0);
          setCanResend(false);
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
          }
          // Reset previous drawer state
          setPreviousDrawerState({
            expanded: false,
            showDisclaimer: false,
            showVerification: false,
            verificationCode: '',
            phoneNumber: ''
          });
        }, 5000);
      } else {
        console.error('❌ Phone verification failed:', result.error || 'Unknown error');

        // Show error state with shake animation
        setVerificationState('invalid');
        setTimeout(() => {
          setVerificationState('filled');
        }, 400);
      }

    } catch (error) {
      console.error('❌ Error submitting verification code:', error);

      // Show error state with shake animation
      setVerificationState('invalid');
      setTimeout(() => {
        setVerificationState('filled');
      }, 400);
    } finally {
      setVerificationSubmitting(false);
    }
  }, [verificationCode, verificationSubmitting, verificationPhone]);

  // Start resend countdown timer
  const startResendCountdown = useCallback(() => {
    console.log('🚀 Starting countdown timer');
    setResendCountdown(60);
    setCanResend(false);

    // Clear any existing timer
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
    }

    resendTimerRef.current = setInterval(() => {
      setResendCountdown(prev => {
        console.log('⏰ Countdown tick:', prev);
        if (prev <= 1) {
          console.log('✅ Countdown finished, enabling resend');
          setCanResend(true);
          clearInterval(resendTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Handle resend verification code
  const handleResendCode = useCallback(async () => {
    if (!canResend || resendSubmitting || !verificationPhone) return;

    try {
      setResendSubmitting(true);

      console.log('🔄 Resending verification code to:', verificationPhone);

      const response = await fetch('/api/home-settings/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: verificationPhone
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Verification code resent successfully');
        // Start new countdown
        startResendCountdown();
      } else {
        console.error('❌ Failed to resend verification code:', result.error);
        // Still start countdown to prevent spam
        startResendCountdown();
      }
    } catch (error) {
      console.error('❌ Error resending verification code:', error);
      // Still start countdown to prevent spam
      startResendCountdown();
    } finally {
      setResendSubmitting(false);
    }
  }, [canResend, resendSubmitting, verificationPhone, startResendCountdown]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, []);

  // Start countdown when verification is shown
  useEffect(() => {
    console.log('🔄 Countdown useEffect triggered:', {
      showVerification,
      verificationPhone,
      resendCountdown,
      canResend
    });

    if (showVerification && verificationPhone && resendCountdown === 0 && !canResend) {
      console.log('🚀 Starting resend countdown');
      startResendCountdown();
    }
  }, [showVerification, verificationPhone, startResendCountdown]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition(path);
    } else {
      window.location.href = path;
    }
    setShowMenu(false);
  };

  // Handle phone input focus - expand drawer and show disclaimer
  const handlePhoneInputFocus = useCallback(() => {
    if (!drawerExpanded) {
      setDrawerExpanded(true);
      setShowDisclaimer(true);
    }
  }, [drawerExpanded]);

  // Handle phone input blur - collapse drawer if no content
  const handlePhoneInputBlur = useCallback(() => {
    // Only collapse if no phone number and not in verification mode
    if (!phoneNumber.trim() && !showVerification) {
      setTimeout(() => {
        setDrawerExpanded(false);
        setShowDisclaimer(false);
      }, 200); // Small delay to prevent flicker
    }
  }, [phoneNumber, showVerification]);

  // Handle clicking outside drawer to close it
  const handleOutsideClick = useCallback((e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      // Save current state before closing
      saveCurrentDrawerState();

      // Always close drawer visually
      setDrawerExpanded(false);

      // If in verification mode, keep it minimized but accessible
      if (showVerification) {
        // Don't fully close, just collapse so user can tap to reopen
        setDrawerFullyClosed(false);
      } else if (!phoneNumber.trim()) {
        // If no content, fully close
        setDrawerFullyClosed(true);
        setShowDisclaimer(false);
      } else {
        // If has phone number but not in verification, just collapse
        setDrawerFullyClosed(false);
        setShowDisclaimer(false);
      }
    }
  }, [phoneNumber, showVerification, saveCurrentDrawerState]);

  // Add click outside listener
  useEffect(() => {
    if (drawerExpanded) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [drawerExpanded, handleOutsideClick]);

  // Calculate drawer height based on content
  const getDrawerHeight = useCallback(() => {
    if (drawerFullyClosed) {
      return '50px'; // Fully closed - only handle and minimal padding visible
    } else if (showVerification && drawerExpanded) {
      return '240px'; // Verification mode expanded - tight layout without extra space
    } else if (showVerification && !drawerExpanded) {
      return '60px'; // Verification mode collapsed - show handle only, no content peek
    } else if (drawerExpanded) {
      return showDisclaimer ? '200px' : '140px'; // Phone input + disclaimer or just phone input (reduced)
    } else {
      return '140px'; // Collapsed state (peek into disclaimer with gradient) (reduced)
    }
  }, [drawerFullyClosed, showVerification, drawerExpanded, showDisclaimer]);



  // Handle drawer click to fully open when closed
  const handleDrawerClick = useCallback(() => {
    if (drawerFullyClosed) {
      // Restore previous state when reopening
      setDrawerFullyClosed(false);
      setDrawerExpanded(previousDrawerState.expanded || true);
      setShowDisclaimer(previousDrawerState.showDisclaimer);
      setShowVerification(previousDrawerState.showVerification);

      // Restore verification code if it was in progress
      if (previousDrawerState.verificationCode) {
        setVerificationCode(previousDrawerState.verificationCode);
        if (previousDrawerState.verificationCode.length === 4) {
          setVerificationState('filled');
        }
      }

      // Restore phone number if it was entered
      if (previousDrawerState.phoneNumber) {
        setPhoneNumber(previousDrawerState.phoneNumber);
      }
    } else if (!drawerExpanded) {
      // If just collapsed, expand to previous state
      setDrawerExpanded(true);
      if (previousDrawerState.showDisclaimer && !showVerification) {
        setShowDisclaimer(true);
      }
    }
  }, [drawerFullyClosed, drawerExpanded, previousDrawerState, showVerification]);

  // Button press handlers for inlaid effect
  const handleButtonMouseDown = useCallback(() => {
    setIsButtonPressed(true);
  }, []);

  const handleButtonMouseUp = useCallback(() => {
    setIsButtonPressed(false);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setIsButtonPressed(false);
  }, []);

  // Set comprehensive iOS Safari optimizations
  useEffect(() => {
    // Store original viewport
    const originalViewport = document.querySelector('meta[name="viewport"]');
    const originalContent = originalViewport ? originalViewport.getAttribute('content') : '';

    // Set mobile-optimized viewport for iOS Safari
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';

    // Add iOS-specific meta tags
    const addMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // iOS Safari specific optimizations
    addMetaTag('apple-mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    addMetaTag('apple-touch-fullscreen', 'yes');
    addMetaTag('mobile-web-app-capable', 'yes');
    addMetaTag('format-detection', 'telephone=no');

    // Prevent iOS Safari from adjusting font sizes
    document.documentElement.style.webkitTextSizeAdjust = '100%';
    document.documentElement.style.textSizeAdjust = '100%';

    // Fix iOS Safari height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Cleanup on unmount
    return () => {
      if (originalViewport && originalContent) {
        originalViewport.setAttribute('content', originalContent);
      }
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          /* Comprehensive Safari iOS WebKit Optimizations */

          /* Prevent iOS Safari zoom on input focus */
          input[type="tel"], input[type="text"], select {
            font-size: 16px !important;
            transform-origin: left top;
            font-family: 'Inter', sans-serif;
            -webkit-appearance: none;
            -webkit-border-radius: 0;
            border-radius: 0;
          }

          /* Prevent zoom and ensure proper viewport */
          * {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Safari iOS specific fixes */
          body {
            -webkit-overflow-scrolling: touch;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Prevent iOS Safari bounce scroll */
          html, body {
            position: fixed;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }

          /* Fix iOS Safari viewport issues */
          .mobile-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            height: -webkit-fill-available;
            overflow: hidden;
          }

          /* Optimize touch interactions for iOS */
          .mobile-drawer, .mobile-menu-button, button, input {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Enable hardware acceleration */
          .mobile-drawer, .mobile-nav-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          .mobile-phone-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .mobile-phone-input:focus {
            outline: none;
            font-size: 16px !important;
          }
          .mobile-nav-item:hover {
            opacity: 0.8;
            transform: translateX(10px) !important;
            transition: all 0.15s ease-out;
          }

          .mobile-nav-item {
            transition: all 0.15s ease-out;
          }
          .mobile-menu-button:hover {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
            transition: all 0.2s ease;
          }

          /* Menu button animation states */
          .mobile-menu-button {
            transition: transform 0.2s ease;
          }

          /* Navigation overlay animations */
          .mobile-nav-overlay {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-nav-overlay.entering {
            opacity: 0;
            visibility: hidden;
            backdrop-filter: blur(0px);
          }

          .mobile-nav-overlay.entered {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
          }
          .mobile-send-button:hover:not(:disabled) {
            transform: scale(1.05);
            transition: transform 0.2s ease;
          }
          .mobile-send-button:active:not(:disabled) {
            transform: scale(0.95);
          }

          /* Shake animation for validation errors */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }

          /* Mobile country selector styling */
          .mobile-country-select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #FFFFFF;
            border-radius: 8px;
            padding: 4px 8px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            outline: none;
          }
          .mobile-country-select option {
            background: #000000;
            color: #FFFFFF;
          }

          /* Mobile verification input styling */
          .mobile-verification-input {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: #FFFFFF;
            font-family: 'Inter', sans-serif;
            font-size: 16px; /* Minimum 16px to prevent iOS zoom */
            font-weight: 600;
            text-align: center;
            outline: none;
          }
          .mobile-verification-input:focus {
            border-color: #00FF40;
            box-shadow: 0 0 0 2px rgba(0, 255, 64, 0.2);
          }

          /* Spinner animation for mobile SEND button */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }

          @-moz-keyframes spin {
            0% { -moz-transform: rotate(0deg); }
            100% { -moz-transform: rotate(360deg); }
          }

          /* Drawer animations */
          .mobile-drawer {
            position: fixed;
            bottom: 0;
            left: 20px;
            right: 20px;
            margin: 0 auto;
            width: calc(100% - 40px);
            max-width: 390px;
            background: rgba(35, 35, 35, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 24px 24px 0px 0px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: bottom;
            z-index: 100;
          }

          .mobile-drawer.collapsed {
            transform: translateY(0);
          }

          .mobile-drawer.expanded {
            transform: translateY(0);
          }

          /* Disclaimer peek effect */
          .disclaimer-peek {
            position: relative;
            overflow: hidden;
          }

          .disclaimer-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 12px;
            background: linear-gradient(to bottom, transparent 0%, rgba(35, 35, 35, 0.95) 100%);
            pointer-events: none;
            transition: opacity 0.4s ease;
          }

          /* Content fade animations */
          .drawer-content {
            transition: all 0.3s ease;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }
        `}
      </style>

      <div
        className="mobile-container"
        style={{
          background: '#000000',
          fontFamily: 'Inter, sans-serif'
        }}
      >
      {/* Main Mobile Device Frame - 430x932 */}
      <div
        style={{
          width: '430px',
          height: '932px',
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: '0 auto',
          position: 'relative',
          background: '#000000'
        }}
      >
        {/* Navigation Bar - Mobile Component */}
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '430px',
            height: '97px',
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px',
            boxSizing: 'border-box'
          }}
        >
          {/* Menu Button - Right Side */}
          <div
            onClick={toggleMenu}
            className="mobile-menu-button"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {/* Animated Menu Lines */}
            <div
              style={{
                width: '24px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '1px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: showMenu ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)',
                transformOrigin: 'center'
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '1px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: showMenu ? 0 : 1,
                transform: showMenu ? 'scale(0)' : 'scale(1)'
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '1px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: showMenu ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
                transformOrigin: 'center'
              }}
            />
          </div>

          {/* B2B Logo - Centered - Clickable with Animation */}
          <img
            onClick={() => handleNavigation('/')}
            src="/images/mobile-figma/b2b-logo-mobile.svg"
            alt="B2B Logo"
            style={{
              width: '138.41px',
              height: '43px',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              userSelect: 'none'
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
          />
        </div>

        {/* Main Content Area - Between Navigation and Drawer */}
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '97px',
            width: '430px',
            height: '722px', // 819 - 97 = 722px
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          {/* Placeholder for main content - can be customized later */}
          <div
            style={{
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontWeight: '300',
              fontSize: '16px',
              textAlign: 'center',
              opacity: 0.7
            }}
          >
            Mobile Homepage Content
            <br />
            <span style={{ fontSize: '12px', opacity: 0.5 }}>
              Main content area ready for customization
            </span>
          </div>
        </div>

        {/* Text Us Drawer - Bottom with Dynamic Height */}
        <div
          ref={drawerRef}
          onClick={(e) => {
            e.stopPropagation(); // Prevent background click when clicking drawer
            handleDrawerClick(); // Handle drawer click to open when closed
          }}
          className={`mobile-drawer ${drawerExpanded ? 'expanded' : 'collapsed'}`}
          style={{
            height: getDrawerHeight(),
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 20px 16px 20px', // Adjusted for narrower drawer width
            boxSizing: 'border-box',
            overflow: 'hidden',
            cursor: drawerFullyClosed ? 'pointer' : 'default'
          }}
        >
          {/* Drawer Card Gradient Overlay - Creates hiding effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom,
                transparent 0%,
                transparent 30%,
                rgba(0, 0, 0, 0.3) 70%,
                rgba(0, 0, 0, 0.6) 100%)`,
              pointerEvents: 'none',
              zIndex: 1,
              opacity: drawerExpanded ? 0 : 1,
              transition: 'opacity 0.4s ease'
            }}
          />
          {/* Drawer Handle */}
          <div
            style={{
              alignSelf: 'center',
              width: '60px',
              height: '4px',
              background: '#D9D9D9',
              borderRadius: '100px',
              marginBottom: '8px',
              opacity: 0.8,
              marginTop: '6px',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2
            }}
          />

          {/* Verification Collapsed Indicator */}
          {showVerification && !drawerExpanded && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '8px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
                opacity: 0.8
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Verification Code
              </div>
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: '400',
                  textAlign: 'center',
                  opacity: 0.7
                }}
              >
                Tap to continue
              </div>
            </div>
          )}

          {/* Text Us Group - Hidden during verification */}
          {!drawerFullyClosed && !showVerification && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                marginBottom: '12px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 2
              }}
            >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '20px',
                lineHeight: '1.2em',
                color: '#FFFFFF'
              }}
            >
              Text us
            </div>
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: '300',
                fontSize: '12px',
                lineHeight: '1.3em',
                color: '#FFFFFF',
                opacity: 0.8
              }}
            >
              Exclusive events, contests, and more
            </div>
          </div>
          )}

          {/* Phone Number Form */}
          {!drawerFullyClosed && (
            <div
              className={`drawer-content ${showVerification ? 'verification-mode' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                position: 'relative',
                zIndex: 2
              }}
            >
            {showVerification ? (
              /* Verification Code UI */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px', // Tighter gap for compact layout
                  width: '100%',
                  padding: '8px 16px 8px 16px', // Minimal padding for tight layout
                  justifyContent: 'flex-start',
                  boxSizing: 'border-box'
                }}
              >
                {/* Text container with tighter spacing */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px', // Tight spacing between text lines
                    marginBottom: '8px'
                  }}
                >
                  <div
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Inter',
                      fontSize: '16px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}
                  >
                    Enter Verification Code
                  </div>
                  <div
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: '400',
                      textAlign: 'center',
                      opacity: 0.9
                    }}
                  >
                    Code sent to {verificationPhone}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px', // Slightly increased for better touch targets
                    justifyContent: 'center'
                  }}
                >
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      value={verificationCode[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
                        const newCode = verificationCode.split('');
                        newCode[index] = value;
                        const updatedCode = newCode.join('');
                        setVerificationCode(updatedCode);

                        // Update verification state based on code length
                        if (updatedCode.length === 4) {
                          setVerificationState('filled');
                        } else {
                          setVerificationState('normal');
                        }

                        // Auto-focus next input if value entered
                        if (value && index < 3) {
                          // Use requestAnimationFrame for better timing
                          requestAnimationFrame(() => {
                            const nextInput = e.target.parentElement.children[index + 1];
                            if (nextInput) {
                              nextInput.focus();
                              nextInput.select();
                            }
                          });
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace to go to previous input
                        if (e.key === 'Backspace') {
                          if (!verificationCode[index] && index > 0) {
                            // Use requestAnimationFrame for better timing
                            requestAnimationFrame(() => {
                              const prevInput = e.target.parentElement.children[index - 1];
                              if (prevInput) {
                                prevInput.focus();
                                prevInput.select();
                              }
                            });
                          }
                        }
                        // Handle Enter to submit when all 4 digits entered
                        if (e.key === 'Enter' && verificationCode.length === 4) {
                          handleVerificationSubmit();
                        }
                      }}
                      onFocus={(e) => {
                        e.target.select(); // Select all text when focused
                      }}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        border: `2px solid ${
                          verificationState === 'valid' ? '#10B981' :
                          verificationState === 'invalid' ? '#EF4444' :
                          verificationState === 'filled' ? '#3B82F6' :
                          verificationCode[index] ? 'rgba(255, 255, 255, 0.4)' :
                          'rgba(255, 255, 255, 0.15)'
                        }`,
                        background: verificationCode[index] ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        color: '#FFF',
                        fontFamily: 'Inter',
                        fontSize: '16px', // Minimum 16px to prevent iOS zoom
                        fontWeight: '600',
                        textAlign: 'center',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxShadow: verificationCode[index] ? '0 0 0 1px rgba(255, 255, 255, 0.1)' : 'none'
                      }}
                    />
                  ))}
                </div>

                <div
                  onClick={handleVerificationSubmit}
                  style={{
                    display: 'flex',
                    width: '120px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '18px',
                    background: phoneSubmitted ? 'rgba(16, 185, 129, 0.15)' :
                               verificationSubmitting ? 'rgba(255, 255, 255, 0.08)' :
                               'rgba(255, 255, 255, 0.06)',
                    border: `1px solid ${
                      phoneSubmitted ? 'rgba(16, 185, 129, 0.3)' :
                      verificationSubmitting ? 'rgba(255, 255, 255, 0.15)' :
                      'rgba(255, 255, 255, 0.12)'
                    }`,
                    cursor: verificationSubmitting || verificationCode.length !== 4 ? 'not-allowed' : 'pointer',
                    opacity: verificationSubmitting || verificationCode.length !== 4 ? 0.4 : 1,
                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    backdropFilter: 'blur(8px)',
                    transform: 'scale(1)',
                    marginBottom: '0px' // Remove bottom margin for tighter spacing
                  }}
                  onTouchStart={(e) => {
                    if (!verificationSubmitting && verificationCode.length === 4) {
                      e.target.style.transform = 'scale(0.95)';
                    }
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                  onMouseDown={(e) => {
                    if (!verificationSubmitting && verificationCode.length === 4) {
                      e.target.style.transform = 'scale(0.95)';
                    }
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <span
                    style={{
                      color: phoneSubmitted ? '#10B981' : '#FFF',
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      fontWeight: '600',
                      lineHeight: '1',
                      transition: 'color 0.15s ease'
                    }}
                  >
                    {verificationSubmitting ? (
                      /* Spinning wheel animation like SEND button */
                      <div
                        className="mobile-button-spinner"
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '3px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '3px solid #FFFFFF',
                          borderRight: '3px solid #FFFFFF',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite',
                          WebkitAnimation: 'spin 0.6s linear infinite',
                          MozAnimation: 'spin 0.6s linear infinite',
                          display: 'inline-block',
                          boxSizing: 'border-box',
                          backgroundColor: 'transparent'
                        }}
                      />
                    ) : (
                      phoneSubmitted ? '✓ Verified' : 'VERIFY'
                    )}
                  </span>
                </div>

                {/* Resend Code Countdown */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4px',
                    marginBottom: '0px',
                    minHeight: '16px', // Minimal space reserved
                    width: '100%',
                    position: 'relative',
                    zIndex: 10 // Ensure it's above other elements
                  }}
                >
                  {resendCountdown > 0 ? (
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: '400',
                        textAlign: 'center'
                      }}
                    >
                      Resend code in {resendCountdown}s
                    </div>
                  ) : canResend ? (
                    <div
                      onClick={handleResendCode}
                      style={{
                        color: resendSubmitting ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: '400',
                        textAlign: 'center',
                        cursor: resendSubmitting ? 'not-allowed' : 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        opacity: resendSubmitting ? 0.6 : 1
                      }}
                      onMouseDown={(e) => {
                        if (!resendSubmitting) {
                          e.target.style.transform = 'scale(0.95)';
                        }
                      }}
                      onMouseUp={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {resendSubmitting ? 'Sending...' : 'Resend code'}
                    </div>
                  ) : (
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: '400',
                        textAlign: 'center'
                      }}
                    >
                      {/* Debug: countdown={resendCountdown}, canResend={canResend ? 'true' : 'false'} */}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Phone Input UI - Desktop Layout Adapted for Mobile */
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: showVerification ? 0 : 1,
                  transform: showVerification ? 'scale(0.95)' : 'scale(1)',
                  transition: 'opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'opacity, transform',
                  zIndex: 1
                }}
              >
                {/* Phone number Field - Exact Desktop Structure */}
                <div
                  ref={phoneContainerRef}
                  className={phoneInputState === 'invalid' ? 'shake' : ''}
                  style={{
                    display: 'flex',
                    flex: 1,
                    height: '44px',
                    alignItems: 'center',
                    borderRadius: '22px',
                    background: '#303030', // Match desktop background color
                    overflow: 'hidden',
                    position: 'relative', // For absolute positioned button
                    border: `1px solid ${
                      phoneInputState === 'loading' ? '#3B82F6' :
                      phoneInputState === 'valid' ? '#10B981' :
                      phoneInputState === 'invalid' ? '#EF4444' :
                      'transparent'
                    }`,
                    boxShadow:
                      phoneInputState === 'loading' ? '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.1)' :
                      phoneInputState === 'valid' ? '0 0 0 1px #10B981, 0 0 0 3px rgba(16, 185, 129, 0.1)' :
                      phoneInputState === 'invalid' ? '0 0 0 1px #EF4444, 0 0 0 3px rgba(239, 68, 68, 0.1)' :
                      'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Country Code Dropdown Section - Exact Desktop Structure */}
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      width: '65px', // Reduced from 75px to give phone field more space
                      height: '100%',
                      flexShrink: 0,
                      backgroundColor: '#303030',
                      borderRadius: '22px 0 0 22px'
                    }}
                  >
                    {/* Flag and Country Code Display */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        pointerEvents: 'none',
                        zIndex: 2
                      }}
                    >
                      <img
                        ref={flagImageRef}
                        alt={getCurrentCountry(selectedCountryId).name}
                        src={getCurrentCountry(selectedCountryId).flag}
                        style={{
                          width: '20px', // Scaled up from 18px to match desktop
                          height: '15px', // Scaled up from 14px to match desktop
                          borderRadius: '2px' // Increased from 1px proportionally
                        }}
                      />
                      <span
                        style={{
                          color: '#FFF',
                          fontFamily: 'Inter',
                          fontSize: '13px', // Increased from 12px for better proportion
                          fontWeight: '500',
                          lineHeight: '1',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {getCurrentCountry(selectedCountryId).code}
                      </span>
                    </div>

                    {/* Native Select - Invisible Overlay */}
                    <select
                      value={selectedCountryId}
                      onChange={handleCountryChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'transparent',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        fontSize: '14px',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        zIndex: 3
                      }}
                      aria-label="Select country code"
                    >
                      {COUNTRIES.map((country) => (
                        <option
                          key={country.id}
                          value={country.id}
                          data-country={country.id.toUpperCase()}
                          data-name={country.name}
                          style={{
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '400'
                          }}
                        >
                          {country.id.toUpperCase()} {country.code} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number Input Field */}
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneInputFocus}
                    onBlur={handlePhoneInputBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handlePhoneSubmit();
                      } else {
                        handlePhoneKeyDown(e);
                      }
                    }}
                    placeholder={getCurrentCountry(selectedCountryId).placeholder}
                    disabled={phoneSubmitting}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: '16px', // Minimum 16px to prevent iOS zoom
                      fontWeight: '500',
                      lineHeight: 'normal',
                      minHeight: '44px',
                      paddingLeft: '0px', // No padding - let phone field get close to country code
                      paddingRight: '65px' // Make room for inlaid button
                    }}
                  />
                </div>

                {/* SEND Button - Inlaid Desktop Style */}
                <div
                  onClick={handlePhoneSubmit}
                  onMouseDown={handleButtonMouseDown}
                  onMouseUp={handleButtonMouseUp}
                  onMouseLeave={handleButtonMouseLeave}
                  onTouchStart={handleButtonMouseDown}
                  onTouchEnd={handleButtonMouseUp}
                  className="mobile-send-button"
                  style={{
                    display: 'flex',
                    width: '55px',
                    height: '36px', // Increased from 30px to 36px for better proportion
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px 10px', // Increased padding proportionally
                    borderRadius: '18px', // Increased border radius proportionally
                    background: phoneSubmitted ? '#00AA00' : (phoneSubmitting ? '#888888' : '#00FF40'),
                    cursor: phoneSubmitting || !phoneNumber.trim() ? 'not-allowed' : 'pointer',
                    opacity: phoneSubmitting || !phoneNumber.trim() ? 0.7 : 1,
                    boxSizing: 'border-box',
                    transform: isButtonPressed && !phoneSubmitting ? 'scale(0.96)' : 'scale(1)',
                    transition: 'all 0.1s ease',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'absolute',
                    right: '4px', // Adjusted for better fit with larger button
                    top: '50%',
                    marginTop: '-18px' // Half of new button height for perfect centering
                  }}
                >
                  {phoneSubmitting ? (
                    /* Spinning wheel animation like desktop */
                    <div
                      className="mobile-button-spinner"
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '3px solid #000000',
                        borderTop: '3px solid #FFFFFF',
                        borderRight: '3px solid #FFFFFF',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                        WebkitAnimation: 'spin 0.6s linear infinite',
                        MozAnimation: 'spin 0.6s linear infinite',
                        display: 'inline-block',
                        boxSizing: 'border-box',
                        backgroundColor: 'transparent'
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: '#232323',
                        fontFamily: 'Inter',
                        fontSize: '12px', // Increased from 11px to 12px for better proportion
                        fontWeight: '700',
                        lineHeight: '1',
                        textAlign: 'center'
                      }}
                    >
                      {phoneSubmitted ? '✓' : 'SEND'}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer Text - Hidden during verification */}
            {!showVerification && (
              <div
                style={{
                  position: 'relative',
                  marginTop: '8px', // Reduced from 12px to 8px
                  width: '100%',
                  zIndex: 0 // Behind the card gradient overlay
                }}
              >
              <div
                style={{
                  fontSize: '9px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'justify',
                  lineHeight: '1.4em',
                  padding: '0 4px',
                  width: '100%',
                  textJustify: 'inter-word',
                  overflow: 'hidden',
                  maxHeight: showDisclaimer ? '120px' : '32px', // Show more lines when collapsed for better peek
                  transition: 'max-height 0.4s ease'
                }}
              >
                By submitting my information, I agree to receive recurring automated messages to the contact information provided and to Bounce2Bounce's Terms of Service, Cookie Policy and Privacy Policy. Msg & Data Rates may apply. Reply STOP to cancel, HELP for help.
              </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          opacity: showMenu ? 1 : 0,
          visibility: showMenu ? 'visible' : 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: showMenu ? 'blur(10px)' : 'blur(0px)'
        }}
      >
          {/* Navigation Bar in Menu */}
          <div
            style={{
              width: '430px',
              height: '97px',
              maxWidth: '100vw',
              margin: '0 auto',
              position: 'relative',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}
          >
            {/* Close Menu Button (Animated X) - Right Side */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* Same animated lines as main nav */}
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(45deg) translateY(6px)',
                  transformOrigin: 'center'
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0,
                  transform: 'scale(0)'
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(-45deg) translateY(-6px)',
                  transformOrigin: 'center'
                }}
              />
            </div>

            {/* B2B Logo - Centered - Clickable */}
            <img
              onClick={() => handleNavigation('/')}
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none'
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
            />
          </div>

          {/* Navigation Body */}
          <div
            style={{
              width: '430px',
              maxWidth: '100vw',
              margin: '0 auto',
              padding: '40px 25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transform: showMenu ? 'translateY(0)' : 'translateY(-20px)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.2s' : '0s'
            }}
          >
            <div
              onClick={() => handleNavigation('/')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.3s' : '0s'
              }}
            >
              Events
            </div>
            <div
              onClick={() => handleNavigation('/about')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.4s' : '0s'
              }}
            >
              About
            </div>
            <div
              onClick={() => handleNavigation('/contact')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.5s' : '0s'
              }}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FigmaMobile;
