import React, { useContext } from "react";
import { userProfileContext } from "../../App";

function Profile() {
    const { user } = useContext(userProfileContext)
    return (
        <div className="row">
            <div className="col-sm">
                <div className="card" style={{ width: "18rem" }}>
                    <img src={user.photoURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div class="row mb-2">
                            <div className="col-md-auto">
                                <span class="bg-light text-dark">Name</span>
                            </div>
                            <div className="col">
                                <span class="form-control bg-dark text-white">{user.displayName}</span>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div className="col-md-auto">
                                <span class="bg-light text-dark">Email</span>
                            </div>
                            <div className="col">
                                <span class="form-control bg-dark text-white">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm">
                One of three columns
    </div>
            <div className="col-sm">
                One of three columns
    </div>
        </div >
    )
}

export default Profile