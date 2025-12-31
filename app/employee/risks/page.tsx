"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  LoadingPage,
  EmptyState,
} from "@/app/components";
import Link from "next/link";
import { createRisk, fetchRisk, solveRisk } from "@/lib/utils/api";
import { SkeletonList } from "@/app/components/skeleton";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";


export default function RisksPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [risks,setRisks]=useState([]);

  
  useProtectedRoute(setUser,{employeeRisks:true,setRisks},"employee",setIsLoading)
  if (isLoading) return <SkeletonList></SkeletonList>
  if (!user) return null;
const openRisks = risks.filter((r: any) => !r.solved);
const resolvedRisks = risks.filter((r: any) => r.solved);

const markAsSolved = async (riskId: string) => {

  
  const res=await solveRisk(riskId)
  if(res.ok){
        setRisks((prevRisks) =>
    prevRisks.map((risk) => 
      risk._id === riskId || risk.id === riskId
        ? { ...risk, solved: true }  
        : risk
    )
  );
  }
};



  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Risk Management</h1>
        <p className="text-gray-600 text-lg">
          Track and manage project risks
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {openRisks.filter((r) => r.severity === "high").length}
            </div>
            <p className="text-sm text-gray-600">High Severity</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {resolvedRisks.length}
            </div>
            <p className="text-sm text-gray-600">Resolved</p>
          </CardBody>
        </Card>
      </div>

      {/* New Risk Button */}
      <div className="mb-8">
        <Link href="/employee/risks/new">
          <Button>+ Report New Risk</Button>
        </Link>
      </div>

      {/* Open Risks */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Risks</h2>
        {openRisks.length === 0 ? (
          <Card>
            <CardBody>
              <EmptyState
                title="No Open Risks"
                description="Great! All identified risks have been resolved"
              />
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-3">
            {openRisks.map((risk) => (
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
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {risk.severity.toUpperCase()}
                        </span>
                      </div>
                         <p className="text-sm text-gray-600 mb-2">
                        {risk.description}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Project: {risk.projectName}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Mitigation:</strong> {risk.mitigationPlan}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created: {new Date(risk.timeStamp).toLocaleDateString()}
                      </p>
                    </div>
                 <div className="flex items-center gap-2">
  {/* Cute Solved Toggle */}
  {!risk.solved ? (
    <Button 
      size="sm" 
     
      className="border-gray-300 hover:border-green-500 hover:bg-green-50 text-green-700 hover:text-green-800 px-3 py-1 text-xs font-medium flex items-center gap-1 transition-all"
       onClick={() => markAsSolved(risk._id)}
    >
    
      <span>Solved</span>
        <span className="text-lg">?</span>
    </Button>
  ) : (
    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-medium">
      <span className="text-xl">✅</span>
      <span>SOLVED</span>
    </div>
  )}
  

</div>

                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Risks */}
  
      {/* Resolved Risks */}
      {resolvedRisks.length > 0 && (
        <div className="space-y-3 mt-6">
          {resolvedRisks.map((risk) => (
            <Card key={risk._id} className="border-l-4 border-green-600 opacity-70">
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 line-through">{risk.title}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        RESOLVED
                      </span>
                    </div>    <div className="flex items-center gap-2 mb-1">
                           <p className="text-sm text-gray-600 mb-2">
                        {risk.description}
                      </p>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            risk.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : risk.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {risk.severity.toUpperCase()}
                        </span>
                      </div>
                    <p className="text-sm text-gray-600">Project: {risk.projectName}</p>
                            <p className="text-sm text-gray-700 mb-2">
                        <strong>Mitigation:</strong> {risk.mitigationPlan}
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
  );
}
