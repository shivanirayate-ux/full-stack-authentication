"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    // First Name
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Mobile
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }

    // (No separate "name" field required — using first/last name fields)

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    return newErrors;
  };

  const submit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
        }),
      });

      if (res.ok) {
        alert("Registered successfully! Redirecting to login...");
        router.push("/login");
      } else {
        const data = await res.json();
        setErrors({ submit: data.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/logo%20(1).png"
              alt="Logo"
              width={80}
              height={100}
              className="object-cover rounded-lg"
            />
          </div>
          {/* <h1 className="text-2xl font-bold text-slate-800">Digital Marketing Studio Genix</h1> */}
          <p className="text-sm text-slate-500 mt-1">
            Digital Marketing StudioGenix LLP
          </p>
        </div>{" "}
        {/* Form */}
        <div className="space-y-4">
          {/* Error Alert */}
          {errors.submit && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              First Name
            </label>
            {/* <input
   type="text"
     className="mt-1 w-full rounded-md border px-3 py-2 text-black"
    value={form.firstName}
    onChange={(e) => handleInputChange("firstName", e.target.value)}
  />
  {errors.firstName && (
    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
  )} */}

            <input
              type="text"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.firstName ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your First Name"
              value={form.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Last Name
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.lastName ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your Last Name"
              value={form.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Mobile Number
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.mobile ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your Mobile Number"
              value={form.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
            )}
          </div>
          {/* 
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.name ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div> */}

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.email ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.password ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Password must contain at least 6 characters, 1 uppercase letter,
              and 1 number
            </p>
          </div>

          <button
            onClick={submit}
            disabled={
              isSubmitting ||
              !form.firstName.trim() ||
              !form.lastName.trim() ||
              !form.mobile.trim() ||
              !form.email.trim() ||
              !form.password
            }
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-md transition disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an Account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
