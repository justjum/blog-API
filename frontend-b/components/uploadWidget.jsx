import {useEffect, useRef} from 'react';


const UploadWidget = ({image}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current=window.cloudinary;
        console.log(cloudinaryRef);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dhz7ys7e1',
            uploadPreset: 'Blog-API'
        }, function(error, result){
            console.log(result)
            if (result.event == 'success') {
                console.log('success')
                console.log(result.info.url)
                console.log(result.info.thumbnail_url)
            }
        });
    },[]);

    function handleOpen(e) {
        e.preventDefault();
        widgetRef.current.open()
    }

    return (
        <button className="postButton" onClick={handleOpen} >
            {image ? "Change":"Upload"} Image
        </button>
    )
}

export default UploadWidget;