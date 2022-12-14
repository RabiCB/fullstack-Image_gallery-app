import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MasonryImageList({handleDelete,CDNURL,images,user}) {
    const [deletebtn,Setdeletebtn]=useState(false)
  return (
    
      <ImageList variant="masonry" className='m-8 relative ' cols={3} gap={8}>
        {images.map((item) => (
          <ImageListItem className="flex items-center justify-center flex-col" key={item.img}>
            <img

              src={`${CDNURL + user.id +"/"+item.name}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
           <button className="border-2 text-white absolute bottom-4 right-4 rounded-md p-1 max-md:p-0 text-xs max-md:w-10 max-md:bottom-2 max-md:right-2 max-md:absolute"onClick={()=>handleDelete(item.name)}>delete</button>
          </ImageListItem>
        ))}
      </ImageList>
   
  );
}
