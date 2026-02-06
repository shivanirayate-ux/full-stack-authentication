"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
        const userData = await res.json();
        setUser(userData);
        setForm({
          firstName: userData.firstName || userData.first_name || "",
          lastName: userData.lastName || userData.last_name || "",
          email: userData.email,
          password: "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
       if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation (only if provided)
    if (form.password) {
      if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    return newErrors;
  };

  const updateProfile = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
          email: form.email,
          ...(form.password && { password: form.password }),
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data.message || "Failed to update" });
        return;
      }

      // Update local state
      setUser({ ...user, firstName: form.firstName, lastName: form.lastName, email: form.email });
      setForm({ ...form, password: "" });
      // Redirect to login after successful update
      router.push("/login");
    } catch (err) {
      setErrors({ submit: err.message || "An error occurred" });
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h2>

        {/* Error Alert */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              First Name
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.firstName ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Last Name
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.lastName ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
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

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              New Password (Leave empty to keep current)
            </label>
            <input
              type="password"
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.password ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter new password"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Password must be at least 6 characters (leave empty to keep current password)
            </p>
          </div>

          {/* Update Button */}
          <button
            onClick={updateProfile}
            disabled={isSubmitting || !form.firstName || !form.email}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-md transition disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>

        {/* Current Info */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            <strong>Current Email:</strong> {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
