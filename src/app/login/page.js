export default function LoginPage() {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <img src="/images/logo.svg" className="w-32 mx-auto mb-4" alt="Logo" />
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
            ¡Qué alegría tenerte de vuelta!
          </h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  }
  