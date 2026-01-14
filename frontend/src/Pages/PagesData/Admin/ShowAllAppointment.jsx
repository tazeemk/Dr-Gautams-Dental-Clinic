import axios from "axios";
import { useEffect, useState } from "react";

const ShowAllAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch appointments from the server
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:9090/showAppointment/All");
                console.log(response.data);
                
                // Set the appointments data
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Delete appointment function
    const handleDelete = async (appointmentId) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            // Fixed URL construction
            const deleteUrl = `http://localhost:9090/showAppointment/remove/${appointmentId}`;
            console.log("Deleting Appointment:", deleteUrl);
            
            try {
                await axios.delete(deleteUrl);
                // Remove the deleted appointment from the state
                setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
                alert('Appointment deleted successfully!');
            } catch (error) {
                console.error("Error deleting appointment:", error);
                alert('Failed to delete appointment. Please try again.');
            }
        }
    };

    // Loading state
    if (loading) return (
        <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            fontSize: '18px',
            color: '#666'
        }}>
            <div style={{ marginBottom: '20px' }}>Loading appointments...</div>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #4CAF50',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
            }}></div>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
    
    // Error state
    if (error) return (
        <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#d32f2f', 
            fontSize: '18px',
            backgroundColor: '#ffebee',
            border: '1px solid #ffcdd2',
            borderRadius: '8px',
            margin: '20px'
        }}>
            <strong>Error:</strong> {error}
        </div>
    );

    return (
        <div style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            <div style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    color: '#333', 
                    marginBottom: '30px',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    📅 All Appointments
                </h2>
                
                {appointments.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '60px', 
                        fontSize: '18px', 
                        color: '#666',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        border: '2px dashed #ddd'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
                        No appointments found.
                    </div>
                ) : (
                    <>
                        <div style={{ overflowX: 'auto', borderRadius: '12px', overflow: 'hidden' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                 fontSize: '14px'
                            }}>
                                <thead>
                                    <tr style={{ 
                                        background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                                        color: 'white'
                                    }}>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>ID</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Patient Name</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Email</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Phone</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Appointment Date</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Time</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Booking Time</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Description</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Address</th>
                                        <th style={{ padding: '18px 15px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={appointment.id} style={{
                                            backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                                            borderBottom: '1px solid #eee',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f0f8ff';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fafafa' : 'white';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee',
                                                fontWeight: 'bold',
                                                color: '#4CAF50'
                                            }}>
                                                {appointment.id}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee', 
                                                fontWeight: '600',
                                                color: '#333'
                                               
                                            }}>
                                                {appointment.userName}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee', 
                                                color: '#0066cc',
                                                textDecoration: 'none'
                                            }}>
                                                {appointment.email}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee',
                                                color: '#666'
                                                      }}>
                                                 {appointment.mobileNumber
                                        ? Number(appointment.mobileNumber).toLocaleString('en-IN', {
                                              useGrouping: false
                                                      })
                                                      : 'N/A'}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee',
                                                fontWeight: '500',
                                                color: '#333'
                                            }}>
                                                {new Date(appointment.appointmentDate).toLocaleDateString()}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee', 
                                                fontWeight: '600',
                                                color: '#4CAF50'
                                            }}>
                                                {appointment.time}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee', 
                                                fontSize: '12px', 
                                                color: '#666'
                                            }}>
  {appointment.bookingTiming
  ? new Date(appointment.bookingTiming).toLocaleString()
  : 'N/A'}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee',
                                                maxWidth: '150px',
                                                wordWrap: 'break-word',
                                                color: '#666'
                                            }}>
                                                {appointment.description}
                                            </td>
                                            <td style={{ 
                                                padding: '15px', 
                                                borderRight: '1px solid #eee', 
                                                maxWidth: '200px',
                                                wordWrap: 'break-word',
                                                color: '#666'
                                            }}>
                                                {appointment.userAddress}
                                            </td>
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => handleDelete(appointment.id)}
                                                    style={{
                                                        backgroundColor: '#ff5252',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '10px 20px',
                                                        borderRadius: '25px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 2px 8px rgba(255, 82, 82, 0.3)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        fontSize: '13px'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = '#d32f2f';
                                                        e.target.style.transform = 'translateY(-2px)';
                                                        e.target.style.boxShadow = '0 4px 15px rgba(255, 82, 82, 0.4)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#ff5252';
                                                        e.target.style.transform = 'translateY(0)';
                                                        e.target.style.boxShadow = '0 2px 8px rgba(255, 82, 82, 0.3)';
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ 
                            marginTop: '25px', 
                            textAlign: 'center',
                            padding: '15px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #e9ecef'
                        }}>
                            <span style={{ 
                                color: '#666',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}>
                                📊 Total Appointments: <span style={{ color: '#4CAF50' }}>{appointments.length}</span>
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowAllAppointment;