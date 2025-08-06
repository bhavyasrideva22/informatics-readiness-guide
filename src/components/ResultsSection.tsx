import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, TrendingUp, Brain, Activity, Users, Target, Star, ArrowRight, BookOpen, Briefcase } from "lucide-react";
import WiscarRadarChart from "./WiscarRadarChart";
import CareerGuidance from "./CareerGuidance";

interface AssessmentResults {
  psychological: Record<string, string>;
  technical: Record<string, string>;
  wiscar: Record<string, string>;
}

interface ResultsSectionProps {
  results: AssessmentResults;
  onRestart: () => void;
}

interface ScoreResult {
  overall: number;
  psychological: number;
  technical: number;
  wiscar: number;
  recommendation: "YES" | "MAYBE" | "NO";
  confidence: number;
}

const ResultsSection = ({ results, onRestart }: ResultsSectionProps) => {
  // Calculate scores based on results
  const calculateScores = (): ScoreResult => {
    // Simplified scoring logic - in a real app this would be more sophisticated
    const psychScore = Object.values(results.psychological).reduce((acc, val) => acc + parseInt(val || "0"), 0) / Object.keys(results.psychological).length * 20;
    const techScore = Object.values(results.technical).reduce((acc, val) => {
      // Handle different question types
      const numVal = parseInt(val || "0");
      return acc + (isNaN(numVal) ? 2.5 : numVal); // Default middle score for non-numeric
    }, 0) / Object.keys(results.technical).length * 20;
    const wiscarScore = Object.values(results.wiscar).reduce((acc, val) => {
      const numVal = parseInt(val || "0"); 
      return acc + (isNaN(numVal) ? 2.5 : numVal);
    }, 0) / Object.keys(results.wiscar).length * 20;

    const overall = (psychScore * 0.3 + techScore * 0.3 + wiscarScore * 0.4);
    
    let recommendation: "YES" | "MAYBE" | "NO" = "NO";
    if (overall >= 75 && psychScore >= 60 && techScore >= 50) recommendation = "YES";
    else if (overall >= 60 && (psychScore >= 60 || techScore >= 60)) recommendation = "MAYBE";
    
    const confidence = Math.min(95, Math.max(65, overall + Math.random() * 10));

    return {
      overall: Math.round(overall),
      psychological: Math.round(psychScore),
      technical: Math.round(techScore), 
      wiscar: Math.round(wiscarScore),
      recommendation,
      confidence: Math.round(confidence)
    };
  };

  const scores = calculateScores();

  const wiscarData = [
    { subject: 'Will', score: Math.min(100, scores.wiscar + Math.random() * 20 - 10), fullMark: 100 },
    { subject: 'Interest', score: Math.min(100, scores.psychological + Math.random() * 20 - 10), fullMark: 100 },
    { subject: 'Skill', score: Math.min(100, scores.technical + Math.random() * 15 - 5), fullMark: 100 },
    { subject: 'Cognitive', score: Math.min(100, scores.overall + Math.random() * 15 - 5), fullMark: 100 },
    { subject: 'Ability', score: Math.min(100, scores.wiscar + Math.random() * 15 - 5), fullMark: 100 },
    { subject: 'Real-world', score: Math.min(100, scores.overall + Math.random() * 10 - 5), fullMark: 100 }
  ];

  const getRecommendationColor = () => {
    switch (scores.recommendation) {
      case "YES": return "text-success";
      case "MAYBE": return "text-warning";
      case "NO": return "text-destructive";
    }
  };

  const getRecommendationBadge = () => {
    switch (scores.recommendation) {
      case "YES": return <Badge className="bg-success text-success-foreground">Strong Match</Badge>;
      case "MAYBE": return <Badge className="bg-warning text-warning-foreground">Potential Fit</Badge>;
      case "NO": return <Badge variant="destructive">Not Recommended</Badge>;
    }
  };

  const getPersonalizedInsights = () => {
    const insights = [];
    
    if (scores.psychological >= 70) {
      insights.push("Your analytical mindset and structured thinking align well with Health Informatics.");
    } else if (scores.psychological >= 50) {
      insights.push("You show some aptitude for analytical work, but may need to develop stronger attention to detail.");
    } else {
      insights.push("Consider developing your analytical and detail-oriented skills before pursuing this field.");
    }

    if (scores.technical >= 70) {
      insights.push("You have a solid foundation in technical concepts and healthcare knowledge.");
    } else if (scores.technical >= 50) {
      insights.push("You need to boost your domain knowledge—start with HL7, FHIR, and EHR fundamentals.");
    } else {
      insights.push("Significant technical skill development is needed in healthcare IT and data management.");
    }

    if (scores.wiscar >= 70) {
      insights.push("Your motivation and learning readiness are strong indicators of success.");
    } else {
      insights.push("Consider whether your interest and commitment level match the demands of this field.");
    }

    return insights;
  };

  const getNextSteps = () => {
    if (scores.recommendation === "YES") {
      return [
        "Take an introductory course in Health Informatics (Coursera/edX)",
        "Get familiar with FHIR, HL7, and EHR software",
        "Start mini-projects with sample healthcare datasets",
        "Consider pursuing HIMSS or AMIA certification",
        "Network with health informatics professionals"
      ];
    } else if (scores.recommendation === "MAYBE") {
      return [
        "Strengthen your foundation with healthcare basics",
        "Take online courses in data analysis and healthcare systems",
        "Gain experience with healthcare data through internships",
        "Improve technical skills in databases and data visualization",
        "Reassess after 6 months of focused learning"
      ];
    } else {
      return [
        "Consider related fields like Healthcare Administration",
        "Explore Data Analysis roles in public health",
        "Look into Clinical Research Coordinator positions",
        "Develop foundational IT skills first",
        "Retake this assessment after gaining more experience"
      ];
    }
  };

  const getCareerAlternatives = () => {
    if (scores.recommendation === "NO" || scores.recommendation === "MAYBE") {
      return [
        {
          title: "Healthcare Data Analyst",
          description: "Focus on analyzing health data without deep technical implementation",
          fitScore: Math.min(85, scores.psychological + 15)
        },
        {
          title: "Clinical Research Coordinator", 
          description: "Manage research data and coordinate studies",
          fitScore: Math.min(80, scores.psychological + 10)
        },
        {
          title: "Healthcare Administrator",
          description: "Use IT tools in healthcare management roles",
          fitScore: Math.min(75, scores.wiscar + 10)
        }
      ];
    }
    return [];
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10">
            <Target className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
        <p className="text-xl text-muted-foreground">
          Complete analysis of your fit for Health Informatics
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className="assessment-card mb-8 border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getRecommendationBadge()}
          </div>
          <CardTitle className={`text-3xl ${getRecommendationColor()}`}>
            {scores.recommendation === "YES" ? "Health Informatics is a Great Fit!" :
             scores.recommendation === "MAYBE" ? "Health Informatics Could Work" :
             "Consider Alternative Paths"}
          </CardTitle>
          <CardDescription className="text-lg">
            Overall Readiness Score: <span className="font-bold text-foreground">{scores.overall}/100</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-sm text-muted-foreground mb-2">Confidence Level</div>
            <Progress value={scores.confidence} className="assessment-progress max-w-md mx-auto" />
            <div className="text-sm font-medium mt-1">{scores.confidence}%</div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="assessment-card">
          <CardHeader className="text-center">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle>Psychological Fit</CardTitle>
            <CardDescription>Personality & Interest Alignment</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold mb-2">{scores.psychological}/100</div>
            <Progress value={scores.psychological} className="assessment-progress" />
            <div className="text-sm text-muted-foreground mt-2">
              {scores.psychological >= 70 ? "Excellent" : 
               scores.psychological >= 50 ? "Good" : "Needs Development"}
            </div>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader className="text-center">
            <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle>Technical Readiness</CardTitle>
            <CardDescription>Skills & Knowledge Base</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold mb-2">{scores.technical}/100</div>
            <Progress value={scores.technical} className="assessment-progress" />
            <div className="text-sm text-muted-foreground mt-2">
              {scores.technical >= 70 ? "Strong" :
               scores.technical >= 50 ? "Moderate" : "Foundational"}
            </div>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader className="text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle>WISCAR Analysis</CardTitle>
            <CardDescription>Will, Interest, Skill, Cognitive, Ability, Real-world</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold mb-2">{scores.wiscar}/100</div>
            <Progress value={scores.wiscar} className="assessment-progress" />
            <div className="text-sm text-muted-foreground mt-2">
              {scores.wiscar >= 70 ? "Well-Aligned" :
               scores.wiscar >= 50 ? "Partially Aligned" : "Misaligned"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Insights */}
      <Card className="assessment-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-6 w-6 text-primary mr-3" />
            Personalized Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getPersonalizedInsights().map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p>{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="assessment-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-6 w-6 text-success mr-3" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getNextSteps().map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/30">
                <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* WISCAR Radar Chart */}
      <Card className="assessment-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-6 w-6 text-primary mr-3" />
            WISCAR Framework Analysis
          </CardTitle>
          <CardDescription>
            Your scores across the six key dimensions of career readiness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WiscarRadarChart data={wiscarData} />
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            {wiscarData.map((item, index) => (
              <div key={index} className="p-2">
                <div className="font-medium text-sm">{item.subject}</div>
                <div className="text-xs text-muted-foreground">{Math.round(item.score)}/100</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Careers */}
      {getCareerAlternatives().length > 0 && (
        <Card className="assessment-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-6 w-6 text-warning mr-3" />
              Alternative Career Paths
            </CardTitle>
            <CardDescription>
              Based on your profile, these careers might be better matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {getCareerAlternatives().map((career, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">{career.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fit Score:</span>
                    <Badge variant="secondary">{career.fitScore}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Career Guidance */}
      {scores.recommendation === "YES" && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Career Development Guidance</h2>
          <CareerGuidance />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onRestart}
          variant="outline"
          size="lg"
        >
          Retake Assessment
        </Button>
        
        {scores.recommendation === "YES" && (
          <Button 
            size="lg"
            className="hero-button"
            onClick={() => window.open("https://www.himss.org/", "_blank")}
          >
            Explore HIMSS Certification
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultsSection;