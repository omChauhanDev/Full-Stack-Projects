import React from "react";
import Card from "./Card";
import { useState } from "react";   

const Cards = function(props){
    let courses = props.courses;
    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);
    
    function getCourses(){
        if(category === "All"){
            let allCourses = [];
            Object.values(courses).forEach((array)=>{
                array.forEach((course)=>{
                    allCourses.push(course);
                    }
                )
            })
            return allCourses;
        }
        else{
            return courses[category];
        }
    }
    let output = getCourses();
    return(
        <div>
            {
                (output.length === 0) ?
                <div><p className="text-lg">No Courses Found</p></div>:
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {
                        getCourses().map((course)=>(
                            <Card key={course.id}
                                course={course}
                                likedCourses={likedCourses}
                                setLikedCourses={setLikedCourses}
                            />
                        ))
                    }
                </div>
            }
        </div>
        
    )
}

export default Cards;