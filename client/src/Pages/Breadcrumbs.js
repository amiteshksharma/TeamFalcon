import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Example = (props) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem><Link to='/' className="Home">Team falcon</Link></BreadcrumbItem>
        <BreadcrumbItem><Link to='/personal_info' className="Info">Info</Link></BreadcrumbItem>
        <BreadcrumbItem ><Link to='/bodysymptoms' className="Symptoms">Symptoms</Link></BreadcrumbItem>
        <BreadcrumbItem ><Link to='/symptomlist' className="SymptomList">More Symptoms</Link></BreadcrumbItem>
        <BreadcrumbItem ><Link to='/preliminarydiagnosis' className="Priliminarydiagnosis">Preliminary Diagnosis</Link></BreadcrumbItem>
        <BreadcrumbItem ><Link to='/clinics_near_me' className="Clinics">Clinics</Link></BreadcrumbItem>
        <BreadcrumbItem><Link to='/confirmation_page' className="Confirmation">Confirmation</Link></BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default Example;