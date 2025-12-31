"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  LoadingPage,
  EmptyState,
} from "@/app/components";
import Link from "next/link";
import { SkeletonList } from "../components/skeleton";
import { fetchCheckIns, fetchProjects, fetchRisk } from "@/lib/utils/api";
import { isCurrentWeek } from "@/lib/utils/checkInhelpers";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform Redesign",
    clientName: "Acme Corp",
    status: "on_track",
    healthScore: 82,
  },
  {
    id: "3",
    name: "API Development & Integration",
    clientName: "Acme Corp",
    status: "critical",
    healthScore: 45,
  },
];

const mockCheckIns = [
  {
    id: "1",
    projectId: "1",
    projectName: "E-commerce Platform Redesign",
    week: "2025-W08",
    progressSummary: "Completed UI mockups and started development",
    blockers: "Waiting for design assets from client",
    confidenceLevel: 4,
    completionPercentage: 35,
    createdAt: "2025-02-20T10:30:00Z",
  },
];

const mockRisks = [
  {
    id: "1",
    projectId: "3",
    projectName: "API Development & Integration",
    title: "Third-party Integration Delay",
    severity: "high",
    status: "open",
    createdAt: "2025-02-15T09:00:00Z",
  },
  {
    id: "2",
    projectId: "1",
    projectName: "E-commerce Platform Redesign",
    title: "Design Assets Delay",
    severity: "medium",
    status: "open",
    createdAt: "2025-02-10T14:00:00Z",
  },
];

export default function EmployeeDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const[risks,setRisks]=useState([])
  const [checkIns,setCheckIns]=useState([])

 useProtectedRoute(setUser,{employeeHome:true,setProjects,setUser,setCheckIns,setRisks},"employee",setIsLoading)

  if (isLoading) return <SkeletonList />;
  if (!user) return null;

  const openRisks = risks.filter((r) => r.solved);
  const pendingCheckIns = checkIns
  const thisWeekCount=openRisks.filter((risk)=>isCurrentWeek(risk.timeStamp)).length+checkIns.filter((checkIn)=>isCurrentWeek(checkIn.timeStamp)).length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor your assigned projects and submit progress
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {projects.length}
            </div>
            <p className="text-sm text-gray-600">Assigned Projects</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {checkIns.length}
            </div>
            <p className="text-sm text-gray-600">Pending Check-ins</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {openRisks.length}
            </div>
            <p className="text-sm text-gray-600">Open Risks</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {thisWeekCount}
            </div>
            <p className="text-sm text-gray-600">This Week</p>
          </CardBody>
        </Card>
      </div>

  

      {/* Recent Check-ins */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Recent Check-ins
        </h2>
        {checkIns.length === 0 ? (
          <Card>
            <CardBody>
              <EmptyState
                title="No Check-ins Yet"
                description="Submit your first weekly check-in to get started"
                action={{
                  label: "Submit Check-in",
                  href: "/employee/check-ins",
                }}
              />
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-3">
            {checkIns.slice(0,4).map((checkIn) => (
            
                <Card key={checkIn._id} hover>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {checkIn.projectName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {checkIn.progressSummary}
                        </p>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>Confidence: {checkIn.confidenceLevel}/5</span>
                          <span>Progress: {checkIn.completionPercentage}%</span>
                          <span>
                            {new Date(checkIn.timeStamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
       
            ))}
          </div>
        )}
      </div>

      {/* Open Risks */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Open Risks</h2>
        {openRisks.length === 0 ? (
          <Card>
            <CardBody className="text-center py-8">
              <p className="text-gray-600">No open risks ✓</p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-3">
            {openRisks.slice(0,4).map((risk) => (
              <Card key={risk._id} className="border-l-4 border-red-600">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {risk.title}
                        </h3>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            risk.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : risk.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {risk.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Project: {risk.projectName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created: {new Date(risk.timeStamp).toLocaleDateString()}
                      </p>
                    </div>
                   
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

    
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Recently Assigned Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects?.length > 0 ? (
            projects.slice(0,4).map((project) => (
              
                <Card key={project._id} hover>
                  <CardBody>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Start Date: {new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Client: {project.clientEmail || project.clientName}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Admin: {project.adminName}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      End Date: {new Date(project.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Team Size: {project.employeeList?.length || 0}
                    </p>
              
                  </CardBody>
                </Card>
            
            ))
          ) : (
            <Card>
              <CardBody className="text-center py-8">
                <EmptyState
                  title="No Projects Assigned"
                  description="No projects assigned to you yet"
                />
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
