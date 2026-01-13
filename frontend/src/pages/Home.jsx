import CTA from "./CTA";
import Features from "./Features";
import Stats from "./Stats";
import Works from "./Works";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const HomePage = () => {
   const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/mood-check");   // logged-in
    } else {
      navigate("/login");        // not logged-in
    }
  };
  return (
    <div className='bg-light py-5'>
      {/* Hero Section */}
      <section className='bg-white'>
        <div className='container py-5'>
          <div className='row align-items-center'>
            <div className='col-lg-6 mb-4 mb-lg-0 order-1 order-lg-0'>
              <h1 className='display-4 fw-bold text-dark mb-4'>
                Your Personal AI Mental Health Coach
              </h1>
              <p className='lead text-secondary mb-4'>
                Track your mood, get personalized insights, and improve your mental wellbeing with AI-powered guidance available 24/7.
              </p>
              <div className='d-flex gap-3 flex-wrap'>
                <button 
      onClick={handleGetStarted} 
      className='btn btn-primary btn-lg px-4'
    >
      Get Started Free
    </button>
                <a href='#how-it-works' className='btn btn-outline-primary btn-lg px-4'>
                  How It Works
                </a>
              </div>
              {/* Trust Badges */}
            </div>
          <div className='col-lg-6 d-flex justify-content-center mb-4 mb-lg-0 order-0 order-lg-1'>
  <img 
    src="/hero.jpeg" 
    alt="Hero" 
    className='img-fluid rounded shadow-sm'
    style={{ maxWidth: "80%", height: "auto" }} 
  />
</div>
      </div>
        </div>
      </section>

      {/* Features Section */}
  <Features />
      {/* How It Works Section */}
  <Works />
      {/* Stats Section */}
  <Stats />
      {/* CTA Section */}
   <CTA />
    </div>
  );
};

export default HomePage;
