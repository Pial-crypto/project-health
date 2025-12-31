"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Select,
  Button,
  Alert,
} from "@/app/components";

import { createRisk } from "@/lib/utils/api";
import { SkeletonList } from "@/app/components/skeleton";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { validateRiskForm } from "@/lib/utils/employeeHelpers";
import { createRiskHook, initialRiskHook } from "@/lib/hooks/employee";

export default function NewRiskPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
// if(isLoading){
//   return <SkeletonList></SkeletonList>
// }
  const [formData, setFormData] = useState({
    projectId: "",
    title: "",
    severity: "medium",
    description: "",
    mitigationPlan: "",
  });

  
useProtectedRoute(setUser,{createRisk:true,setProjects},"employee",setIsLoading)
initialRiskHook(projects,formData,setFormData)

  if (isLoading) return <SkeletonList></SkeletonList> 
  if (!user) return null;


  const projectOptions = projects.map((p) => ({
    value: p._id,
    label: p.name,
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRiskForm(formData,setErrors)) return;

    setIsSubmitting(true);

    createRiskHook(formData,projects,router,user,setErrors,setIsSubmitting)


  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/employee/risks"
          className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block"
        >
          ← Back to Risks
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Report New Risk
        </h1>
        <p className="text-gray-600">
          Identify and document potential project risks
        </p>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-6">
            {errors.submit && (
              <Alert type="error" message={errors.submit} />
            )}

            <Select
              label="Project"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              options={projectOptions}
              error={errors.projectId}
            />

            <Input
              label="Risk Title"
              name="title"
              placeholder="e.g., Server Downtime, Resource Shortage"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />

       <Textarea
  name="description"         
  label="Description *"
  placeholder="Risk description..."
  value={formData.description}
  onChange={handleChange}      // ✅ Required
  error={errors.description}   
/>

            <Select
              label="Severity Level"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              options={[
                { value: "low", label: "Low - Minor impact" },
                { value: "medium", label: "Medium - Moderate impact" },
                { value: "high", label: "High - Critical impact" },
              ]}
            />

            <Textarea
              label="Mitigation Plan"
              name="mitigationPlan"
              rows={4}
              value={formData.mitigationPlan}
              onChange={handleChange}
              error={errors.mitigationPlan}
            />

            <Alert
              type="info"
              message="High-severity risks will be escalated to project managers and clients."
            />
          </CardBody>

          <CardFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Report Risk
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
