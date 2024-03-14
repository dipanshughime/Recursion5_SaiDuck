import React from 'react'

const DetailsCard = ({details}) => {
    console.log(details);

    const flights = details.split("&&")
    console.log(flights)

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
            <h2 className="card-title">Details!</h2>
            <p className="text-wrap">{flights[0]}</p>
            <a href={flights[1]}>
                <button className="btn btn-primary">Flight Booking</button>
                </a>
            <hr />
            <p className="text-wrap">{flights[2]}</p>
            <a href={flights[3]}>
                <button className="btn btn-primary">Hotel option 1</button>
                </a>
            <hr />
            <p className="text-wrap">{flights[4]}</p>
            <a href={flights[5]}>
                <button className="btn btn-primary">Hotel option 2</button>
                </a>
            <div className="card-actions justify-end">
               
                
            </div>
        </div>
    </div>

  )
}

export default DetailsCard