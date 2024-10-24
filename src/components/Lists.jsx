import React from 'react';
import '../css/lists.css';
import Card from './Card';

export default function Lists({sectionData}) {

  return (
    <div className='lists flex'>
      {
        ((!sectionData) || sectionData.length===0) && 
        <div className='no-section-data flex'>
            <h2>No Match Found!!</h2>
            <p>Try some other categories/filters</p>
        </div>
      }
         {
            sectionData?.map(((item)=> <Card data={item} key={item._id}/>))
         }
    </div>
  )
}
