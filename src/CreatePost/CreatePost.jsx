

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CreatePost = () => {

  const { register, handleSubmit , formState:{errors}} = useForm();
 const imageHostKey = '4da464a93c06b14a7d6f6ba9dfaa4bf1';
const navigate = useNavigate();
  const handleCreatePost = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image)
   const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`    


    fetch(url, {
      method:'POST',
      body:formData
    })
     .then(res => res.json())
     .then(postImage => {
         if(postImage.success){
          console.log(postImage.data.url);
          const CreatePost={
            title:data.title,
            image:postImage.data.url,
            description:data.description
          }

  //  save create post 
  fetch('http://localhost:5000/post', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(CreatePost)
})
  .then(res => res.json())
  .then(result => {
    console.log(result);
    alert('create post successfully done')
    navigate('/media')
  })
         }
     })

  }


  return (
    <div>
       <Navbar></Navbar>
 <h1 className="text-5xl font-bold bg-base-200 pt-24 text-center">Create  Post!</h1>

      <div className="hero min-h-screen bg-base-200">
     
  <div className="hero-content border shadow-2xl flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left ">
      <img  src="https://miro.medium.com/v2/resize:fit:960/1*fYXRcyGKX7Okb2rTmLSc-Q.gif" alt="" />
    </div>
    <form onSubmit={handleSubmit(handleCreatePost)} className="card flex-shrink-0 shadow-md w-full max-w-sm " >
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Post Title:</span>
          </label>
          <input type="text"
          {...register("title" ,{ required:"file is required"})}
             className="input input-bordered py-3" placeholder='Enter Post Title' />
             {errors.title && <p className="text-red-700">{errors.title.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image:</span>
          </label>
          <input type="file"
          {...register("image" ,{ required:"file is required"})}
             className="input input-bordered py-3" />
             {errors.file && <p className="text-red-700">{errors.image.message}</p>}
        </div>
        
        <div className="form-control">
          <label className="label input-bordered">
            <span className="label-text">Description</span>
          </label>
          <textarea 
         {...register("description" ,{ required:"description is required"})}
           className="textarea textarea-bordered" placeholder="post description"></textarea>
           {errors.description && <p  className="text-red-700">{errors.description.message}</p>}
        </div>
        <div className="form-control mt-6">
        <button type="submit" className="btn btn-info">
         Create Post
        </button>
        </div>
      </div>
    </form>
  </div>
</div>
<Footer></Footer>
    </div>
    
  );
};

export default CreatePost;
