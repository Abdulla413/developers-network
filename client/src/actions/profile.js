import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_REPOS,
  NO_REPOS,
} from "./types";

// Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Profiles

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get("/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get profile by id

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos

export const getGithubrepos = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};

// Create or update profile

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post("/profile", formData);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors, "iam errors")

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Exprience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put("/profile/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put("/profile/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed", "Success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Delet Educations
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Removed", "Success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Delete profile and Account

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete(`/profile`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });
      dispatch(setAlert("Your account has been permanantly Deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};