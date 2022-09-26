import React, {useEffect, useState} from 'react';
import { Formik } from 'formik';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel, MenuItem,
    Radio,
    RadioGroup, Select,
    TextField
} from "@mui/material";
import {getAllTargetPlatforms} from "../apis/platform";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {publishVideo} from "../apis/publishment";
import {toast} from 'react-toastify';

const validation = (values) => {
    const errors = {};
    return errors;
}

const PublishmentForm = ({video, innerRef, callBackSuccessFunc, ...props}) => {

    const [targetPlatforms, setTargetPlatforms] = useState([]);

    const initialValue = {
        targetPlatformId: '',
        title: video.title ? video.title : '',
        description: video.description ? video.description : '',
        scheduledTime: '',
        isNotifySubscriber: '0',
    }

    useEffect(() => {
        getAllTargetPlatforms().then((res) => {
            setTargetPlatforms(res.data.data);
        }).catch((error) => {
            console.log(error)
        })
    },[]);

    const submitHandler = (values, {setSubmitting}) => {
        // console.log(values);
        // api submit
        // alert(JSON.stringify(values, null, 2));


        publishVideo(video.id, values.targetPlatformId, values.scheduledTime, values.title, values.description, values.isNotifySubscriber).then((res) => {
            toast.success('Publish success');
            callBackSuccessFunc(video.id);
        }).catch((error) => {
            toast.error(error.message);
        }).finally(() => {
            setSubmitting(false);
        })
    }

    return (
        <Formik
            initialValues={initialValue}
            validate={validation}
            onSubmit={submitHandler}
            innerRef={innerRef}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleChange}
                        error={touched.title && errors.title}
                        fullWidth
                        margin="dense"
                        variant="standard"
                    />
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        error={touched.description && errors.description}
                        fullWidth
                        margin="dense"
                        variant="standard"
                    />
                    <FormControl variant="standard" style={{marginTop: 10}} fullWidth>
                        <InputLabel>Upload Platform</InputLabel>
                        <Select
                            id="target_platform_id"
                            name="targetPlatformId"
                            value={values.targetPlatformId}
                            onChange={handleChange}>

                            {targetPlatforms.map((platform) => (
                                <MenuItem value={platform.id} key={platform.id}>{platform.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{marginTop: 10}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker
                                id="schedule_time"
                                name="scheduledTime"
                                label="Upload Time"
                                value={values.scheduledTime}
                                onChange={(date) => {console.log(date.format("YYYY-MM-DD HH:mm:ss")); setFieldValue('scheduledTime', date.format("YYYY-MM-DD HH:mm:ss"))}}
                                renderInput={(params) => <TextField {...params} margin="dense" variant="standard"/>}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl style={{marginTop: 10}} >
                        <FormLabel>Notify Subscriber</FormLabel>
                        <RadioGroup
                            row
                            id="notify_subscriber"
                            name="isNotifySubscriber"
                            value={values.isNotifySubscriber}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Yes" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {/*<Button color="primary" variant="contained" fullWidth type="submit">*/}
                    {/*    Submit*/}
                    {/*</Button>*/}
                </form>
            )}
        </Formik>
    )
}

export default PublishmentForm;