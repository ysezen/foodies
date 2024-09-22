'use client';

import classes from './image-picker.module.css';
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState()

    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }



    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="The image selected bu the user"
                            fill="responsive"
                        />)}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg, image/jpg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required={true}
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick An Image
                </button>
            </div>
        </div>
    );
}