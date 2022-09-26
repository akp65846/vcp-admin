import {Formik} from "formik";
import {TextField} from "@mui/material";
import {approveVideo, rejectVideo} from "../apis/video";
import {toast} from "react-toastify";

const initialValue = {
    remarks: ''
}

const formValidation = (values) => {
    const errors = {};
    return errors;
}

const ApprovalForm = ({videoId, isApprove, innerRef, callBackSuccessFunc, ...props}) => {

    const submitHandler = (values, {setSubmitting}) => {
        if (isApprove) {
            approveVideo(videoId, values.remarks).then((res) => {
                toast.success('Video Approved');
                callBackSuccessFunc(videoId);
            }).catch((error) => {
                toast.error(error.response.data.message)
            }).finally(() => {
                setSubmitting(false);
            })
        } else {
            rejectVideo(videoId, values.remarks).then((res) => {
                toast.success('Video Rejected');
                callBackSuccessFunc(videoId);
            }).catch((error) => {
                toast.error(error.response.data.message);
            }).finally(() => {
                setSubmitting(false);
            })
        }
    }

    return (
        <Formik
            initialValues={initialValue}
            validate={formValidation}
            onSubmit={submitHandler}
            innerRef={innerRef}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="remarks"
                        name="remarks"
                        label="Remarks"
                        value={values.remarks}
                        onChange={handleChange}
                        error={touched.remarks && errors.remarks}
                        fullWidth
                        margin="dense"
                        variant="standard"
                    />
                </form>
            )}
        </Formik>
    )
}

export default ApprovalForm;