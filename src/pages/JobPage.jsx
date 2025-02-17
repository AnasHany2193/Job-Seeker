import { toast } from "react-toastify";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useLoaderData, Link, useNavigate } from "react-router-dom";

const JobPage = ({ deleteJob }) => {
  const job = useLoaderData();
  const navigate = useNavigate();

  const onDeleteClick = (JobId) => {
    const confirm = window.confirm("Are You Sure?");

    if (!confirm) return;

    deleteJob(JobId);
    toast.success("Job Deleted Successfully 💥");
    navigate("/jobs");
  };

  return (
    <>
      <section>
        <div className="container px-6 py-6 m-auto">
          <Link
            to="/"
            className="flex items-center text-indigo-500 hover:text-indigo-600"
          >
            <FaArrowLeft className="mr-2" />
            Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container px-6 py-10 m-auto">
          <div className="grid w-full grid-cols-1 gap-6 md:[grid-template-columns:2fr_1fr]">
            <main>
              <div className="p-6 text-center bg-white rounded-lg shadow-md md:text-left">
                <div className="mb-4 text-gray-500">{job.type}</div>
                <h1 className="mb-4 text-3xl font-bold">{job.title}</h1>
                <div className="flex justify-center mb-4 text-gray-500 align-middle md:justify-start">
                  <FaMapMarker className="mr-1 text-orange-700 " />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-6 text-lg font-bold text-indigo-800">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="mb-2 text-lg font-bold text-indigo-800">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-6 text-xl font-bold">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="p-2 my-2 font-bold bg-indigo-100">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="p-2 my-2 font-bold bg-indigo-100">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-6 text-xl font-bold">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="block w-full px-4 py-2 mt-4 font-bold text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="block w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
