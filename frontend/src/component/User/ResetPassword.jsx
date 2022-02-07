import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userAction";
import MetaData from "../layout/MetaData";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    showPassword === true ? setShowPassword(false) : setShowPassword(true);

    if (showPassword === false) {
      document.getElementById("hideLoginPasswordText").style.display = "block";
      document.getElementById("showLoginPasswordText").style.display = "none";
      document.getElementById("hideSingUpPasswordText").style.display = "block";
      document.getElementById("showSingUpPasswordText").style.display = "none";
    } else {
      document.getElementById("hideLoginPasswordText").style.display = "none";
      document.getElementById("showLoginPasswordText").style.display = "block";
      document.getElementById("hideSingUpPasswordText").style.display = "none";
      document.getElementById("showSingUpPasswordText").style.display = "block";
    }
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Update Successfully");

      history.push("/login");
    }
  }, [dispatch, alert, error, success, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2>Reset Password</h2>
              <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <VisibilityIcon
                    id="showLoginPasswordText"
                    onClick={handleShowPassword}
                  />
                  <VisibilityOffIcon
                    onClick={handleShowPassword}
                    id="hideLoginPasswordText"
                    style={{ display: "none" }}
                  />
                </div>

                <div>
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <VisibilityIcon
                    id="showLoginPasswordText"
                    onClick={handleShowPassword}
                  />
                  <VisibilityOffIcon
                    onClick={handleShowPassword}
                    id="hideLoginPasswordText"
                    style={{ display: "none" }}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
