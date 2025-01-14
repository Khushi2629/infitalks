"use client";
import React, { useEffect, useRef, useState } from "react";
import { pusherClient } from "../lib/pusher"; // Import pusherClient from lib/pusher.js

const VideoCall = ({ currentUser }) => {
  const peerConnection = useRef(null);
  const pusherChannel = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [stream, setStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [loading, setLoading] = useState(true); // Adding loading state
  const [search, setSearch] = useState(""); // State for search term

  // Fetch the list of users (contacts) from your backend
  const fetchContacts = async () => {
    try {
      const res = await fetch(
        search ? `/api/users?query=${encodeURIComponent(search)}` : "/api/users"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      if (currentUser) {
        setContacts(data.filter((contact) => contact._id !== currentUser._id));
      } else {
        setContacts(data); // Default behavior if currentUser is not defined
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts when the component mounts or search term changes
  }, [search, currentUser]);

  useEffect(() => {
    // Ensure video elements are available
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search term
  };

  const startCall = async () => {
    if (!selectedContact) {
      alert("Please select a contact to call.");
      return;
    }

    // Get media stream only when the call starts
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(mediaStream);

    // Initialize PeerConnection
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Public STUN server
    });

    mediaStream.getTracks().forEach((track) =>
      peerConnection.current.addTrack(track, mediaStream)
    );

    // Subscribe to Pusher channel for signaling
    pusherChannel.current = pusherClient.subscribe("private-video-call");
    pusherChannel.current.bind("client-sdp", handleRemoteSDP);
    pusherChannel.current.bind("client-ice", handleRemoteICE);

    // Create SDP offer
    createOffer();
    setIsCalling(true); // Indicate that a call has started
  };

  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    // Send SDP offer via Pusher
    pusherChannel.current.trigger("client-sdp", { sdp: offer });
  };

  const handleRemoteSDP = async (data) => {
    const remoteDesc = new RTCSessionDescription(data.sdp);
    await peerConnection.current.setRemoteDescription(remoteDesc);
  };

  const handleRemoteICE = (data) => {
    const candidate = new RTCIceCandidate(data.ice);
    peerConnection.current.addIceCandidate(candidate);
  };

  const endCall = () => {
    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Unsubscribe from Pusher channel
    if (pusherChannel.current) {
      pusherChannel.current.unbind("client-sdp");
      pusherChannel.current.unbind("client-ice");
      pusherChannel.current.unsubscribe();
    }

    // Reset video elements and state
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setStream(null);
    setIsCalling(false);
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: 'auto',
  };

  const controlsStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  const videosStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'column', // Stack videos vertically on smaller screens
  };

  const localVideoStyle = {
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
    border: '2px solid #0070f3',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const remoteVideoStyle = {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    border: '2px solid #0070f3',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    backgroundColor: '#0070f3',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    outline: 'none',
  };

  const buttonHoverStyle = {
    backgroundColor: '#005bb5',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#333' }}>Video Call (under development)</h1>

      {/* Contact selection dropdown */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontSize: '16px', color: '#333' }}>Contact:</label>
        <select
          value={selectedContact ? selectedContact._id : ""}
          onChange={(e) =>
            setSelectedContact(contacts.find((c) => c._id === e.target.value))
          }
          style={{
            marginLeft: '10px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        >
          <option value="">-- Select Contact --</option>
          {contacts.map((contact) => (
            <option key={contact._id} value={contact._id}>
              {contact.username}
            </option>
          ))}
        </select>
      </div>

      <div style={controlsStyle}>
        {/* Only show video elements if the call has started */}
        {isCalling && (
          <div style={videosStyle}>
            <video ref={localVideoRef} autoPlay muted style={localVideoStyle}></video>
            <video ref={remoteVideoRef} autoPlay style={remoteVideoStyle}></video>
          </div>
        )}

        <button
          onClick={startCall}
          disabled={isCalling}
          style={{ ...buttonStyle, ...(isCalling ? buttonHoverStyle : {}) }}
        >
          Start Call
        </button>
        <button
          onClick={endCall}
          disabled={!isCalling}
          style={{ ...buttonStyle, ...(isCalling ? buttonHoverStyle : {}) }}
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
