import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import "./UpdatePassword.css";
import Loader from '../layout/Loader/Loader';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from "../layout/MetaData";

const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };   

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated) {
            alert.success("Profile Update Successfully");

            history.push("/account");

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, alert, error, isUpdated, history]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                            <h2>Change Password</h2>
                            <form 
                                className='updatePasswordForm'
                                encType='multipart/form-data'
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className='updatePassword'>
                                    <VpnKeyIcon />
                                    <input
                                        type='password'
                                        placeholder='Old Password'
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className='updatePassword'>
                                    <LockOpenIcon />
                                    <input
                                        type='password'
                                        placeholder='New Password'
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className='updatePassword'>
                                    <LockIcon />
                                    <input
                                        type='password'
                                        placeholder='Confirm Password'
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                
                                <input
                                    type='submit'
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdatePassword;
