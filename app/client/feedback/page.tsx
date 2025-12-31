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
import { fetchFeedback, fetchProjects } from "@/lib/utils/api";
import { AlertTriangle, CalendarDays, Star } from "lucide-react";
import { SkeletonList } from "@/app/components/skeleton";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";

export default function FeedbackList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);


  useProtectedRoute(setUser,{clientFeedback:true,setProjects,setFeedbacks},"client",setIsLoading)

  if (isLoading) return <SkeletonList></SkeletonList>
  if (!user) return null;


  return (
    <div className="container mx-auto px-4 py-8">
      {/* header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Keep Updated
        </h1>
        <p className="text-gray-600 text-lg">
          Share your feedback on project progress and team communication.
        </p>
      </div>

      {/* content */}
      {projects.length === 0 ? (
        <Card className="rounded-xl border border-gray-200 shadow-sm">
          <CardBody className="p-8">
            <EmptyState
              title="No projects available"
              description="You currently have no active projects to give feedback on."
            />
          </CardBody>
        </Card>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Submit Feedback
          </h2>
          <div className="space-y-3">
            {projects.map((project: any) => (
              <div key={project._id}>
           <Link key={project._id}
  href={{
    pathname: `/client/feedback/${project._id}`,
    query:{name:project.name,id:project._id},

  }}
>
                <Card className="hover:shadow-md transition-shadow cursor-pointer rounded-xl border border-gray-200">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                      <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                        New Feedback
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Link>
              <div className="h-2" />
              </div>
            ))}
          </div>
        </div>
      )}

<div className="h-2"></div>
<div className="h-2"></div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Feedbacks History</h2>
        {feedbacks.length === 0 ? (
          <Card>
            <CardBody>
              <EmptyState
                title="No Feedback Yet"
                description="Submit your first weekly feedback"
              />
            </CardBody>
          </Card>
        ) : (
          feedbacks.map((feedback) => (
            <Card key={feedback._id} className="mb-3 shadow-sm">
       

<CardBody className="space-y-3">

  <div className="flex items-start justify-between gap-3">
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500">

      </div>
      <div>
        <h3 className="font-semibold text-gray-900">
          {projects.find((p) => p._id === feedback.projectId)?.name ||
            "Unknown project"}
        </h3>
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="h-3 w-3" />
          {new Date(feedback.timeStamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>

  {/* Comment */}
  <p className="text-sm text-gray-700">
    {feedback.comment || "No comment provided."}
  </p>

  {/* Ratings */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
        <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
        Satisfaction
      </span>
      <span className="font-medium text-gray-900">
        {feedback.satisfactionRating}/5
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
        <Star className="h-3 w-3 fill-indigo-400 text-indigo-400" />
        Communication
      </span>
      <span className="font-medium text-gray-900">
        {feedback.communicationClarity}/5
      </span>
    </div>
  </div>

  {/* Issue section */}
  <div className="mt-1">
    <p className="text-xs font-semibold text-gray-500 mb-1">
      Reported Issue
    </p>
    {feedback.issueDescription ? (
      <div className="flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 border border-amber-200">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        <span>{feedback.issueDescription}</span>
      </div>
    ) : (
      <p className="text-xs text-gray-500">No issue reported.</p>
    )}
  </div>
</CardBody>

            </Card>
          ))
        )}
      </div>
    </div>
  );
}
