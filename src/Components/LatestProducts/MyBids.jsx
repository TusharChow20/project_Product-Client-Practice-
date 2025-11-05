import React, { use, useEffect, useState } from "react";
// import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { Trash2 } from "lucide-react";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [error, setError] = useState("");
  //   console.log(user.accessToken);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bidToDelete, setBidToDelete] = useState(null);
  useEffect(() => {
    console.log(user.email);

    fetch(
      `https://deal-product-server.vercel.app/BidData?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array
        setBids(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [user]);

  const handleDeleteBid = (id, bidEmail) => {
    if (!user) {
      alert("Please log in to delete bids");
      return;
    }

    if (user.email !== bidEmail) {
      alert("You can only delete your own bids");
      return;
    }

    setBidToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`https://deal-product-server.vercel.app/BidData/${bidToDelete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Bid deleted successfully!");
          setBids(bids.filter((bid) => bid._id !== bidToDelete));
          setIsDeleteModalOpen(false);
          setBidToDelete(null);
        } else {
          alert("Failed to delete bid.");
        }
      })
      .catch((error) => {
        console.error("Error deleting bid:", error);
        alert("An error occurred while deleting the bid.");
      });
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBidToDelete(null);
  };
  return (
    <div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Bid
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this bid? This action cannot be
              undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <h1 className="text-2xl font-bold mb-4">
          Bids For This Product: {bids.length}
        </h1>
        <div className="overflow-x-auto">
          {loading && (
            <div className="text-center py-8">Loading your bids...</div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600">Error: {error}</div>
          )}

          {!loading && !error && bids.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              You haven't placed any bids yet.
            </div>
          )}
          {!loading && !error && bids.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Buyer Info</th>
                    <th>Bid Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid, index) => (
                    <tr key={bid._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={
                                  bid.buyer_image ||
                                  "https://img.daisyui.com/images/profile/demo/2@94.webp"
                                }
                                alt={bid.buyer_name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{bid.buyer_name}</div>
                            <div className="text-sm opacity-50">
                              {bid.buyer_email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold">{bid.bid_price} tk</td>
                      <td>
                        <span className="badge badge-ghost">{bid.status}</span>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteBid(bid._id, bid.buyer_email)
                          }
                          className={`btn btn-ghost btn-sm ${
                            user && user.email === bid.buyer_email
                              ? "text-red-600 hover:bg-red-50"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!user || user.email !== bid.buyer_email}
                          title={
                            !user
                              ? "Please log in to delete"
                              : user.email !== bid.buyer_email
                              ? "You can only delete your own bids"
                              : "Delete this bid"
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
