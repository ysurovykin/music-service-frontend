import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../login/login.page';
import { RegistrationPage } from '../registration/registration.page';

export default function UnauthorizedRouter() {
  return (
    <>
      <div className='unauthorized-router'>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}