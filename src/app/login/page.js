"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        // brief success state, then navigate
        setTimeout(() => router.push("/dashboard"), 900);
      } else {
        setErrors({ submit: "Invalid credentials" });
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border-2 border-green-200">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Login successful</h2>
            <p className="text-sm text-slate-600 mt-2">Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
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
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Error Alert */}
          {errors.submit && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.email ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter email"
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
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
                className="rounded border-slate-300"
              />
              Remember this Device
            </label>

         
          </div>

          {/* Button */}
          <button
            onClick={submit}
            disabled={isSubmitting || !form.email || !form.password}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-md transition shadow disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          New to Modernize?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
