import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Upload, FileText, Calendar, Clock, TrendingUp, User, CheckCircle } from "lucide-react";

export default function Profile() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      // In a real app, handle resume upload here
    }, 2000);
  };

  // Mock data for interview analysis
  const interviewAnalysis = [
    {
      id: 1,
      date: "2024-01-25",
      type: "Technical Interview",
      score: 85,
      duration: "45 min",
      feedback: "Strong technical skills, good problem-solving approach",
      strengths: ["Algorithm knowledge", "Code structure", "Communication"],
      improvements: ["Time management", "Edge case handling"]
    },
    {
      id: 2,
      date: "2024-01-20",
      type: "Behavioral Interview",
      score: 78,
      duration: "30 min",
      feedback: "Good examples, needs more specific details",
      strengths: ["Leadership examples", "Clear communication"],
      improvements: ["STAR method", "Quantify achievements"]
    },
    {
      id: 3,
      date: "2024-01-15",
      type: "System Design",
      score: 92,
      duration: "60 min",
      feedback: "Excellent system design approach",
      strengths: ["Scalability thinking", "Trade-off analysis"],
      improvements: ["Database optimization"]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent-light/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-muted-foreground">
              Manage your interview preparation and track your progress
            </p>
          </div>

          <Tabs defaultValue="analysis" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">Interview Analysis</TabsTrigger>
              <TabsTrigger value="resume">Resume Management</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Performance Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Your interview performance summary
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-primary-light/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">3</div>
                      <div className="text-sm text-muted-foreground">Total Interviews</div>
                    </div>
                    <div className="text-center p-4 bg-accent-light/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">85</div>
                      <div className="text-sm text-muted-foreground">Average Score</div>
                    </div>
                    <div className="text-center p-4 bg-success-light/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">2h 15m</div>
                      <div className="text-sm text-muted-foreground">Total Practice Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Interview Analysis</h3>
                {interviewAnalysis.map((interview) => (
                  <Card key={interview.id} className="shadow-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{interview.type}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{interview.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={getScoreBadgeVariant(interview.score)} className="text-lg px-3 py-1">
                          {interview.score}%
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{interview.feedback}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-success mb-2">Strengths</h5>
                          <ul className="space-y-1">
                            {interview.strengths.map((strength, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-success" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-warning mb-2">Areas for Improvement</h5>
                          <ul className="space-y-1">
                            {interview.improvements.map((improvement, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                                <TrendingUp className="w-3 h-3 text-warning" />
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resume" className="space-y-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Resume Management</span>
                  </CardTitle>
                  <CardDescription>
                    Upload and manage your resume for personalized interview questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="resume">Upload Resume</Label>
                    <div className="relative">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start h-20"
                        onClick={() => document.getElementById('resume')?.click()}
                      >
                        {resumeFile ? (
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-success" />
                            <div className="text-left">
                              <div className="font-medium">{resumeFile.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <div className="text-center">
                              <div className="font-medium">Click to upload resume</div>
                              <div className="text-sm text-muted-foreground">
                                PDF, DOC, or DOCX files up to 10MB
                              </div>
                            </div>
                          </div>
                        )}
                      </Button>
                    </div>
                    
                    {resumeFile && (
                      <Button 
                        onClick={handleResumeUpload}
                        disabled={isUploading}
                        variant="hero"
                        className="w-full"
                      >
                        {isUploading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Uploading...</span>
                          </div>
                        ) : (
                          "Upload Resume"
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="bg-primary-light/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Why upload your resume?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Get personalized interview questions based on your experience</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Receive targeted feedback on your skills and background</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Practice with role-specific scenarios</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}