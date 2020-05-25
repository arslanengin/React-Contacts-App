import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.firstname = React.createRef();
    this.lastname = React.createRef();
    this.mail = React.createRef();
    this.phone = React.createRef();

    this.state = { person: {} }

  }

  
  onCreate = () => {

    let person = {
      id: 0,
      firstname: this.firstname.current.value,
      lastname: this.lastname.current.value,
      mail: this.mail.current.value,
      phone: this.phone.current.value
    }
    //  console.log(person); 
    fetch('http://localhost:3001/people', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(person)
    }).then(p => p.json()).then(result => this.setState({ person: result }))


  }

  render() {
    return (<>
      <div className="row mt-5 border rounded shadow-sm pt-2 pb-2">
        <div className="col-12">
          <form className="form-inline">
            <div className="form-group mx-3">
              <label htmlFor="" className="sr-only"> First Name: </label>
              <input type="text" className="form-control" placeholder="FirstName" ref={this.firstname} />
            </div>

            <div className="form-group mx-3">
              <label htmlFor="" className="sr-only"> Last Name: </label>
              <input type="text" className="form-control" placeholder="LastName" ref={this.lastname} />
            </div>

            <div className="form-group mx-3">
              <label htmlFor="" className="sr-only"> Mail: </label>
              <input type="text" className="form-control" placeholder="Mail" ref={this.mail} />
            </div>

            <div className="form-group mx-3">
              <label htmlFor="" className="sr-only"> Phone: </label>
              <input type="text" className="form-control" placeholder="Phone" ref={this.phone} />
            </div>

            <button type="button" className="btn btn-success btn-sm" onClick={this.onCreate}> Save </button>
          </form>


        </div>
      </div>

      <div className="row mt-3 border rounded shadow-sm pt-2 pb-2">
        <div className="col mt-3 ">
          <PeopleList people={this.state.person} > </PeopleList>
        </div>
      </div>

    </>)
  }
}

class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    }
  }

  loadData = () => {
    fetch('http://localhost:3001/people').then(response => response.json())
      .then(response => this.setState({ people: response }));
  }

  onDelete = (x) => {
    fetch('http://localhost:3001/people/' + x, {
      method: 'delete',
      headers: { 'Content-type': 'application/json' }
    }).then(p => p.json()).then(result => {
      if(result){
        this.loadData();
      }
    })
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(props) {
    this.setState({ people: [...this.state.people, props.people] })
  }
  render() {
    if (this.state.people.length > 0) {
      return (
        <div className="row mt-3 border rounded shadow-sm pt-2 pb-2">
          <div className="col mt-3 ">
            <table className="table">
              <thead>
                <tr>
                  <th className="d-none">id</th>
                  <th>FirstName</th>
                  <th>Telephone</th>
                  <th> Mail</th>
                  <th> Phone</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>

                {
                  this.state.people.map((x) => <tr key={x.id}>
                    <td>{x.firstname}</td>
                    <td>{x.lastname}</td>
                    <td>{x.mail}</td>
                    <td>{x.phone}</td>
                    <td><button type="button" className="btn shadow-sm text-danger" onClick={()=>this.onDelete(x.id)}>  <FontAwesomeIcon icon={faTrash} /> </button></td>
                  </tr>)
                }


              </tbody>
            </table>
          </div>

        </div>
      )
    }
    else {
      return (<> <span className="badge badge-warning text-center p-2 btn-block"> Lütfen kayıt giriniz</span></>)
    }
  }
}
export default App;
