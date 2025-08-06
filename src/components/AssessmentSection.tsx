import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, Activity, Users, Target } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: "likert" | "multiple" | "boolean";
  options?: string[];
  category: string;
  weight?: number;
}

interface AssessmentSectionProps {
  sectionId: number;
  title: string;
  description: string;
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
  onBack: () => void;
}

const AssessmentSection = ({ sectionId, title, description, questions, onComplete, onBack }: AssessmentSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sectionProgress, setSectionProgress] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    setSectionProgress(progress);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  const getLikertOptions = () => [
    "Strongly Disagree",
    "Disagree", 
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  const getSectionIcon = () => {
    switch (sectionId) {
      case 1: return <Brain className="h-8 w-8 text-primary" />;
      case 2: return <Activity className="h-8 w-8 text-primary" />;
      case 3: return <Users className="h-8 w-8 text-primary" />;
      default: return <Target className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getSectionIcon()}
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{description}</p>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="assessment-progress" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="assessment-card mb-8">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQuestion.text}
          </CardTitle>
          {currentQuestion.category && (
            <CardDescription className="text-sm">
              Category: {currentQuestion.category}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentQuestion.type === "likert" && (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {getLikertOptions().map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "multiple" && currentQuestion.options && (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "boolean" && (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="true" id="yes" />
                  <Label htmlFor="yes" className="flex-1 cursor-pointer font-medium">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="false" id="no" />
                  <Label htmlFor="no" className="flex-1 cursor-pointer font-medium">
                    No
                  </Label>
                </div>
              </RadioGroup>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="hero-button flex items-center"
        >
          {isLastQuestion ? "Complete Section" : "Next Question"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentSection;