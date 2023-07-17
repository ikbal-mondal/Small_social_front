import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/UserContext";
import axios from "axios";

const Home = () => {
  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateAccount = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.log("Create auth error", error);
      });
  };

  return (
    <div className="pt-12 mb-9 container mx-auto">
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-base-200 bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            {user?.email ? (
              <>
                <h1 className="text-5xl font-semibold text-center">
                  Welcome To Small Social App
                </h1>
                <p className="text-lg mx-12 mt-5">
                  We re delighted to have you join our community! Whether you re
                  a seasoned social media enthusiast or a newbie exploring the
                  world of online connections, we ve created Small Social App
                  with you in mind. Here, you'll find a safe and friendly space
                  to connect with friends, family, and new acquaintances. Share
                  your thoughts, photos, and experiences, and explore the
                  diverse perspectives of our vibrant user base.
                  <p className="my-4">
                    At Small Social App, we believe in building meaningful
                    relationships and fostering a positive environment. Be kind,
                    respectful, and supportive of one another, and together,
                    we'll create a space that encourages open dialogue and
                    meaningful connections.
                  </p>
                </p>
                <div className="text-center my-24">
                  <Link to="/createpost">
                    <button className=" text-slate-100 btn btn-accent">
                      {" "}
                      <i className="fa-solid mr-2 fa-square-plus text-2xl"></i>
                      Create A Post
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none">
                    The quick, brown fox <br className="hidden md:block" />
                    jumps over a
                    <span className="text-teal-accent-400">lazy dog</span>
                  </h2>
                  <p className="max-w-xl mb-4 text-base text-blue-800  md:text-lg">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudan, totam rem aperiam,
                    eaque ipsa quae.
                  </p>

                  <Link to="/login">
                    <button className="btn text-white  btn-info rounded-2xl w-full text-xl">
                      Get Start
                    </button>
                  </Link>
                </div>
                <div className="w-full max-w-xl xl:px-6 xl:w-5/12">
                  <div className="bg-white rounded shadow-3xl p-4 sm:p-10">
                    <h3 className="mb-4 text-2xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                      Create a Account
                    </h3>
                    <form
                      onSubmit={handleSubmit(handleCreateAccount)}
                      className="card   w-full max-w-xl "
                    >
                      <div className="card-body">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Full Name:</span>
                          </label>
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            className="input input-bordered py-3"
                            placeholder="Enter Full Name"
                          />
                          {errors.name && (
                            <p className="text-red-600">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">
                              University/(College) Name:
                            </span>
                          </label>
                          <input
                            type="text"
                            {...register("university", {
                              required: "University/(College) Name is required",
                            })}
                            className="input input-bordered py-3"
                            placeholder="Enter  University or College Name"
                          />
                          {errors.university && (
                            <p className="text-red-600">
                              {errors.university.message}
                            </p>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">
                              Address (city/state):
                            </span>
                          </label>
                          <input
                            type="text"
                            {...register("address", {
                              required: "Address (city/state) is required",
                            })}
                            className="input input-bordered py-3"
                            placeholder="Enter  Address (city or state) "
                          />
                          {errors.address && (
                            <p className="text-red-600">
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Email:</span>
                          </label>
                          <input
                            type="email"
                            {...register("email", {
                              required: "Email is required",
                            })}
                            className="input input-bordered py-3"
                            placeholder="Enter Email"
                          />
                          {errors.name && (
                            <p className="text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Password:</span>
                          </label>
                          <input
                            type="password"
                            {...register("password", {
                              required: "Password is required",
                            })}
                            className="input input-bordered py-3"
                            placeholder="Enter Password"
                          />
                          {errors.name && (
                            <p className="text-red-600">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        <div className="form-control mt-6">
                          <button type="submit" className="btn btn-info">
                            Create Account
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 ">
                          You have a already account:
                          <Link className="underline text-cyan-600" to="/login">
                            Login Now
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
