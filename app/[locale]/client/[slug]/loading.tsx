"use client";

import React from 'react';

export default function Loading() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div className="spinner">
        <style jsx>{`
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #e9ecef;
            border-top: 5px solid #c8a45d;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
