import React, { useState, useEffect} from 'react'
import Navbar from './Navbar';
import { auth, db, storage } from '../firebaseConfig/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where, doc, updateDoc, addDoc } from 'firebase/firestore';
import './ComponentStyle/AddProducts.css';
import { getDownloadURL, uploadBytes , ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import AccessDeniedImg from '../asserts/AccessDenied.png';

function AddProducts() {

    const [producttitle, setProductTitle] = useState('');
    const [producttype, setProductType] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [customersupport, setCustomersupport] = useState('');
    const [price, setPrice] = useState('');
    const [warranty, setWarranty] = useState('');
    const [productimage, setProductImage] = useState('');
    const [keyspecs , setKeyspecs] = useState('');
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImage(selectedFile);
                setImageError('');
            }
            else {
                setProductImage(null);
                setImageError('please selected a valid image file types(png or jpg)')
            }

        }
        else {
            setImageError('Please Select Your File');
        }

    }

    const navigate = useNavigate();
    const handleAddProdcut = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `product-images${producttype.toUpperCase()}/${Date.now()}`);

        // console.log(storageRef._location.path)
        uploadBytes(storageRef, productimage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products${producttype.toUpperCase()}`),{
                        producttitle,
                        producttype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs:keyspecs,
                    })
                })
                
            })
            
            
    }

    function GetCurrentUser() {
        const [user, setUser] = useState('');
        const userCollectionRef = collection(db, "users");

        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where('uid', '==', userlogged.uid))
                        //console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                    }
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    const loggedUser = GetCurrentUser();


    return (
        <div>
            <Navbar />

            {loggedUser && loggedUser[0].email === "seemant88@gmail.com" ?
                <div className='addprod-container'>
                    <form className='addprod-form' onSubmit={handleAddProdcut}>
                        <p>Add Data </p>
                        <p>Welcome , {loggedUser[0].username}</p>
                        {successMsg && <div className='success-msg'>{successMsg}</div>}
                        {uploadError && <div className='err-msg'>{uploadError}</div>}
                        <label>Product Title</label>
                        <input type='text' onChange={(e) => { setProductTitle(e.target.value) }} placeholder='Product Title' />

                        <label>Product Type</label>
                        <input type='text' onChange={(e) => { setProductType(e.target.value) }} placeholder='Product Type' />

                        <label>Brand Name</label>
                        <input type='text' onChange={(e) => { setBrand(e.target.value) }} placeholder='Brand Name' />

                        <label>Warranty</label>
                        <input type='text' onChange={(e) => { setWarranty(e.target.value) }} placeholder='Waranty' />

                        <label>Image</label>
                        <input type='file' onChange={handleProductImg} /> {imageError && <>
                            <div className='error-msg'>{imageError}</div>
                        </>}
                        <label>Key Specifications</label>
                        <textarea onChange={(e) => setKeyspecs(e.target.value)} placeholder='Give Specifications about Product '></textarea>

                        
                        <label>Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Describe your Product in brief '></textarea>

                        <label>Price Without tax</label>
                        <input type='text' onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Price without Tax ' />

                        <label>Customer Support</label>
                        <input type='text' onChange={(e) => { setCustomersupport(e.target.value) }} placeholder='Customer Support Email,Phone Number or Address.' />

                        <button type='submit'>Add</button>
                    </form>
                </div>
                :
                <div className='DontAccess-cont'>
                    <img src={AccessDeniedImg}/>
                </div>}

        </div>
    )
}

export default AddProducts