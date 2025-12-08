"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { MemberService } from "@/services/member/member.service";

type GenderType = "MALE" | "FEMALE" | "OTHER";

interface CreateMemberFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: GenderType;
  height: number;
  currentWeight: number;
  targetWeight: number;
  bloodGroup: string;
  emergencyContact: string;
  emergencyContactName: string;
  address: string;
  planId: string;
}

const CreateMemberPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMemberFormData>();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CreateMemberFormData) => {
    setServerError("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      formData.append("height", data.height.toString());
      formData.append("currentWeight", data.currentWeight.toString());
      formData.append("targetWeight", data.targetWeight.toString());
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("emergencyContact", data.emergencyContact);
      formData.append("emergencyContactName", data.emergencyContactName);
      formData.append("address", data.address);
      formData.append("planId", data.planId);

      const response = await MemberService.createMember(null, formData);

      if (response.success) {
  router.push(response?.redirectTo || "/dashboard/admin/members");
} else {
  setServerError(response.message || "Failed to create member");
}
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const membershipPlans = [
    { value: "1", label: "Basic Plan - $29/month" },
    { value: "2", label: "Premium Plan - $49/month" },
    { value: "3", label: "Elite Plan - $79/month" },
  ];

  return (
   <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/admin/members"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Member</h1>
          <p className="text-gray-600">
            Create a new member account and assign membership plan
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-center">{serverError}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter full name"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "name"
                        ? "border-red-600 bg-white"
                        : errors.name
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="member@example.com"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "email"
                        ? "border-red-600 bg-white"
                        : errors.email
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(\+880|0)?1[3-9]\d{8}$/,
                        message: "Invalid Bangladesh phone number",
                      },
                    })}
                    placeholder="+8801XXXXXXXXX or 01XXXXXXXXX"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "phone"
                        ? "border-red-600 bg-white"
                        : errors.phone
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="password">
                    Temporary Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    placeholder="Create temporary password"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "password"
                        ? "border-red-600 bg-white"
                        : errors.password
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    Member will be asked to change this on first login
                  </p>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="dateOfBirth">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "dateOfBirth"
                        ? "border-red-600 bg-white"
                        : errors.dateOfBirth
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("dateOfBirth")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="gender">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "gender"
                        ? "border-red-600 bg-white"
                        : errors.gender
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("gender")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="address">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    placeholder="Enter full address"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "address"
                        ? "border-red-600 bg-white"
                        : errors.address
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Physical Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Physical Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Height */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="height">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    id="height"
                    {...register("height", {
                      required: "Height is required",
                      min: {
                        value: 100,
                        message: "Height must be at least 100 cm",
                      },
                      max: {
                        value: 250,
                        message: "Height must be less than 250 cm",
                      },
                      valueAsNumber: true,
                    })}
                    placeholder="Enter height in cm"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "height"
                        ? "border-red-600 bg-white"
                        : errors.height
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("height")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.height && (
                    <p className="text-red-600 text-sm mt-1">{errors.height.message}</p>
                  )}
                </div>

                {/* Current Weight */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="currentWeight">
                    Current Weight (kg) *
                  </label>
                  <input
                    type="number"
                    id="currentWeight"
                    {...register("currentWeight", {
                      required: "Current weight is required",
                      min: {
                        value: 30,
                        message: "Weight must be at least 30 kg",
                      },
                      max: {
                        value: 300,
                        message: "Weight must be less than 300 kg",
                      },
                      valueAsNumber: true,
                    })}
                    placeholder="Enter current weight"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "currentWeight"
                        ? "border-red-600 bg-white"
                        : errors.currentWeight
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("currentWeight")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.currentWeight && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.currentWeight.message}
                    </p>
                  )}
                </div>

                {/* Target Weight */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="targetWeight">
                    Target Weight (kg) *
                  </label>
                  <input
                    type="number"
                    id="targetWeight"
                    {...register("targetWeight", {
                      required: "Target weight is required",
                      min: {
                        value: 30,
                        message: "Weight must be at least 30 kg",
                      },
                      max: {
                        value: 300,
                        message: "Weight must be less than 300 kg",
                      },
                      valueAsNumber: true,
                    })}
                    placeholder="Enter target weight"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "targetWeight"
                        ? "border-red-600 bg-white"
                        : errors.targetWeight
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("targetWeight")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.targetWeight && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.targetWeight.message}
                    </p>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="bloodGroup">
                    Blood Group *
                  </label>
                  <select
                    id="bloodGroup"
                    {...register("bloodGroup", {
                      required: "Blood group is required",
                    })}
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "bloodGroup"
                        ? "border-red-600 bg-white"
                        : errors.bloodGroup
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("bloodGroup")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <p className="text-red-600 text-sm mt-1">{errors.bloodGroup.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Emergency Contact Name */}
                <div>
                  <label
                    className="block text-gray-700 mb-2 text-sm font-medium"
                    htmlFor="emergencyContactName"
                  >
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    {...register("emergencyContactName", {
                      required: "Emergency contact name is required",
                    })}
                    placeholder="Enter contact name"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "emergencyContactName"
                        ? "border-red-600 bg-white"
                        : errors.emergencyContactName
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("emergencyContactName")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.emergencyContactName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.emergencyContactName.message}
                    </p>
                  )}
                </div>

                {/* Emergency Contact Number */}
                <div>
                  <label
                    className="block text-gray-700 mb-2 text-sm font-medium"
                    htmlFor="emergencyContact"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="text"
                    id="emergencyContact"
                    {...register("emergencyContact", {
                      required: "Emergency contact number is required",
                      pattern: {
                        value: /^(\+880|0)?1[3-9]\d{8}$/,
                        message: "Invalid Bangladesh phone number",
                      },
                    })}
                    placeholder="+8801XXXXXXXXX or 01XXXXXXXXX"
                    className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                      focusedField === "emergencyContact"
                        ? "border-red-600 bg-white"
                        : errors.emergencyContact
                        ? "border-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onFocus={() => setFocusedField("emergencyContact")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.emergencyContact && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.emergencyContact.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Membership Plan Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Membership Plan
              </h2>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium" htmlFor="planId">
                  Select Plan *
                </label>
                <select
                  id="planId"
                  {...register("planId", {
                    required: "Please select a membership plan",
                  })}
                  className={`w-full p-3 rounded-lg bg-gray-50 text-gray-900 border-2 outline-none transition-all ${
                    focusedField === "planId"
                      ? "border-red-600 bg-white"
                      : errors.planId
                      ? "border-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onFocus={() => setFocusedField("planId")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">Select a membership plan</option>
                  {membershipPlans.map((plan) => (
                    <option key={plan.value} value={plan.value}>
                      {plan.label}
                    </option>
                  ))}
                </select>
                {errors.planId && (
                  <p className="text-red-600 text-sm mt-1">{errors.planId.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isLoading ? "Creating Member..." : "Create Member"}
              </button>
              <Link
                href="/dashboard/admin/members"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition duration-300 text-center shadow-md hover:shadow-lg"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMemberPage;