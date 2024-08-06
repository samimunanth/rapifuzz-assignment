import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Registration = () => {
    const [formData, setFormData] = useState({
        user_type: 'Individual',
        username:'',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        mobileISDCode: '',
        mobile_number: '',
        fax: '',
        phone: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({});

    const countryCodes = [
        { code: '+1', country: 'United States' },
        { code: '+91', country: 'India' },
        { code: '+44', country: 'United Kingdom' },
        // Add more country codes as needed
    ];

    useEffect(() => {
        // Generate username from first name and last name
        const { first_name, last_name } = formData;
        const username = `${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
        setFormData(prevData => ({
            ...prevData,
            username
        }));
    }, [formData.first_name, formData.last_name]);

    const handleChange = (e) => {
      
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pincodePattern = /^[0-9]{6}$/; // Adjust the regex pattern for your pincode requirements
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!formData.first_name) formErrors.first_name = 'Please enter a valid first name';
        if (!formData.email || !emailPattern.test(formData.email)) formErrors.email = 'Please enter a valid email';
        if (!formData.address) formErrors.address = 'Please enter a valid address';
        if (!formData.country) formErrors.country = 'Please select your country';
        if (!formData.state) formErrors.state = 'Please select your state';
        if (!formData.city) formErrors.city = 'Please select your city';
        if (!formData.pincode || !pincodePattern.test(formData.pincode)) formErrors.pincode = 'Please enter a valid pincode';
        if (!formData.mobileISDCode) formErrors.mobileISDCode = 'Please select a country code';
        if (!formData.password) {
            formErrors.password = 'Password is ';
        } else if (!passwordPattern.test(formData.password)) {
            formErrors.password = 'Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long';
        }
        if (formData.password !== formData.confirm_password) {
            formErrors.confirm_password = 'Confirm password should match the password';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        if (!validateForm()) return;

        try {
            console.log(formData);  
            await axios.post('http://localhost:8000/api/register/', formData);
            alert('Registration successful!');
            // Redirect or update the state as needed
        } catch (error) {
            console.error(error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">                   
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Individual/Enterprise/Government</label>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="individual"
                                            name="user_type"
                                            value="Individual"
                                            className="form-check-input"
                                            checked={formData.user_type === 'Individual'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="individual" className="form-check-label">Individual</label>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="enterprise"
                                            name="type"
                                            value="Enterprise"
                                            className="form-check-input"
                                            checked={formData.type === 'Enterprise'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="enterprise" className="form-check-label">Enterprise</label>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="government"
                                            name="type"
                                            value="Government"
                                            className="form-check-input"
                                            checked={formData.type === 'Government'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="government" className="form-check-label">Government</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        
                                    />
                                    {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                
                            />
                            {errors.address && <div className="text-danger">{errors.address}</div>}
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        
                                    />
                                    {errors.country && <div className="text-danger">{errors.country}</div>}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        
                                    />
                                    {errors.state && <div className="text-danger">{errors.state}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        
                                    />
                                    {errors.city && <div className="text-danger">{errors.city}</div>}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="pincode" className="form-label">Pincode</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="pincode"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        
                                    />
                                    {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className="mb-3">
                                    <label htmlFor="mobileISDCode" className="form-label">Mobile Number</label>
                                    <select
                                        id="mobileISDCode"
                                        name="mobileISDCode"
                                        className="form-select"
                                        value={formData.mobileISDCode}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select ISD Code</option>
                                        {countryCodes.map((code) => (
                                            <option key={code.code} value={code.code}>
                                                {code.code} ({code.country})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mobileISDCode && <div className="text-danger">{errors.mobileISDCode}</div>}
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <div className="mb-3">
                                    <label htmlFor="mobile_number" className="form-label">&nbsp;</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobile_number"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleChange}
                                        
                                    />
                                </div>
                            </div>
                        </div> 
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="fax" className="form-label">Fax</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fax"
                                        name="fax"
                                        value={formData.fax}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>   
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                
                            />
                            {errors.confirm_password && <div className="text-danger">{errors.confirm_password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary col-md-12">SIGNUP</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
