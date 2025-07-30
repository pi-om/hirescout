import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-interview.jpg";
import { 
  Target, 
  MessageSquare, 
  Code, 
  BarChart3, 
  Star, 
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
  Brain
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Questions",
      description: "AI-tailored questions based on your resume and target role"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Real-time Coding",
      description: "Live coding environment with instant feedback and suggestions"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Voice Interaction",
      description: "Natural conversation with our AI interviewer"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Detailed Analysis",
      description: "Comprehensive performance reports with improvement tips"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CS Student, Stanford",
      content: "Hirescout helped me land my dream internship at Google. The personalized feedback was incredible!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      content: "The voice interaction felt so real. I went from nervous to confident in just 3 sessions.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Data Science Student",
      content: "Best investment for interview prep. The AI caught issues I never noticed about my responses.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary-light/20 to-accent-light/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 bg-primary-light text-primary animate-fade-in">
                🚀 Now with AI Voice Interaction
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                Ace Every Interview with{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Mock Sessions
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
                Built for students. Personalized. Insightful. Effective.
                <br />
                Practice with our AI interviewer and get real-time feedback to land your dream job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in">
                <Button size="xl" variant="hero" asChild className="group">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link to="/demo">Watch Demo</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Hirescout AI Interview Platform" 
                  className="rounded-2xl shadow-elegant w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-hero rounded-2xl opacity-20 animate-float"></div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive interview preparation tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-accent-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple. Effective. Results.
            </h2>
            <p className="text-lg text-muted-foreground">
              Get interview-ready in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your background to create personalized interview questions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold mb-2">Practice with AI</h3>
              <p className="text-muted-foreground">
                Engage in realistic mock interviews with voice interaction and coding challenges
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Detailed Feedback</h3>
              <p className="text-muted-foreground">
                Receive comprehensive analysis and actionable tips to improve your performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Students
              </span>{" "}
              Everywhere
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our users have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have landed their dream jobs with Hirescout
          </p>
          <Button size="xl" variant="accent" asChild className="group">
            <Link to="/signup">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}