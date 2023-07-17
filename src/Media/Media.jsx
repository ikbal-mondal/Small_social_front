
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { FaThumbsUp, FaComment, FaShare, FaEllipsisV ,} from 'react-icons/fa';
import Footer from "../Footer/Footer";

const Media = () => {


  const [data, setData] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/post')
      .then((response) => response.json())
      .then((data) => {
        // Store the fetched data in the state
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Load likes and comments data from local storage on component mount
    const storedLikes = localStorage.getItem('post_likes');
    const storedComments = localStorage.getItem('post_comments');

    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    // Save likes and comments data to local storage when they change
    localStorage.setItem('post_likes', JSON.stringify(likes));
    localStorage.setItem('post_comments', JSON.stringify(comments));
  }, [likes, comments]);

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + (prevLikes[postId] ? -1 : 1)
    }));
  };

  const handleComment = (postId) => {
    if (newComment.trim() !== '') {
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newComment]
      }));
      setNewComment('');
    }
  };

  const handleShareWhatsApp = (title, url) => {
    const shareLink = `whatsapp://send?text=${encodeURIComponent(
      `Check out this post: ${title}\n${url}`
    )}`;
    window.open(shareLink, '_blank');
  };

  // Dropdown icons
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="">
      <Navbar />

      <div className="pt-24 container mx-auto">
       <div className="fixed top-16 z-10  left-0 right-0">
       <div className="flex relative justify-around py-8 bg-slate-100 ">
        <div className="">
        <h1 className="text-2xl font-bold">Total Post : {data.length}</h1>
        </div>
        <div className="">
        <h1 className="text-2xl font-bold"> <i className="fa-solid mr-2 fa-photo-film"></i>Media</h1>  
        </div>
       </div>
       </div>
       <div className="mt-20">
       {data.map((post) => (
          <div key={post._id} className="max-w-sm w-9/12 mx-auto my-4 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
              <img
                src="https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
                alt="Profile Picture"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="text-gray-900 font-semibold">John Doe</h3>
                <p className="text-gray-600 text-sm">Software Engineer</p>
              </div>
              </div>
              <div className="relative dropdown dropdown-bottom">
      <button
        tabIndex={0}
        className="btn m-1"
        onClick={handleToggleDropdown}
        onBlur={() => setIsOpen(false)}
      >
        <FaEllipsisV />
      </button>
      {isOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 absolute top-full right-0">
          <li> 
           <a href="" className="text-green-600"><i className="fa-regular fa-pen-to-square"></i> Edit</a>
          
          </li>
          <li>

         <a href="" className="text-red-500"> <i className="fa-solid  fa-trash-can"></i>  Delete</a>
          </li>
        </ul>
      )}
    </div>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {post.title}
            </h2>
            <p className="mt-2 text-gray-800">
              {post.description}
            </p>
            <img
              src={post.image}
              alt="Post Image"
              className="mt-4 rounded-lg"
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => handleLike(post._id)} className={`text-gray-600 hover:text-gray-800 ${likes[post._id] ? 'text-blue-600' : ''}`}>
                <FaThumbsUp /> Like {likes[post._id] || 0}
              </button>
              <button className="text-gray-600 hover:text-gray-800" onClick={() => handleComment(post._id)}>
                <FaComment /> Comment
              </button>
              <button className="text-gray-600 hover:text-gray-800" onClick={() => handleShareWhatsApp(post.title, post.url)}>
                <FaShare /> Share
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Write a comment..."
                className="mt-4 w-full px-2 py-1 border border-gray-300 rounded-md"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment(post._id)}
              />
              {comments[post._id] && comments[post._id].map((comment, index) => (
                <p key={index} className="text-gray-800 border-b border-gray-300 pb-2">
                  {comment}
                </p>
              ))}
            </div>
          </div>
        ))}
       </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Media;
