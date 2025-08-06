import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Activity, Users, Target, Clock, CheckCircle, ArrowRight, Stethoscope, Database, Shield, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/health-informatics-hero.jpg";
import healthTechIcon from "@/assets/health-tech-icon.jpg";
import AssessmentSection from "@/components/AssessmentSection";
import ResultsSection from "@/components/ResultsSection";
import { allQuestions } from "@/data/assessmentQuestions";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(20);
  const [assessmentResults, setAssessmentResults] = useState({
    psychological: {},
    technical: {},
    wiscar: {}
  });

  const sections = [
    { name: "Introduction", icon: Target, status: "active" },
    { name: "Psychological Fit", icon: Brain, status: "upcoming" },
    { name: "Technical Aptitude", icon: Activity, status: "upcoming" },
    { name: "WISCAR Analysis", icon: Users, status: "upcoming" },
    { name: "Your Results", icon: CheckCircle, status: "upcoming" }
  ];

  const handleSectionComplete = (sectionType: string, answers: Record<string, string>) => {
    setAssessmentResults(prev => ({
      ...prev,
      [sectionType]: answers
    }));
    
    // Move to next section and update progress
    const nextSection = currentSection + 1;
    setCurrentSection(nextSection);
    
    // Update progress based on completion
    const newProgress = 20 + (nextSection * 20);
    setProgress(Math.min(100, newProgress));
  };

  const handleRestart = () => {
    setCurrentSection(0);
    setProgress(20);
    setAssessmentResults({
      psychological: {},
      technical: {},
      wiscar: {}
    });
  };

  const careerRoles = [
    {
      title: "Health Informatics Specialist",
      description: "Integrate IT and healthcare data systems"
    },
    {
      title: "Clinical Data Analyst", 
      description: "Analyze patient care data to improve outcomes"
    },
    {
      title: "EHR Manager",
      description: "Manage Electronic Health Records systems"
    },
    {
      title: "Health IT Project Manager",
      description: "Lead healthcare technology implementations"
    },
    {
      title: "Bioinformatics Analyst",
      description: "Process biological and medical data"
    },
    {
      title: "Population Health Analyst",
      description: "Analyze public health trends and patterns"
    }
  ];

  const idealTraits = [
    "High attention to detail",
    "Problem-solving mindset", 
    "Curiosity about health systems",
    "Comfort with regulations (HIPAA, HL7)",
    "Analytical thinking with human focus",
    "Interest in healthcare technology"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Health Informatics Career Assessment</h1>
                <p className="text-sm text-muted-foreground">Comprehensive Career Assessment & Guidance</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {progress}% Complete
              </Badge>
              <Progress value={progress} className="w-32 assessment-progress" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Steps */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.name}
                  onClick={() => setCurrentSection(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    index === currentSection
                      ? "section-active"
                      : index < currentSection
                      ? "section-completed"
                      : "section-upcoming"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentSection === 0 && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl mb-12">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative medical-gradient p-12 text-center">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Is Health Informatics Right for You?
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">
                    Discover your potential in healthcare technology and data management
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <div className="flex items-center text-white/90">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>25-30 minutes</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <Target className="h-5 w-5 mr-2" />
                      <span>Personalized Results</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      <span>Career Guidance</span>
                    </div>
                  </div>
                  <Button 
                    className="hero-button text-lg"
                    onClick={() => {
                      setCurrentSection(1);
                      setProgress(40);
                    }}
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* What is Health Informatics */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">What is Health Informatics?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Health Informatics is a powerful <strong>interdisciplinary field</strong> that specializes in 
                    <strong> healthcare data management</strong> and <strong>clinical technology integration</strong>. 
                    It empowers healthcare organizations to improve patient outcomes through data-driven insights 
                    and streamlined technological solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="assessment-card">
                    <CardContent className="p-4 text-center">
                      <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Data Integration</h3>
                      <p className="text-sm text-muted-foreground">Unify health data across systems</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="assessment-card">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 text-secondary-accent mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">HIPAA Compliance</h3>
                      <p className="text-sm text-muted-foreground">Ensure data privacy and security</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="assessment-card">
                    <CardContent className="p-4 text-center">
                      <Heart className="h-8 w-8 text-success mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Patient Outcomes</h3>
                      <p className="text-sm text-muted-foreground">Improve healthcare delivery</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <img 
                  src={healthTechIcon} 
                  alt="Health Technology Integration"
                  className="rounded-2xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Career Opportunities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerRoles.map((role, index) => (
                  <Card key={index} className="assessment-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ideal Traits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Ideal Traits & Skills</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {idealTraits.map((trait, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-accent/50 border border-border">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Modules Preview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">What You'll Discover</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="assessment-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-6 w-6 text-primary mr-3" />
                      Assessment Modules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">1</Badge>
                      <span>Psychological Fit Evaluation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">2</Badge>
                      <span>Technical Aptitude Testing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">3</Badge>
                      <span>WISCAR Framework Analysis</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="assessment-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-success mr-3" />
                      Your Results Include
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Personalized fit score (0-100)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Detailed trait analysis</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Technical readiness assessment</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Career pathway recommendations</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Next steps and learning resources</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="hero-button text-lg px-12"
                onClick={() => {
                  setCurrentSection(1);
                  setProgress(40);
                }}
              >
                Begin Your Assessment
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>
        )}

        {/* Assessment Sections */}
        {currentSection === 1 && (
          <AssessmentSection
            sectionId={1}
            title="Psychological Fit Assessment"
            description="Evaluate your personality traits, interests, and motivation for Health Informatics"
            questions={allQuestions.psychological}
            onComplete={(answers) => handleSectionComplete('psychological', answers)}
            onBack={() => setCurrentSection(0)}
          />
        )}

        {currentSection === 2 && (
          <AssessmentSection
            sectionId={2}
            title="Technical Aptitude Assessment"
            description="Test your logical reasoning, healthcare knowledge, and technical readiness"
            questions={allQuestions.technical}
            onComplete={(answers) => handleSectionComplete('technical', answers)}
            onBack={() => setCurrentSection(1)}
          />
        )}

        {currentSection === 3 && (
          <AssessmentSection
            sectionId={3}
            title="WISCAR Framework Analysis"
            description="Comprehensive evaluation using Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
            questions={allQuestions.wiscar}
            onComplete={(answers) => handleSectionComplete('wiscar', answers)}
            onBack={() => setCurrentSection(2)}
          />
        )}

        {currentSection === 4 && (
          <ResultsSection
            results={assessmentResults}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
};

export default Index;