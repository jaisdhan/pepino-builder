"use client"; // Ensures React hooks work correctly

import { useState } from "react";

export default function LoginPage() {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [forgottenPassword, setForgottenPassword] = useState(false);

  return (
    <div
      id="g-con"
      className="bg-blue-500 h-screen flex items-center justify-center"
    >
      <div id="login-card-con" className="mx-auto my-auto">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-gray-300">
          {/* Logo */}
          <div className="mb-6 text-center">
            <img
              id="logo"
              src="/images/logo/logo.svg"
              alt="Logo"
              className="mx-auto w-32 h-auto"
            />
          </div>

          {/* Welcome Message */}
          <div className="mt-4 text-center">
            <h6 className="text-lg text-gray-700">
              ¡Qué alegría tenerte de vuelta!
            </h6>
          </div>

          {/* Login Form */}
          <div className="mt-5">
            <form id="loginForm" className="space-y-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={isHiddenPassword ? "password" : "text"}
                  placeholder="Contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                >
                  <span className="material-icons">
                    {isHiddenPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-3 text-center">
            <a
              href="#"
              onClick={() => setForgottenPassword(!forgottenPassword)}
              className="text-blue-500 text-sm"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          {/* Forgotten Password Message */}
          {forgottenPassword && (
            <div className="mt-3 text-sm text-gray-600">
              <p>
                Esta función no está disponible todavía.
                <br />
                Si has olvidado tu contraseña, envíanos un correo a{" "}
                <a
                  href="mailto:devops@thepepinobrand.com"
                  className="text-blue-500"
                >
                  devops@thepepinobrand.com
                </a>{" "}
                indicando cual es el usuario o email con el que intentas
                acceder.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
