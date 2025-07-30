import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Target, Brain, Code, Mic, BarChart, CheckCircle, Star } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Questions",
      description: "Tailored to your resume & experience",
      color: "text-primary"
    },
    {
      icon: Code,
      title: "Real-time Coding", 
      description: "Instant feedback as you code",
      color: "text-accent"
    },
    {
      icon: Mic,
      title: "Voice Interaction",
      description: "Talk naturally with the AI interviewer",
      color: "text-success"
    },
    {
      icon: BarChart,
      title: "Detailed Analysis",
      description: "Performance breakdown and improvement tips",
      color: "text-purple"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      content: "Hirescout helped me nail my Google interview! The AI questions were spot-on.",
      rating: 5
    },
    {
      name: "Marcus Johnson", 
      role: "Bootcamp Graduate",
      content: "The real-time coding feedback was game-changing. I felt so prepared.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Recent Graduate",
      content: "Finally got my dream job at Microsoft after practicing with Hirescout!",
      rating: 5
    }
  ];

  const stats = [
    { value: "94%", label: "Success Rate" },
    { value: "10K+", label: "Students Helped" },
    { value: "500+", label: "Companies Covered" },
    { value: "4.9★", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                ✨ Built for Students
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Ace Every Interview with{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Mock Sessions
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg">
                  Personalized. Insightful. Effective. Practice with AI that understands your background and gives real-time feedback.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow" asChild>
                  <Link to="/signup">Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 border-border hover:bg-secondary" asChild>
                  <Link to="/demo">Watch Demo</Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                💡 Your next opportunity begins with a Prep.
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-float">
              <div className="relative">
                <img 
                  src="/lovable-uploads/a514e53c-2887-4fbb-914c-e9ac96aea6fb.png"
                  alt="AI Interview Assistant"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
                <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-success/20 rounded-lg blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-purple/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              🚀 Core Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive interview preparation tailored to your unique profile.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 bg-card border-border/50 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-card flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="bg-purple/10 text-purple border-purple/20">
              📋 Simple Process
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              How It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Upload Resume", desc: "Share your background and experience" },
              { step: "2", title: "Start Interview", desc: "AI generates personalized questions" },
              { step: "3", title: "Get Analysis", desc: "Receive detailed feedback and tips" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="bg-yellow/10 text-yellow-foreground border-yellow/20">
              💬 Success Stories
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              What Students Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border/50 hover:shadow-card transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                    ))}
                  </div>
                  <p className="text-card-foreground italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of students who've landed their dream jobs with Hirescout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 opacity-20"></div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;