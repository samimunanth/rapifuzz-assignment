// src/components/IncidentManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncidentManagement = () => {
    const [incidents, setIncidents] = useState([]);
    const [incidentDetails, setIncidentDetails] = useState({
        incident_type: '',
        details: '',
        priority: 'Medium',
        status: 'Open',
    });

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/incidents/');
            setIncidents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setIncidentDetails({
            ...incidentDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/incidents/', incidentDetails, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}` // Replace with your auth method
                }
            });
            fetchIncidents();
            alert('Incident created successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Incident Management</h1>
            <form onSubmit={handleSubmit}>
                <select name="incident_type" value={incidentDetails.incident_type} onChange={handleChange}>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Government">Government</option>
                </select>
                <textarea name="details" value={incidentDetails.details} onChange={handleChange} placeholder="Incident details" required />
                <select name="priority" value={incidentDetails.priority} onChange={handleChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select name="status" value={incidentDetails.status} onChange={handleChange}>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <button type="submit">Create Incident</button>
            </form>
            <div>
                <h2>Existing Incidents</h2>
                <ul>
                    {incidents.map((incident) => (
                        <li key={incident.id}>{incident.incident_id} - {incident.details}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IncidentManagement;
