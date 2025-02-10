const Login = () => {
  <div className="modal fade" id="loginPopupModal">
    <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
      <div className="modal-content bg-white rounded-lg shadow-lg">
        <button
          type="button"
          className="closed-modal absolute top-0 right-0 p-4 text-gray-600 hover:text-gray-800"
          data-bs-dismiss="modal"
        >
          <span className="sr-only">Close</span>
          &times;
        </button>

        {/* Modal Body */}
        <div className="modal-body p-6">
          {/* Login modal */}
          <div id="login-modal">
            {/* Login Form */}
            <div className="login-form default-form">
              <div className="form-inner space-y-6">
                <h3 className="text-2xl font-semibold">Login to Superio</h3>

                {/* Login Form */}
                <form method="post" className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="username" className="text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label htmlFor="password" className="text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="form-group flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="remember-me"
                        id="remember"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Log In Button */}
                  <div className="form-group">
                    <button
                      className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="submit"
                      name="log-in"
                    >
                      Log In
                    </button>
                  </div>
                </form>
                {/* End form */}
              </div>
            </div>
            {/* End Login Form */}
          </div>
          {/* End Login Module */}
        </div>
        {/* End modal-body */}
      </div>
      {/* End modal-content */}
    </div>
  </div>;
};

export default Login;
