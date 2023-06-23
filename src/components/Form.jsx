import React, { useState } from "react";
import * as Yup from "yup";
import "./Form.css";
import axios from "axios";

export default function Form() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    function handleSubmit(evt) {
        evt.preventDefault();

        const userSchema = Yup.object().shape({

            name: Yup.string().required("Name is required !"),

            phone: Yup.string().required("Phone is required")
                .min(10, "phone number should be 10 digit")
                .max(10, "phone number should be 10 digit"),

            email: Yup.string()
                .required("E-mail is required")
                .matches(/\S+@\S+\.\S+/, "Should be a valid email id")
        });

        try {
            userSchema.validateSync(
                {
                    name,
                    phone,
                    email,
                },
                {
                    abortEarly: false
                }
            );

            const payload = {
                name,
                phone,
                email
            }
            axios.post("http://users-management-api.ap-south-1.elasticbeanstalk.com/setUser", payload)
                .then(res => {
                    // setName("");
                    // setPhone("");
                    // setEmail("");

                    window.location.reload();
                })

                .catch(err => console.log(err));


        } catch (err) {
            const { inner } = err;
            let formErrors = {};

            if (inner && inner[0]) {
                inner.forEach(error => {
                    const { path, message } = error;
                    if (!formErrors[path]) {
                        formErrors[path] = message;
                    }
                });
            }
            console.log("form errors", formErrors);
            setErrors(formErrors);
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                 <h2> User Registration Form </h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <small className="inputField" id="err">{errors.name}</small>
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <small className="inputField">{errors.phone}</small>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <small className="inputField">{errors.email}</small>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

