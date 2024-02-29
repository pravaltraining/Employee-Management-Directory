import { Model } from '../model/model';
import { Details, View } from '../view/view';

export class Controller {
  model: Model;
  view: View;
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.view.addBtnEventListener(this.controlAddDetails);
                                                                        
    // this.view.addBtnEventListener(this.controlAddDetails.bind(this));
    this.view.deleteBtnEventListner(this.controlDeleteDetail);
    this.view.saveBtnEventListner(this.controlEditDetail);             

    this.model.onDataChange(this.onDetailsListChanged);

    // displaying the initial details
    this.onDetailsListChanged(this.model.details);
  }

  onDetailsListChanged = (details: any) =>{
    this.view.displayDetails(details);
  }

  controlAddDetails=(details: any)=> {
    this.model.addDetails(details);
  }
  controlDeleteDetail=(id: string)=> {
    this.model.deleteData(id);
  }
  controlEditDetail=(
    id: string,
    details: Details,)=> {
    this.model.editDetails(id, details);
    console.log('edit btn hit');
  }
}
