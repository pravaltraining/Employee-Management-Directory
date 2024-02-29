import { loadDetails, setDetails } from "../services/localStorageService";
import { Details } from "../view/view";

export class Model {
    details: Details[];
    onDetailsListChanged: any;
    constructor() {
      this.details = loadDetails();
    }
  
    // setting the data in the local storage
    _set(details: Details[]) {
      this.onDetailsListChanged(details);
      setDetails(details);
    }
  
    // add data
    addDetails(empDetails: Details) {
      const data = {
        id: Date.now().toString(),
        sno: this.details.length > 0 ? this.details.length : 1,
        first: empDetails.first,
        last: empDetails.last,
        email: empDetails.email,
        salary: empDetails.salary,
        date: empDetails.date,
      };
      this.details.push(data);
  
      // set to local storage here
      this._set(this.details);
    }
    // edit data function here
    editDetails(id: string, empDetails: { first: string; last: string; email: string; salary: string; date: string; }) {
      let data   = this.details.find((obj) => obj.id == id);
      data!.first = empDetails.first;
      data!.last = empDetails.last;
      data!.email = empDetails.email;
      data!.salary = empDetails.salary;
      data!.date = empDetails.date;
  
      this._set(this.details);
    }
  
    // delete data
    deleteData(id: string) {
      console.log(id, 'delete in view');
      console.log('Before Delete', this.details);
      this.details = this.details.filter((data: Details) => data.id != id);
  
      console.log('After delete', this.details);
      this._set(this.details);
    }
  
    // when the data is changes notify the controller
    onDataChange(callback: (details: Details) => void) {
      this.onDetailsListChanged = callback;
    }
  }