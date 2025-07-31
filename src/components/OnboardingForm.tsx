import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, ArrowRight, GraduationCap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OnboardingFormProps {
  onComplete: () => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    college: "",
    graduationYear: "",
    major: ""
  });
  const { updateProfile } = useAuth();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await updateProfile({
      college: formData.college,
      course: formData.major,
      year: formData.graduationYear,
      resume_url: resumeFile ? resumeFile.name : null,
    });
    
    if (result.success) {
      onComplete();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update profile",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent-light/20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Hirescout!</h1>
          <p className="text-muted-foreground">
            Let's set up your profile to get personalized interview preparation
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              This information helps us provide better interview preparation tailored to your background
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* College Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>Educational Background</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input
                      id="college"
                      name="college"
                      type="text"
                      placeholder="Harvard University"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="transition-all focus:shadow-glow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      placeholder="2024"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      className="transition-all focus:shadow-glow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major/Field of Study</Label>
                  <Input
                    id="major"
                    name="major"
                    type="text"
                    placeholder="Computer Science"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="transition-all focus:shadow-glow"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume (Optional)</Label>
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
                </div>

                <div className="bg-primary-light/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Why add your resume?</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Get personalized interview questions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Receive targeted feedback on your background</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Practice with role-specific scenarios</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleSkip}
                >
                  Skip for now
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      Complete Setup
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}