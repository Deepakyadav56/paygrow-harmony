
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import OTPVerificationScreen from "./pages/OTPVerificationScreen";
import NewPasswordScreen from "./pages/NewPasswordScreen";
import HomeScreen from "./pages/HomeScreen";
import PayScreen from "./pages/PayScreen";
import InvestScreen from "./pages/InvestScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth & Onboarding Flow */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/verification" element={<OTPVerificationScreen />} />
          <Route path="/new-password" element={<NewPasswordScreen />} />
          
          {/* Main App Screens */}
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/pay" element={<PayScreen />} />
          <Route path="/invest" element={<InvestScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          
          {/* For development convenience - redirect /index to home */}
          <Route path="/index" element={<Navigate to="/home" replace />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
