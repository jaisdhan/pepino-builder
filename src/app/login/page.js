"use client"; // Ensures React hooks work correctly

import { useState } from "react";

export default function LoginPage() {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [forgottenPassword, setForgottenPassword] = useState(false);

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      {/* Login Card Container */}
      <div id="login-card-con" className="mx-auto my-auto w-full max-w-sm">
        {/* Login Card */}
        <div
          id="login-card"
          className="border border-gray-300 rounded-lg shadow-md p-6 w-full"
        >
          {/* Your content goes here */}
          <h2 className="text-center text-xl font-semibold test-bg ">Login</h2>
          {/* Add more content here, such as the form */}
        </div>
      </div>
    </div>
  );
}
