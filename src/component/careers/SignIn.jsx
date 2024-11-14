import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignInForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-50 shadow-md rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign In
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.password && touched.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-white bg-gray-800 hover:bg-gray-900 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                >
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
