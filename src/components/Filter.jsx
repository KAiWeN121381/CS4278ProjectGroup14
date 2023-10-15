import React from "react";
import pricetag from "../assets/price-tag.png"
import calendar from "../assets/calendar.png"

export default function Filter({ isOpen, onClose}) {
    if (!isOpen) return null;

    return  (
        <div className="filter">
            <div className="filter-content">
                <div>
                    <button onClick={onClose}
                    style={{paddingLeft:"99%", backgroundColor:"transparent", borderColor:"transparent"}}>
                        X</button>
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
                    <div className="filter-content-facilities">
                        <p>Facilities:</p>
                    </div>
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
                <button onClick={onClose} className="apply-filter-button">Apply</button>
            </div>
        </div>
    )
}