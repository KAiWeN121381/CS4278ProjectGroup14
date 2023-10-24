import React from "react";
import pricetag from "../assets/price-tag.png"
import calendar from "../assets/calendar.png"

// The filter pop-up
// TO-DO: Add buttons for facilities selection 
// TO-DO: apply the filter results to the post display
export default function Filter({ isOpen, onClose}) {
    if (!isOpen) return null; // Do not show if pop-up should not be open

    return  (
        <div className="filter">
            <div className="filter-content">
                <div>
                    {/* The close button */}
                    <button onClick={onClose}
                    style={{paddingLeft:"99%", backgroundColor:"transparent", borderColor:"transparent"}}>
                        X</button>
                    {/* Price range input */}
                    <div className="filter-content-price">
                        <p>Price Range:</p>
                        <div>
                            <div className="filter-content-inline">
                                <p>Minimum: </p><img src={pricetag}/><input type="text" />
                            </div>
                            <div className="filter-content-inline">
                                <p>Maximum: </p><img src={pricetag}/><input type="text" />
                            </div>
                        </div>
                    </div>
                    {/* Facility selection */}
                    <div className="filter-content-facilities">
                        <p>Facilities:</p>
                    </div>
                    {/* Stay duration input */}
                    <div className="filter-content-duration">
                        <p>Intended Duration:</p>
                        <div>
                            <div className="filter-content-inline">
                                <p>Check-in: </p><img src={calendar}/><input type="text" />
                            </div>
                            <div className="filter-content-inline">
                                <p>Check-out: </p><img src={calendar}/><input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* The apply button */}
                <button onClick={onClose} className="apply-filter-button">Apply</button>
            </div>
        </div>
    )
}