
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from '@/pages/SplashScreen';
import OnboardingScreen from '@/pages/OnboardingScreen';
import LoginScreen from '@/pages/LoginScreen';
import SignupScreen from '@/pages/SignupScreen';
import ResetPasswordScreen from '@/pages/ResetPasswordScreen';
import OTPVerificationScreen from '@/pages/OTPVerificationScreen';
import NewPasswordScreen from '@/pages/NewPasswordScreen';
import HomeScreen from '@/pages/HomeScreen';
import PayScreen from '@/pages/PayScreen';
import ScanScreen from '@/pages/ScanScreen';
import InvestScreen from '@/pages/InvestScreen';
import InvestmentDashboard from '@/pages/invest/InvestmentDashboard';
import MutualFundListScreen from '@/pages/invest/MutualFundListScreen';
import MutualFundDetailScreen from '@/pages/invest/MutualFundDetailScreen';
import SIPSetupScreen from '@/pages/invest/SIPSetupScreen';
import PaymentMethodScreen from '@/pages/invest/PaymentMethodScreen';
import PaymentConfirmationScreen from '@/pages/invest/PaymentConfirmationScreen';
import OrderSummaryScreen from '@/pages/invest/OrderSummaryScreen';
import PortfolioScreen from '@/pages/invest/PortfolioScreen';
import SIPManagementScreen from '@/pages/invest/SIPManagementScreen';
import PartialRedemptionScreen from '@/pages/invest/PartialRedemptionScreen';
import RedemptionConfirmationScreen from '@/pages/invest/RedemptionConfirmationScreen';
import SIPCalculatorScreen from '@/pages/invest/SIPCalculatorScreen';
import TaxPlanningScreen from '@/pages/invest/TaxPlanningScreen';
import ResearchScreen from '@/pages/invest/ResearchScreen';
import FundComparisonScreen from '@/pages/invest/FundComparisonScreen';
import FundScreenerScreen from '@/pages/invest/FundScreenerScreen';
import ProfileScreen from '@/pages/ProfileScreen';
import EditProfileScreen from '@/pages/EditProfileScreen';
import KYCVerificationScreen from '@/pages/KYCVerificationScreen';
import UserDashboard from '@/pages/UserDashboard';
import NotificationsScreen from '@/pages/NotificationsScreen';
import TransactionHistoryScreen from '@/pages/TransactionHistoryScreen';
import SettingsScreen from '@/pages/SettingsScreen';
import AmountEntryScreen from '@/pages/payment/AmountEntryScreen';
import ContactSelectionScreen from '@/pages/payment/ContactSelectionScreen';
import { default as PaymentConfirmScreen } from '@/pages/payment/PaymentConfirmationScreen';
import UPIPinScreen from '@/pages/payment/UPIPinScreen';
import TransactionDetailScreen from '@/pages/payment/TransactionDetailScreen';
import NotFound from '@/pages/NotFound';
import MutualFundsScreen from './pages/invest/MutualFundsScreen';
import ExploreMutualFundsScreen from './pages/invest/ExploreMutualFundsScreen';
import MutualFundFiltersScreen from './pages/invest/MutualFundFiltersScreen';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Function to update online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Set initial online status
    setIsOnline(navigator.onLine);

    // Add event listeners for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/otp-verification" element={<OTPVerificationScreen />} />
          <Route path="/new-password" element={<NewPasswordScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/pay" element={<PayScreen />} />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/invest" element={<InvestScreen />} />
          <Route path="/invest/dashboard" element={<InvestmentDashboard />} />
          <Route path="/invest/mutual-funds" element={<MutualFundListScreen />} /> 
          <Route path="/invest/mutual-funds/explore" element={<ExploreMutualFundsScreen />} />
          <Route path="/invest/mutual-funds/filters" element={<MutualFundFiltersScreen />} />
          <Route path="/invest/mutual-fund/:id" element={<MutualFundDetailScreen />} />
          <Route path="/invest/sip-setup/:id" element={<SIPSetupScreen />} />
          <Route path="/invest/payment-method" element={<PaymentMethodScreen />} />
          <Route path="/invest/payment-confirmation" element={<PaymentConfirmationScreen />} />
          <Route path="/invest/order-summary" element={<OrderSummaryScreen />} />
          <Route path="/invest/portfolio" element={<PortfolioScreen />} />
          <Route path="/invest/sip-management" element={<SIPManagementScreen />} />
          <Route path="/invest/redemption" element={<PartialRedemptionScreen />} />
          <Route path="/invest/redemption-confirmation" element={<RedemptionConfirmationScreen />} />
          <Route path="/invest/calculator" element={<SIPCalculatorScreen />} />
          <Route path="/invest/tax-planning" element={<TaxPlanningScreen />} />
          <Route path="/invest/research" element={<ResearchScreen />} />
          <Route path="/invest/fund-comparison" element={<FundComparisonScreen />} />
          <Route path="/invest/fund-screener" element={<FundScreenerScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/profile/edit" element={<EditProfileScreen />} />
          <Route path="/profile/kyc" element={<KYCVerificationScreen />} />
          <Route path="/profile/dashboard" element={<UserDashboard />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/transaction-history" element={<TransactionHistoryScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/payment/amount" element={<AmountEntryScreen />} />
          <Route path="/payment/contact" element={<ContactSelectionScreen />} />
          <Route path="/payment/confirm" element={<PaymentConfirmScreen />} />
          <Route path="/payment/upi-pin" element={<UPIPinScreen />} />
          <Route path="/payment/transaction/:id" element={<TransactionDetailScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
