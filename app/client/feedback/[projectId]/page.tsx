"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createFeedback } from "@/lib/utils/api";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";


export default function FeedbackPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
//console.log("Search Params:", searchParams.get("name"),searchParams.get("id"));
const project={
  id: searchParams.get("id"),
  name: searchParams.get("name"),
}

useProtectedRoute(setUser,{},"client",setIsLoading)
  const [formData, setFormData] = useState({
    satisfactionRating: "0",
    communicationClarity: "0",
    comments: "",
    flaggedIssue: false,
    issueDescription: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.satisfactionRating)
      newErrors.satisfactionRating = "Please rate your satisfaction";
    if (!formData.communicationClarity)
      newErrors.communicationClarity = "Please rate communication clarity";
    if (formData.flaggedIssue && !formData.issueDescription.trim()) {
      newErrors.issueDescription = "Please describe the issue you're flagging";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const response = await createFeedback({...formData,comment:formData.comments,projectId:project.id,clientId:user.id});
      if (response.ok) {
        router.push("/client");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit feedback");
      }

    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "Failed to submit feedback",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/client" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Feedback</h1>
        <p className="text-gray-600">{project.name}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Week of {new Date().toLocaleDateString()}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Share your experience with the project team
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {errors.submit && (
              <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{errors.submit}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How satisfied are you with the project progress?
              </label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="cursor-pointer">
                    <input
                      type="radio"
                      name="satisfactionRating"
                      value={rating}
                      checked={parseInt(formData.satisfactionRating) === rating}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-3xl transition-transform hover:scale-110 block">
                      {parseInt(formData.satisfactionRating) >= rating ? (
                        <span className="text-yellow-400">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
              {errors.satisfactionRating && (
                <p className="text-red-500 text-sm mt-2">{errors.satisfactionRating}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How clear is the team's communication?
              </label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="cursor-pointer">
                    <input
                      type="radio"
                      name="communicationClarity"
                      value={rating}
                      checked={parseInt(formData.communicationClarity) === rating}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-3xl transition-transform hover:scale-110 block">
                      {parseInt(formData.communicationClarity) >= rating ? (
                        <span className="text-blue-400">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
              {errors.communicationClarity && (
                <p className="text-red-500 text-sm mt-2">{errors.communicationClarity}</p>
              )}
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={3}
                placeholder="Any feedback for the team?"
                value={formData.comments}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  name="flaggedIssue"
                  checked={formData.flaggedIssue}
                  onChange={handleChange}
                  className="mt-1 rounded"
                />
                <div>
                  <p className="font-medium text-gray-900">Flag an Issue</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Is there something we should know about?
                  </p>
                </div>
              </label>
              {formData.flaggedIssue && (
                <div>
                  <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Description
                  </label>
                  <textarea
                    id="issueDescription"
                    name="issueDescription"
                    rows={4}
                    placeholder="Please describe the issue in detail"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.issueDescription ? "border-red-500" : ""
                    }`}
                  />
                  {errors.issueDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.issueDescription}</p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm">
              Your feedback helps the team track project health and address concerns early.
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
