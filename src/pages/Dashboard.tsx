import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  Target, 
  Play, 
  BarChart3, 
  Upload, 
  User, 
  ArrowRight,
  Calendar,
  Clock,
  TrendingUp,
  Star
} from "lucide-react";

export default function Dashboard() {
  const userName = "Alex Johnson";
  const prepsRemaining = 4;
  
  const recentInterviews = [
    {
      date: "2024-01-15",
      type: "Technical",
      score: 85,
      duration: "45 min"
    },
    {
      date: "2024-01-12",
      type: "Behavioral",
      score: 92,
      duration: "30 min"
    },
    {
      date: "2024-01-10",
      type: "Technical",
      score: 78,
      duration: "50 min"
    }
  ];

  const quickActions = [
    {
      icon: <Play className="w-6 h-6" />,
      title: "Start Interview",
      description: "Begin a new AI-powered mock interview session",
      href: "/interview",
      variant: "hero" as const,
      badge: "Popular"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "View Past Analyses",
      description: "Review your previous interview performances",
      href: "/reports",
      variant: "default" as const
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Resume",
      description: "Update your resume for personalized questions",
      href: "/profile",
      variant: "outline" as const
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Edit Profile",
      description: "Manage your account settings and preferences",
      href: "/profile",
      variant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} prepsRemaining={prepsRemaining} userName={userName} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to ace your next interview? Let's get you prepared.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prep Wallet Card */}
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span>Prep Wallet</span>
                    </CardTitle>
                    <CardDescription>
                      Your interview preparation credits
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-primary-light text-primary text-lg px-3 py-1">
                    {prepsRemaining} Preps
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Each prep gives you one complete interview session with detailed analysis
                  </p>
                  <Button variant="accent" size="sm">
                    Buy More Preps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          {action.icon}
                        </div>
                        {action.badge && (
                          <Badge variant="secondary" className="bg-accent-light text-accent">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {action.description}
                      </p>
                      <Button variant={action.variant} className="w-full group">
                        <Link to={action.href} className="flex items-center justify-center w-full">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span>Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <span className="font-semibold text-lg">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interviews Completed</span>
                  <span className="font-semibold">{recentInterviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Improvement Rate</span>
                  <span className="font-semibold text-success">+12%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Interviews */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Recent Interviews</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/reports">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentInterviews.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent-light/30 hover:bg-accent-light/50 transition-colors">
                    <div>
                      <div className="font-medium text-sm">{interview.type}</div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>{interview.date}</span>
                        <Clock className="w-3 h-3" />
                        <span>{interview.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="font-semibold text-sm">{interview.score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="shadow-card bg-gradient-success text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
                <p className="text-sm opacity-90">
                  Practice regularly for best results. Aim for 2-3 sessions per week to see significant improvement in your interview skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}