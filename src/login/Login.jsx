import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { AuthContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, googleSingIn } = useContext(AuthContext);

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
        //  setLoginUserEmail(data.email)
      })
      .catch((error) => {
        console.log(error.message);
        // setLoginError(error.message)
      });
  };

  const handleGoogleSigIn = () => {
    googleSingIn()
      .then((result) => {
        const user = result.user
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        // navigate("/errorPage");
      });
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="grid lg:grid-cols-2 gap-6 py-24 container mx-auto">
        <div className="">
          <img src="https://www.brevistay.com/images/Group9473.png" alt="" />
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-md shadow-md border-2 "
        >
          <div className="flex items-center mt-2 -mx-2">
            <button
              onClick={handleGoogleSigIn}
              type="button"
              className="flex items-center justify-center w-full px-6 py-3 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
            >
              <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="hidden mx-2 sm:inline uppercase">
                {" "}
                Continue with Google
              </span>
            </button>
          </div>

          <div className="divider">OR</div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />

            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
            {/* {loginError && <p className='text-red-700'>{loginError}</p>} */}
          </div>
          <input
            className="btn btn-info text-white w-full"
            value="Login"
            type="submit"
          />
          <p className="  mt-1 font-light text-start text-gray-500 text-sm">
            New to Small social
            <Link
              to="/"
              className="font-medium text-cyan-600 dark:text-gray-200 hover:underline text-sm"
            >
              Create New Account
            </Link>
          </p>
          <div className="flex items-center justify-between mt-2"></div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
