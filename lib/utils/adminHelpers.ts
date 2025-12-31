
export const getRandomHealthScore = () => Math.floor(Math.random() * 100);

export const getRandomStatus = () => {
  const statuses = ["on_track", "at_risk", "critical"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};


 export const getActivityColor = (type: string) => {
    switch (type) {
      case "check_in": return "border-blue-300 bg-blue-50";
      case "feedback": return "border-green-300 bg-green-50";
      case "risk_created": return "border-red-300 bg-red-50";
      case "risk_updated": return "border-red-300 bg-red-50";
      case "project_created": return "border-purple-300 bg-purple-50";
      case "project_status_changed": return "border-yellow-300 bg-yellow-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  export const getActivityIcon = (type: string) => {
    switch (type) {
      case "check_in": return "📋";
      case "feedback": return "💬";
      case "risk_created": return "⚠️";
      case "risk_updated": return "🔄";
      case "project_created": return "✨";
      case "project_status_changed": return "📊";
      default: return "📝";
    }
  };

   export const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  export const validateForm = (formData:any,setErrors:any) => {
    const newErrors: Record<string, string> = {};
    console.log(formData)

    if (!formData.name?.trim()) newErrors.name = "Project name is required";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";

    if (!formData.clientEmail?.trim()) {
      newErrors.clientEmail = "Client email is required";
    } else if (!isValidEmail(formData.clientEmail)) {
      newErrors.clientEmail = "Enter a valid email address";
    }

    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) >= new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 export const validateEmployeeForm = (newEmployee:any,setErrors:any) => {
    const newErrors: Record<string, string> = {};

    if (!newEmployee.name?.trim()) {
      newErrors.name = "Employee name is required";
    }

    if (!newEmployee.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email)) {
      newErrors.email = "Invalid email";
    }

    if (newEmployee.assignedProjects?.length === 0) {
      newErrors.projects = "Assign at least one project";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  
  }