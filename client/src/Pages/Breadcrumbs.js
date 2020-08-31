import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Example = (props) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem><a href='./' className="Home">Team falcon</a></BreadcrumbItem>
        <BreadcrumbItem><a href='./Personal_info' className="Info">Info</a></BreadcrumbItem>
        <BreadcrumbItem ><a href='./Symptoms'className="Symptoms">Symptoms</a></BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default Example;