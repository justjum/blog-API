import {useEffect, useRef} from 'react';


const UploadWidget = ({image, setImage, setImageThumb }) => {
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
                let url = result.info.url;
                setImage(url)
                let urlThumb = url.split("upload/")
                urlThumb = urlThumb[0]+'upload/t_Music%20Store%20Image/'+urlThumb[1]
                setImageThumb(urlThumb)
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