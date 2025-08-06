import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BookOpen, Users, Award } from "lucide-react";

interface CareerRole {
  title: string;
  description: string;
  skillsNeeded: string[];
  growthPotential: "High" | "Medium-High" | "Medium";
  salaryRange: string;
}

interface LearningPath {
  level: string;
  title: string;
  description: string;
  duration: string;
  resources: string[];
}

const CareerGuidance = () => {
  const topCareerRoles: CareerRole[] = [
    {
      title: "Health Informatics Specialist",
      description: "Works at the intersection of health data, systems, and care processes",
      skillsNeeded: ["HL7/FHIR", "EHR Systems", "Healthcare Workflows", "Data Analysis"],
      growthPotential: "High",
      salaryRange: "$65,000 - $95,000"
    },
    {
      title: "Clinical Data Analyst", 
      description: "Analyzes patient care data to improve outcomes and efficiency",
      skillsNeeded: ["SQL", "Excel", "Statistical Analysis", "Healthcare Metrics"],
      growthPotential: "Medium-High",
      salaryRange: "$55,000 - $85,000"
    },
    {
      title: "EHR Implementation Consultant",
      description: "Helps clinics and hospitals integrate digital record systems",
      skillsNeeded: ["Project Management", "EHR Platforms", "Training", "Change Management"],
      growthPotential: "High", 
      salaryRange: "$70,000 - $110,000"
    },
    {
      title: "Population Health Data Analyst",
      description: "Uses data to assess public health trends and interventions",
      skillsNeeded: ["Epidemiology", "Statistics", "Data Visualization", "Public Health"],
      growthPotential: "High",
      salaryRange: "$60,000 - $90,000"
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      level: "Beginner",
      title: "Introduction to Health Informatics",
      description: "Foundation course covering healthcare systems, data, and technology basics",
      duration: "2-3 months",
      resources: ["Coursera Health Informatics", "edX Introduction to Healthcare", "HIMSS Webinars"]
    },
    {
      level: "Intermediate", 
      title: "Technical Skills Development",
      description: "Learn HL7, FHIR, SQL, and EHR systems hands-on",
      duration: "4-6 months",
      resources: ["HL7 FHIR Specification", "SQL for Healthcare Data", "Epic/Cerner Training"]
    },
    {
      level: "Advanced",
      title: "Specialization & Projects",
      description: "Choose focus area and complete portfolio projects",
      duration: "6-8 months", 
      resources: ["Capstone Project", "WHO/CDC Datasets", "Real EHR Implementations"]
    },
    {
      level: "Job-Ready",
      title: "Certification & Portfolio",
      description: "Obtain professional certification and build impressive portfolio",
      duration: "2-3 months",
      resources: ["AMIA Certification", "HIMSS Certification", "LinkedIn Portfolio"]
    }
  ];

  const getGrowthColor = (potential: string) => {
    switch (potential) {
      case "High": return "bg-success text-success-foreground";
      case "Medium-High": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Career Roles */}
      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <TrendingUp className="h-8 w-8 text-primary mr-3" />
          Top Career Opportunities
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {topCareerRoles.map((role, index) => (
            <Card key={index} className="assessment-card">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <Badge className={getGrowthColor(role.growthPotential)}>
                    {role.growthPotential} Growth
                  </Badge>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Skills Needed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skillsNeeded.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Salary Range:</span>
                    <span className="font-medium">{role.salaryRange}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ideal Learning Path */}
      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <BookOpen className="h-8 w-8 text-success mr-3" />
          Recommended Learning Path
        </h2>
        <div className="space-y-4">
          {learningPaths.map((path, index) => (
            <Card key={index} className="assessment-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="px-3 py-1">
                      {path.level}
                    </Badge>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                  </div>
                  <span className="text-sm text-muted-foreground">{path.duration}</span>
                </div>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium mb-2">Recommended Resources:</h4>
                  <div className="grid md:grid-cols-3 gap-2">
                    {path.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex items-center space-x-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-primary" />
                        <span>{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Development */}
      <Card className="assessment-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 text-primary mr-3" />
            Professional Development Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Certifications</h4>
              <ul className="space-y-2 text-sm">
                <li>• HIMSS Certified Associate in Healthcare Information Management (CAHIMS)</li>
                <li>• AMIA Health Informatics Certification</li>
                <li>• Epic or Cerner EHR Certification</li>
                <li>• HL7 FHIR Certification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Professional Organizations</h4>
              <ul className="space-y-2 text-sm">
                <li>• Healthcare Information and Management Systems Society (HIMSS)</li>
                <li>• American Medical Informatics Association (AMIA)</li>
                <li>• International Association for Healthcare Social & Health Informatics (IMIA)</li>
                <li>• Local Health IT User Groups</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button className="hero-button" onClick={() => window.open("https://www.himss.org/", "_blank")}>
              Explore HIMSS Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerGuidance;