import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import "../App.css"
import { v4 as uuidv4 } from "uuid";
import MasonryImageList from "./ImageGallery";

const CDNURL ="https://rwtlrrkgjeavzkauelxq.supabase.co/storage/v1/object/public/images/";
const Dashboard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [images, setImages] = useState([]);

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("images")
      .upload(user.id + "/" + uuidv4(), file);
    if (data) {
      getImages();
    } else {
      console.log(error);
    }
  };
  const getImages = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (data !== null) {
      setImages(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      getImages();
    } else {
      alert("please login first");
    }
  }, [user]);

  const handleDelete=async(imagename)=>{
    const {error,data} =await supabase
    .storage
    .from("images")
    .remove([user.id +"/" + imagename])
    if(error){
      console.log(error.message)
    }
    else{
    getImages();
    }
  }

  return (
    <div className=" h-screen">
      <div className="flex relative items-center h-16  pl-4 pr-8 justify-between">
        <h3 className="font-bold text-lg text-white">GetImage</h3>
        <ul className="flex items-center gap-8">
          <p className="text-white">{user.email}</p>
          <button
            className="border-none text-sm rounded-sm h-6 w-12 text-white hover:text-white  hover:bg-slate-700 hover:border-white-2  bg-black"
            onClick={() => supabase.auth.signOut()}
          >
            logout
          </button>
        </ul>
      </div>
      <form className="mb-6 mt-6  border-2  ml-10 h-12 inline-flex justify-center rounded-md items-center">
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => uploadImage(e)}
        />
        <button className="bg-white mr-4 p-1 max-md:p-0 max-md:text-xs rounded-md"onClick={uploadImage}>upload</button>
      </form>
      <div>
        <MasonryImageList handleDelete={handleDelete} CDNURL={CDNURL} images={images} user={user}/>
      </div>
      
    </div>
  );
};

export default Dashboard;
