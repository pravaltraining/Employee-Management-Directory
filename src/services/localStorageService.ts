import { Details } from './../view/view';


export function setDetails(details: Details[] ) {
    localStorage.setItem('DETAILS', JSON.stringify(details));
  }
  
  // getting tasks from LS
  export function loadDetails(): Details[] {
    const DETAILSJSON = localStorage.getItem('DETAILS');
    if (DETAILSJSON == null) return [];
    return JSON.parse(DETAILSJSON);
  }