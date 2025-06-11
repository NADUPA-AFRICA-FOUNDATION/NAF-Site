"use client"
import { useForm, type SubmitHandler } from "react-hook-form"
import { TermsModal } from "./terms-modal"

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  motivation: string
  terms: boolean
}

export const VolunteerApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-stone-900">Personal Information</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-stone-700">
              First name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: true })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-stone-700">
              Last name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: true })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-stone-900">Contact Information</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              Email address <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
              {errors.email?.type === "pattern" && <span className="text-red-500 text-sm">Invalid email address</span>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
              Phone number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="address" className="block text-sm font-medium text-stone-700">
              Street address <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="address"
                {...register("address", { required: true })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium text-stone-700">
              City <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="city"
                {...register("city", { required: true })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.city && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="state" className="block text-sm font-medium text-stone-700">
              State / Province <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="state"
                {...register("state", { required: true })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.state && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="zip" className="block text-sm font-medium text-stone-700">
              ZIP / Postal code <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="zip"
                {...register("zip", { required: true })}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
              />
              {errors.zip && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="space-y-3">
        <label htmlFor="motivation" className="block text-sm font-medium text-stone-700">
          Why do you want to volunteer with us? <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <textarea
            id="motivation"
            rows={4}
            {...register("motivation", { required: true })}
            className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-stone-300 rounded-md"
          />
          {errors.motivation && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-stone-700">
            I agree to the{" "}
            <TermsModal>
              <button type="button" className="text-emerald-600 hover:text-emerald-700 underline font-medium">
                Terms and Conditions
              </button>
            </TermsModal>{" "}
            and understand the volunteer code of conduct <span className="text-red-500">*</span>
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Submit Application
        </button>
      </div>
    </form>
  )
}
