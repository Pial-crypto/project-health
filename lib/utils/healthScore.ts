// Health score calculation logic
import { EmployeeCheckIn, ClientFeedback, Risk, RiskSeverity, Project } from "../types";

export function calculateHealthScore(
  clientFeedbacks: ClientFeedback[],
  employeeCheckIns: EmployeeCheckIn[],
  risks: Risk[],
  project: Project
): number {
  let score = 100;

  // 1. Client satisfaction impact (30 points max)
  if (clientFeedbacks.length > 0) {
    const avgSatisfaction =
      clientFeedbacks.reduce((sum, f) => sum + f.satisfactionRating, 0) /
      clientFeedbacks.length;
    const avgClarity =
      clientFeedbacks.reduce((sum, f) => sum + f.communicationClarity, 0) /
      clientFeedbacks.length;

    const satisfactionScore = (avgSatisfaction / 5) * 15;
    const clarityScore = (avgClarity / 5) * 15;
    score -= 30 - (satisfactionScore + clarityScore);
  }

  // 2. Employee confidence impact (25 points max)
  if (employeeCheckIns.length > 0) {
    const avgConfidence =
      employeeCheckIns.reduce((sum, c) => sum + c.confidenceLevel, 0) /
      employeeCheckIns.length;
    const confidenceScore = (avgConfidence / 5) * 25;
    score -= 25 - confidenceScore;
  }

  // 3. Progress tracking impact (20 points max)
  if (employeeCheckIns.length > 0) {
    const avgCompletion =
      employeeCheckIns.reduce((sum, c) => sum + c.completionPercentage, 0) /
      employeeCheckIns.length;

    // Expected vs actual
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const elapsedDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const expectedCompletion = (elapsedDays / totalDays) * 100;

    const progressDifference = avgCompletion - expectedCompletion;
    let progressScore = 20;

    if (progressDifference < -10) {
      progressScore = 5; // Significantly behind
    } else if (progressDifference < 0) {
      progressScore = 10; // Slightly behind
    } else if (progressDifference < 10) {
      progressScore = 18; // On track
    } else {
      progressScore = 20; // Ahead of schedule
    }

    score -= 20 - progressScore;
  }

  // 4. Risk management impact (25 points max)
  if (risks.length > 0) {
    let riskPenalty = 0;
    risks.forEach((risk) => {
      if (risk.status === "open") {
        if (risk.severity === RiskSeverity.HIGH) {
          riskPenalty += 10;
        } else if (risk.severity === RiskSeverity.MEDIUM) {
          riskPenalty += 5;
        } else {
          riskPenalty += 2;
        }
      }
    });

    const actualPenalty = Math.min(riskPenalty, 25);
    score -= actualPenalty;
  }

  // 5. Flagged issues impact (10 points max)
  const flaggedCount = clientFeedbacks.filter((f) => f.flaggedIssue).length;
  if (flaggedCount > 0) {
    score -= Math.min(flaggedCount * 2, 10);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getHealthStatus(score: number) {
  if (score >= 80) return "On Track";
  if (score >= 60) return "At Risk";
  return "Critical";
}

export function getHealthColor(score: number) {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}

export function getHealthBgColor(score: number) {
  if (score >= 80) return "bg-green-50";
  if (score >= 60) return "bg-yellow-50";
  return "bg-red-50";
}

export function getHealthBorderColor(score: number) {
  if (score >= 80) return "border-green-200";
  if (score >= 60) return "border-yellow-200";
  return "border-red-200";
}

export function getHealthTextColor(score: number) {
  if (score >= 80) return "text-green-800";
  if (score >= 60) return "text-yellow-800";
  return "text-red-800";
}
