import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              See Hirescout in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how our AI-powered interview preparation transforms your job search success
            </p>
          </div>

          {/* Video Section */}
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <p className="text-muted-foreground">Demo video will be embedded here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Ready to ace your next interview?
            </h2>
            <Button 
              size="lg" 
              variant="hero" 
              asChild
              className="px-8 py-6 text-lg font-semibold"
            >
              <Link to="/signup">Take Your First Interview</Link>
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">AI-Powered Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized interview questions based on your role and experience
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">Real-time Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Receive instant analysis of your responses and improvement suggestions
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">Performance Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your progress and see how you improve over time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}