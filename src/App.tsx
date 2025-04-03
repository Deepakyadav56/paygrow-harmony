
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import NewPasswordScreen from './pages/NewPasswordScreen';
import OTPVerificationScreen from './pages/OTPVerificationScreen';
import HomeScreen from './pages/HomeScreen';
import PayScreen from './pages/PayScreen';
import ScanScreen from './pages/ScanScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';
import NotificationsScreen from './pages/NotificationsScreen';
import TransactionHistoryScreen from './pages/TransactionHistoryScreen';
import AmountEntryScreen from './pages/payment/AmountEntryScreen';
import ContactSelectionScreen from './pages/payment/ContactSelectionScreen';
import PaymentConfirmationScreen from './pages/payment/PaymentConfirmationScreen';
import TransactionDetailScreen from './pages/payment/TransactionDetailScreen';
import UPIPinScreen from './pages/payment/UPIPinScreen';
import InvestScreen from './pages/InvestScreen';
import MutualFundListScreen from './pages/invest/MutualFundListScreen';
import FundScreenerScreen from './pages/invest/FundScreenerScreen';
import MutualFundDetailScreen from './pages/invest/MutualFundDetailScreen';
import FundComparisonScreen from './pages/invest/FundComparisonScreen';
import PortfolioScreen from './pages/invest/PortfolioScreen';
import InvestmentDashboard from './pages/invest/InvestmentDashboard';
import ResearchScreen from './pages/invest/ResearchScreen';
import TaxPlanningScreen from './pages/invest/TaxPlanningScreen';
import OrderSummaryScreen from './pages/invest/OrderSummaryScreen';
import PaymentMethodScreen from './pages/invest/PaymentMethodScreen';
import SIPSetupScreen from './pages/invest/SIPSetupScreen';
import SIPManagementScreen from './pages/invest/SIPManagementScreen';
import PartialRedemptionScreen from './pages/invest/PartialRedemptionScreen';
import RedemptionConfirmationScreen from './pages/invest/RedemptionConfirmationScreen';
import EditProfileScreen from './pages/profile/EditProfileScreen';
import UserDashboard from './pages/profile/UserDashboard';
import KYCVerificationScreen from './pages/profile/KYCVerificationScreen';
import SIPCalculatorScreen from './pages/SIPCalculatorScreen';
import NotFound from './pages/NotFound';
import MutualFundsExploreScreen from './pages/invest/MutualFundsExploreScreen';
import ExploreFundsScreen from './pages/invest/ExploreFundsScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/new-password" element={<NewPasswordScreen />} />
        <Route path="/otp-verification" element={<OTPVerificationScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/pay" element={<PayScreen />} />
        <Route path="/scan" element={<ScanScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/transactions" element={<TransactionHistoryScreen />} />
        
        {/* Payment Routes */}
        <Route path="/payment/amount" element={<AmountEntryScreen />} />
        <Route path="/payment/contacts" element={<ContactSelectionScreen />} />
        <Route path="/payment/confirmation" element={<PaymentConfirmationScreen />} />
        <Route path="/payment/detail/:id" element={<TransactionDetailScreen />} />
        <Route path="/payment/upi-pin" element={<UPIPinScreen />} />
        
        {/* Investment Routes */}
        <Route path="/invest" element={<InvestScreen />} />
        <Route path="/invest/mutual-funds" element={<MutualFundsExploreScreen />} />
        <Route path="/invest/explore" element={<ExploreFundsScreen />} />
        <Route path="/invest/mutual-funds/list" element={<MutualFundListScreen />} />
        <Route path="/invest/fund-screener" element={<FundScreenerScreen />} />
        <Route path="/invest/mutual-fund/:id" element={<MutualFundDetailScreen />} />
        <Route path="/invest/compare" element={<FundComparisonScreen />} />
        <Route path="/invest/portfolio" element={<PortfolioScreen />} />
        <Route path="/invest/dashboard" element={<InvestmentDashboard />} />
        <Route path="/invest/research" element={<ResearchScreen />} />
        <Route path="/invest/tax-planning" element={<TaxPlanningScreen />} />
        <Route path="/invest/order-summary" element={<OrderSummaryScreen />} />
        <Route path="/invest/payment-method" element={<PaymentMethodScreen />} />
        <Route path="/invest/payment-confirmation" element={<PaymentConfirmationScreen />} />
        <Route path="/invest/sip-setup" element={<SIPSetupScreen />} />
        <Route path="/invest/sip-management" element={<SIPManagementScreen />} />
        <Route path="/invest/redemption" element={<PartialRedemptionScreen />} />
        <Route path="/invest/redemption-confirmation" element={<RedemptionConfirmationScreen />} />
        
        {/* Profile Routes */}
        <Route path="/profile/edit" element={<EditProfileScreen />} />
        <Route path="/profile/dashboard" element={<UserDashboard />} />
        <Route path="/profile/kyc" element={<KYCVerificationScreen />} />
        
        {/* SIP Calculator */}
        <Route path="/sip-calculator" element={<SIPCalculatorScreen />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
