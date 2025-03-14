import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Trial = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    const getAllStates = async () => {
        const res = await axios.get("/state/getstates");
        setStates(res.data.data);
    };

    const getCityByStateId = async (id) => {
        const res = await axios.get("/city/getcitybystate/" + id);
        setCities(res.data.data);
    };

    const getAreaByCityId = async (id) => {
        const res = await axios.get("/area/getareabycity/" + id);
        setAreas(res.data.data);
    };

    useEffect(() => {
        getAllStates();
    }, []);

    const { register, handleSubmit } = useForm();

    const submitHandler = async (data) => {
        const userId = localStorage.getItem("id");
        data.userId = userId;
        const res = await axios.post("/user", data);
        console.log(res.data);
    };

    return (
        <div style={{ textAlign: "center", background: "blue", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1>Trial Sample</h1>
            <form onSubmit={handleSubmit(submitHandler)} style={{ width: "50%", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", background: "red", borderRadius: "10px" }}>
                {[
                    { label: "Trial Dropdown", name: "hoardingDimension", type: "text" },
                    { label: "Latitude", name: "latitude", type: "text" },
                    { label: "Longitude", name: "longitude", type: "text" }
                ].map((field) => (
                    <div key={field.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <label style={{ flex: "1", textAlign: "right", marginRight: "10px" }}>{field.label}:</label>
                        <input type={field.type} {...register(field.name)} style={{ flex: "2", padding: "5px" }} />
                    </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ flex: "1", textAlign: "right", marginRight: "10px" }}>Type:</label>
                    <select {...register("hoardingType")} style={{ flex: "2", padding: "5px" }}>
                        <option value="Unipole">Unipole</option>
                        <option value="Billboard">Billboard</option>
                        <option value="Gantry">Gantry</option>
                        <option value="Digital">Digital</option>
                    </select>
                </div>
                
                {[{ label: "Select State", name: "stateId", options: states, onChange: getCityByStateId },
                  { label: "Select City", name: "cityId", options: cities, onChange: getAreaByCityId },
                  { label: "Select Area", name: "areaId", options: areas, onChange: null }].map((dropdown) => (
                    <div key={dropdown.name} 
                    style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        
                        <label style={{ flex: "1", textAlign: "right", marginRight: "10px" }}>{dropdown.label}:</label>
                        <select {...register(dropdown.name)} style={{ flex: "2", padding: "5px" }}
                            onChange={dropdown.onChange ? (event) => dropdown.onChange(event.target.value) : undefined}>
                            <option>{dropdown.label}</option>
                            {dropdown.options?.map((option) => <option key={option._id} value={option._id}>{option.name}</option>)}
                        </select>
                    </div>
                ))}
                
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <input type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }} />
                </div>
            </form>
        </div>
    );
};
