
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import existing pages/components
import OnboardingScreen from './pages/OnboardingScreen';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import PayScreen from './pages/PayScreen';
import InvestScreen from './pages/InvestScreen';
import Index from './pages/Index';

// Import new mutual fund screens
import MutualFundsDashboard from './pages/MutualFundsDashboard';
import MutualFundDetail from './pages/MutualFundDetail';
import MutualFundList from './pages/MutualFundList';
import MutualFundFilter from './pages/MutualFundFilter';
import OneTimeInvestment from './pages/InvestmentFlow/OneTimeInvestment';
import OTPVerification from './pages/InvestmentFlow/OTPVerification';
import PaymentSuccess from './pages/InvestmentFlow/PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/pay" element={<PayScreen />} />
        <Route path="/invest" element={<InvestScreen />} />
        
        {/* New Mutual Fund Routes */}
        <Route path="/mutual-funds" element={<MutualFundsDashboard />} />
        <Route path="/mutual-funds/:id" element={<MutualFundDetail />} />
        <Route path="/mutual-funds/all" element={<MutualFundList />} />
        <Route path="/mutual-funds/filter" element={<MutualFundFilter />} />
        <Route path="/mutual-funds/invest" element={<OneTimeInvestment />} />
        <Route path="/mutual-funds/invest/otp" element={<OTPVerification />} />
        <Route path="/mutual-funds/invest/success" element={<PaymentSuccess />} />
        
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
