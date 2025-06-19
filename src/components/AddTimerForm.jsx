import React, { useState } from "react";
import { useTimersContext } from "../hooks/TimersContext";

/**
 * AddTimerForm Component
 * 
 * Features:
 * - Name input field with validation
 * - Duration input (in seconds) with validation
 * - Category dropdown with common categories + custom option
 * - Form validation to prevent empty submissions
 * - Integration with TimersContext for state management
 * - Responsive design with dark mode support
 */
const AddTimerForm = ({ onSuccess }) => {
  const { addTimer, getCategories } = useTimersContext();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    category: ""
  });
  
  // Validation and UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  // Get existing categories plus common default categories
  const existingCategories = getCategories();
  const defaultCategories = ["Work", "Exercise", "Study", "Break", "Personal", "Cooking"];
  const allCategories = [...new Set([...defaultCategories, ...existingCategories])];

  /**
   * Handle input changes and clear related errors
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  /**
   * Handle category selection
   */
  const handleCategoryChange = (value) => {
    if (value === "custom") {
      setShowCustomCategory(true);
      setFormData(prev => ({ ...prev, category: "" }));
    } else {
      setShowCustomCategory(false);
      setCustomCategory("");
      handleInputChange("category", value);
    }
  };

  /**
   * Validate form fields
   * Returns object with field errors or empty object if valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Timer name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Timer name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Timer name must be less than 50 characters";
    }

    // Duration validation
    const duration = parseInt(formData.duration);
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    } else if (isNaN(duration)) {
      newErrors.duration = "Duration must be a valid number";
    } else if (duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    } else if (duration > 86400) { // 24 hours max
      newErrors.duration = "Duration cannot exceed 24 hours (86400 seconds)";
    }

    // Category validation
    const finalCategory = showCustomCategory ? customCategory.trim() : formData.category;
    if (!finalCategory) {
      newErrors.category = "Category is required";
    } else if (finalCategory.length < 2) {
      newErrors.category = "Category must be at least 2 characters";
    } else if (finalCategory.length > 30) {
      newErrors.category = "Category must be less than 30 characters";
    }

    return newErrors;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare timer data
      const finalCategory = showCustomCategory ? customCategory.trim() : formData.category;
      const timerData = {
        name: formData.name.trim(),
        duration: parseInt(formData.duration),
        category: finalCategory
      };

      // Add timer through context
      const newTimer = addTimer(timerData);
      
      // Reset form on success
      setFormData({ name: "", duration: "", category: "" });
      setCustomCategory("");
      setShowCustomCategory(false);
      setErrors({});
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(newTimer);
      }
      
      // Show success message (you could replace this with a toast notification)
      alert(`✅ Timer "${timerData.name}" created successfully!`);
      
    } catch (error) {
      console.error("Error creating timer:", error);
      setErrors({ submit: "Failed to create timer. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Format duration for display (converts seconds to readable format)
   */
  const formatDurationHint = (seconds) => {
    if (!seconds || isNaN(seconds)) return "";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ⏱️ Create New Timer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set up a new timer with custom duration and category
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Timer Name Field */}
        <div>
          <label 
            htmlFor="timer-name" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Timer Name *
          </label>
          <input
            id="timer-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g., Morning Workout, Study Session, Coffee Break"
            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-gray-600"
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              ⚠️ {errors.name}
            </p>
          )}
        </div>

        {/* Duration Field */}
        <div>
          <label 
            htmlFor="timer-duration" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Duration (seconds) *
          </label>
          <input
            id="timer-duration"
            type="number"
            min="1"
            max="86400"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            placeholder="e.g., 300 (5 minutes), 1800 (30 minutes)"
            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.duration 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-gray-600"
            }`}
            disabled={isSubmitting}
          />
          {/* Duration hint */}
          {formData.duration && !errors.duration && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              ⏰ Duration: {formatDurationHint(parseInt(formData.duration))}
            </p>
          )}
          {errors.duration && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              ⚠️ {errors.duration}
            </p>
          )}
          
          {/* Quick duration buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Quick select:</span>
            {[
              { label: "5 min", value: 300 },
              { label: "10 min", value: 600 },
              { label: "15 min", value: 900 },
              { label: "30 min", value: 1800 },
              { label: "1 hour", value: 3600 }
            ].map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleInputChange("duration", value.toString())}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                disabled={isSubmitting}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Field */}
        <div>
          <label 
            htmlFor="timer-category" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Category *
          </label>
          
          {!showCustomCategory ? (
            <select
              id="timer-category"
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category 
                  ? "border-red-500 dark:border-red-400" 
                  : "border-gray-300 dark:border-gray-600"
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {allCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="custom">+ Create new category</option>
            </select>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter new category name"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category 
                    ? "border-red-500 dark:border-red-400" 
                    : "border-gray-300 dark:border-gray-600"
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => {
                  setShowCustomCategory(false);
                  setCustomCategory("");
                  handleInputChange("category", "");
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                disabled={isSubmitting}
              >
                ← Back to category list
              </button>
            </div>
          )}
          
          {errors.category && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              ⚠️ {errors.category}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              ❌ {errors.submit}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Creating Timer...</span>
              </>
            ) : (
              <>
                <span>⏱️</span>
                <span>Create Timer</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Form Tips */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          💡 Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• Use descriptive names to easily identify your timers</li>
          <li>• Group related timers using the same category</li>
          <li>• Duration is in seconds (60 = 1 minute, 3600 = 1 hour)</li>
          <li>• You can create custom categories for better organization</li>
        </ul>
      </div>
    </div>
  );
};

export default AddTimerForm;