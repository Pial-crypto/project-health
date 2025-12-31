
import { ClientFeedback, EmployeeCheckIn, Risk } from "@/lib/types";

export interface HealthInput {
  clientFeedbacks?: ClientFeedback[];
  employeeCheckIns?: EmployeeCheckIn[];
  risks?: Risk[];
  completionPercentage?: number; // 0-100
  daysElapsed?: number;
  totalDays?: number;
}



export function calculateHealth(input: HealthInput): number {
  let score = 100;
  const { clientFeedbacks = [], employeeCheckIns = [], risks = [], completionPercentage = 0, daysElapsed = 0, totalDays = 0 } = input;

  //  Client feedback (30 points)
  if (clientFeedbacks.length > 0) {
    const recentFeedbacks = clientFeedbacks.slice(-4);
    const avgSatisfaction = recentFeedbacks.reduce((sum, f) => sum + f.satisfactionRating, 0) / recentFeedbacks.length;
    const avgClarity = recentFeedbacks.reduce((sum, f) => sum + f.communicationClarity, 0) / recentFeedbacks.length;
    const flaggedCount = recentFeedbacks.filter(f => f.flaggedIssue).length;

    let clientScore = ((avgSatisfaction + avgClarity) / 2 / 5) * 30;
    clientScore -= Math.min(flaggedCount * 2, 10);
    score -= 30 - clientScore;
  }

 ////Employee confidence (25 points)
  if (employeeCheckIns.length > 0) {
    const recentCheckIns = employeeCheckIns.slice(-4);
    const avgConfidence = recentCheckIns.reduce((sum, c) => sum + c.confidenceLevel, 0) / recentCheckIns.length;
    const confidenceScore = (avgConfidence / 5) * 25;
    score -= 25 - confidenceScore;
  }

// Progress vs timeline (20 points)
  if (totalDays > 0) {
    const expectedProgress = (daysElapsed / totalDays) * 100;
    const progressDelta = completionPercentage - expectedProgress;
    let progressScore = 20;
    if (progressDelta < -10) progressScore = 5;
    else if (progressDelta < 0) progressScore = 10;
    else if (progressDelta < 10) progressScore = 18;
    else progressScore = 20;
    score -= 20 - progressScore;
  }

 //Risk assessment (25 points)
  if (risks.length > 0) {
    let riskPenalty = 0;
    risks.forEach(r => {
      if (r.solved) {
        if (r.severity === "high") riskPenalty += 10;
        else if (r.severity === "medium") riskPenalty += 5;
        else riskPenalty += 2;
      }
    });
    score -= Math.min(riskPenalty, 25);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getHealthStatus(score: number) {
  if (score >= 80) return "on_track";
  if (score >= 60) return "at_risk";
  return "critical";
}

export function getHealthColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

export function getHealthBgColor(score: number) {
  if (score >= 80) return "bg-green-50";
  if (score >= 60) return "bg-yellow-50";
  return "bg-red-50";
}
