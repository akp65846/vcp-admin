const publishmentModel = {
    id: '',
    source_platform_id: '',
    target_platform_id: '',
    video_id: '',
    media_id: '',
    title: '',
    description: '',
    is_notify_subscribers: '',
    scheduled_time: '',
    uploaded_time: '',
    upload_trial_times: '',
    data: '',
    status: '',
    created_time: '',
    updated_time: '',
    external_tags: ''
}

function getPublishmentStatus(status){
    if (status === 1) {
        return 'Active'
    } else {
        return 'Inactive'
    }
}

function getPublishmentIsNotifySubscribers(value){
    if (value === 1) {
        return 'Yes'
    } else {
        return 'No'
    }
}

export {publishmentModel, getPublishmentStatus, getPublishmentIsNotifySubscribers};