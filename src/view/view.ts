import { $ } from '../helper/helper';

export type Details = {
  id: string;
  first: string;
  last: string;
  email: string;
  salary: string;
  date: string;
};

export class View {
  detailsList: HTMLElement | null;
  addBtn: HTMLButtonElement;
  form: HTMLFormElement;
  input: NodeListOf<HTMLInputElement>;
  saveBtn: HTMLElement | null;
  editid: string | null;

  constructor() {
    this.detailsList = this.getElementById('row_entires');
    this.addBtn = this.getElementById('addbtnForm') as HTMLButtonElement;
    this.form = this.getElementById('formTable') as HTMLFormElement;
    this.input = document.querySelectorAll('input');
    this.saveBtn = this.getElementById('savebtnForm');
    this.editBtnEventListner();
    this.displayForm();
    this.closeForm();
    this.editid = null;
  }

  getElementById(id: string) {
    return document.getElementById(id);
  }

  _employeeData() {
    const obj = {
      id: 'null',
      first: this.input[0].value,
      last: this.input[1].value,
      email: this.input[2].value,
      salary: this.input[3].value,
      date: this.input[4].value,
    };
    return obj;
  }

  displayForm() {
    $('addemployee')!.addEventListener('click', function () {
      $('addbtnForm')!.style.display = '';
      $('savebtnForm')!.style.display = 'none';
      $('form')!.style.display = 'block';
    });
  }

  closeForm() {
    $('cancelbtn')!.addEventListener('click', function () {
      $('form')!.style.display = 'none';
    });
  }

  // reseting the form here
  _resetInput() {
    this.input.forEach(function (e) {
      e.value = '';
    });
  }

  displayDetails(details: Details[]) {
    this.detailsList!.innerHTML = '';

    if (details.length === 0) {
      const p = document.createElement('p');
      p.innerHTML = 'No details to display';
      this.detailsList?.append(p);
    } else {
      let i = 1;
      details.forEach((detail: Details) => {
        const newRow = document.createElement('tr');
        newRow.setAttribute('id', detail.id);

        const s_no = i++;
        const col_one = document.createElement('td');
        col_one.append(s_no.toString());

        const col_two = document.createElement('td');
        col_two.append(detail.first);

        const col_three = document.createElement('td');
        col_three.append(detail.last);

        const col_four = document.createElement('td');
        col_four.append(detail.email);

        const col_five = document.createElement('td');
        col_five.append(detail.salary);

        const col_six = document.createElement('td');
        col_six.append(detail.date.toString());

        const editDeleteCol = document.createElement('td');

        const editbtn = document.createElement('button');
        editbtn.classList.add('btn', 'btn-outline-secondary', 'me-1', 'edit');
        editbtn.innerHTML = 'Edit';

        const deletebtn = document.createElement('button');
        deletebtn.classList.add('btn', 'btn-outline-secondary', 'delete');
        deletebtn.innerHTML = 'Delete';

        editDeleteCol.append(editbtn);
        editDeleteCol.append(deletebtn);

        // appending
        newRow.append(col_one);
        newRow.append(col_two);
        newRow.append(col_three);
        newRow.append(col_four);
        newRow.append(col_five);
        newRow.append(col_six);
        newRow.append(editDeleteCol);

        this.detailsList!.append(newRow);
      });
    }
  }
  addBtnEventListener(callback: (arg0: Details) => void) {
    this.addBtn?.addEventListener('click', () => {
      if (this._employeeData()) {
        callback(this._employeeData());
        this._resetInput();
        $('form')!.style.display = 'none';
      }
    });
  }

  deleteBtnEventListner(callback: (arg0: string) => void) {
    this.detailsList!.addEventListener('click', (e) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.classList.contains('delete')) {
        const parent = target.parentElement!.parentElement;
        callback(parent!.id);
      }
    });
  }

  editBtnEventListner() {
    this.detailsList?.addEventListener('click', (e) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.classList.contains('edit')) {
        const parent = target.parentElement!.parentElement;

        $('addbtnForm')!.style.display = 'none';
        $('savebtnForm')!.style.display = 'inline-block';
        $('form')!.style.display = 'block';

        this.editid = parent!.id;
        for (let i = 0; i < 5; i++) {
          this.input![i].value = parent!.children[i + 1].innerHTML;
        }
      }
    });
  }

  saveBtnEventListner(callback: (arg0: string, arg1: Details) => void) {
    this.saveBtn?.addEventListener('click', () => {
      callback(this.editid!, this._employeeData());
      this._resetInput();
      $('form')!.style.display = 'none';
    });
  }
}
