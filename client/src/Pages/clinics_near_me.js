import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { ROUTES } from "../routes";
import NumGenerator from "../components/NumGenerator";
import "bootstrap/dist/css/bootstrap.css";


const list = [
    {
        id:'1',
        name: 'Downtown Doctors Walk In Medical Clinic',
        distance: "0.2 mil",
        address: '720 Spadina Ave #100, Toronto, ON M5S 2T9',
        hours: '9:30 a.m.-5p.m. Monday - Friday',
        phone: '(416) 929-1530',
        website: '',
        data: [{ x: 1, y: 13 }, { x: 2, y: 10 }, { x: 3, y: 20 }],
    },
    {
        id:'2',
        name: 'MCI The Doctors Office Atrium',
        distance: "0.8 mil",
        address: '595 Bay St, Toronto, ON M5G 2C2',
        hours: '9:00a.m.-6p.m. Monday - Friday',
        phone: '(416) 598-1703',
        website: 'https://mcithedoctorsoffice.ca/locations/atrium',
    },
    {
        id:'3',
        name: 'Patient Networks Family Medicine Walk In Clinic',
        address: '157 Yonge St, Toronto, ON M5C 1X7',
        distance: "2.1 mil",
        hours: '9:00a.m.-4p.m. Monday - Friday',
        phone: '(416) 362-8822',
        website: 'http://www.patientnetworks.ca/',
    },
    {
        id:'4',
        name: 'Cloud Care Clinics',
        address: '55 Dundas St E, Toronto, ON M5B 1C6',
        distance: "2.5 mil",
        hours: '9:30a.m.-5p.m. Monday - Friday',
        phone: '(416) 361-6000',
        website: 'http://cloudcareclinics.ca/',
    },
    {
        id:'5',
        name: 'Primacy - Carlton & Church Medical & Walk-In Clinic',
        address: '60 Carlton St, Toronto, ON M5B 1J2',
        distance: "4.0 mil",
        hours: '9:30a.m.-4:30p.m. Monday - Friday',
        phone: '(416) 646-1890',
        website: 'http://www.primacyclinics.ca/locations/carlton-and-church/',
    },
    {
        id:'6',
        name: 'Yonge Medical Centre',
        address: '500 Yonge St #300, Toronto, ON M4Y 1X9',
        distance: "4.8 mil",
        hours: '9:30a.m.-5p.m. Monday - Friday',
        phone: '(888) 350-2323',
        website: '',
    },
    {
        id:'7',
        name: 'Sanomed Medical Clinic',
        address: '1000 Bay St A, Toronto, ON M5S 3A8',
        distance: "5.0 mil",
        hours: '9:30a.m.-5p.m. Monday - Friday',
        phone: '(416) 923-7770',
        website: 'http://sanomedclinic.ca/',
    },
];

class Clinics extends React.Component{
    render(){
        return(
        <React.Fragment>
            <h1 class= "title">Closest Walk-In Medical Facilities:</h1>
            <List list={list} />
        </React.Fragment>
        );
    }
}
 
const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);
/*
function MyChart( item ){

    const data = React.useMemo(
        () => [
          {
            label: 'Series 1',
            data: [item.data]
          },
        ],
        []
      )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
}
*/
const ListItem = ({ item  }) => (
    
    <React.Fragment>
        <Container class="shadow p-3 mb-5 bg-white rounded" style={{paddingBottom: '5vh'}}>
        <div class = "shadow p-3 mb-5 bg-white rounded">
            <Card  style={{padding: '5vw'}}>
                <div><p style={{fontSize: '125%', fontWeight: 'bold'}}>{item.name} <span style={{color: "gray"}}><text style={{fontSize: '40%', color: "gray"}}>{'\u2B24'}</text> {item.distance}</span></p></div>
                <div>
                    <span style={{fontWeight: 'bold'}}>Address: </span>{item.address}
                    <span style={{float: "right", fontWeight: "bold"}}>Estimated Wait Time:</span>
                </div>
                <div>
                    <span style={{fontWeight: 'bold'}}>Hours: </span>
                    {item.hours}
                    <span style={{float: "right", fontWeight: "bold", fontSize: "110%"}}> <NumGenerator /> Minutes</span>
                </div>
                <div>
                    <span style={{fontWeight: 'bold'}}>Phone: </span>
                    {item.phone}
                </div>
                <div>
                    {item.website.length > 0 && <span style={{fontWeight: 'bold'}}>Website: <a href={item.website} >{item.website}</a></span>}
                    <Link to={ROUTES.CONFIRMATION}>
                        <Button 
                            style={{float: "right", borderRadius: '2vh', background: "#789E9E"}} 
                            variant="secondary" 
                            type="submit" 
                            size="lg">
                            Reserve Appointment
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>    
        </Container>
    </React.Fragment>
);

export default Clinics