"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Alert,
} from "@/app/components";
import Link from "next/link";
import { username } from "@/lib/utils/name";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { validateForm } from "@/lib/utils/adminHelpers";
import { SkeletonList } from "@/app/components/skeleton";
import { createProjectHook } from "@/lib/hooks/project";

export default function NewProjectPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  useProtectedRoute(setUser,{newProject:true},"admin",setIsLoading)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientEmail: "",
 
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (isLoading) return <SkeletonList></SkeletonList>
  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData,setErrors)) return;

    setIsSubmitting(true);
createProjectHook(formData,user,username,setShowSuccess,setIsSubmitting,router)

  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="text-blue-600 hover:text-blue-800 inline-block mb-4"
        >
          ← Back to Projects
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create New Project
        </h1>
        <p className="text-gray-600 text-lg">
          Setup a new project — add employees later
        </p>
      </div>

      <Card className="max-w-3xl">
        <CardBody>
          {showSuccess && (
            <Alert
              type="success"
              title="Success!"
              message="Project created successfully"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Project Details
              </h2>

              <div className="space-y-4">
                <Input
                  label="Project Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <Textarea
                  label="Description *"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                />

                {/*  CLIENT EMAIL INPUT */}
                <Input
                  label="Client Email *"
                  name="clientEmail"
                  type="email"
                  placeholder="client@company.com"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  error={errors.clientEmail}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date *"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    error={errors.startDate}
                  />

                  <Input
                    label="End Date *"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    error={errors.endDate}
                  />
                </div>
              </div>
            </div>

              <h2 className="text-xl font-semibold mb-4"/>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Project"}
              </Button>

              <Link href="/admin/projects">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
