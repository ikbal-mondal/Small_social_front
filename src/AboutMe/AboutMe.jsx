import { useQuery } from "react-query";
import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Contexts/UserContext";

const AboutMe = () => {
  const { user } = useContext(AuthContext);

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/get-single-user?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const university = form.university.value;

    const data = {
      name,
      address,
      university,
    };

    fetch(`http://localhost:5000/updated-user/${userData?._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch()
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      {/*  */}

      <div className="pt-24">
        <section className="p-6 bg-base-200 text-gray-50">
          <form
            onSubmit={handleSubmitForm}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-600">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Personal Inormation</p>
                <p className="text-xs">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Adipisci fuga autem eum!
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label className="text-sm">Name:</label>
                  <input
                    id="firstname"
                    type="text"
                    name="name"
                    placeholder={`${userData?.name}`}
                    className="w-full rounded-md focus:ring py-3 px-2 focus:ri focus:ri border-gray-700 text-gray-900"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label className="text-sm">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder={`${userData?.address}}`}
                    className="w-full rounded-md focus:ring py-3 px-2 focus:ri focus:ri border-gray-700 text-gray-900"
                  />
                </div>

                <div className="col-span-full">
                  <label className="text-sm">university</label>
                  <input
                    id="university"
                    name="university"
                    type="text"
                    placeholder={userData?.university}
                    className="w-full rounded-md focus:ring py-3 px-2 focus:ri focus:ri border-gray-700 text-gray-900"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label className="text-sm">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={userData?.email}
                    disabled
                    className="w-full rounded-md focus:ring py-3 px-2 focus:ri focus:ri border-gray-700 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <button className="btn btn-info my-5" type="submit">
                  update info
                </button>
              </div>
            </fieldset>
          </form>
        </section>
      </div>
      {/*  */}
      <Footer></Footer>
    </div>
  );
};

export default AboutMe;
