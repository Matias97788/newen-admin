
import './App.css';
import React, { Component } from 'react';
import firebase from './database/firebase';
import 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'materialize-css/dist/css/materialize.min.css';
import './componentes/Navbar/Navbar.css'
import Navbar from './componentes/Navbar/Navbar'
import {Modal, Container, Table, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';



class App extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form: {
      palabra: '',
      significado: '',
      pronunciacion: ''
    },
    id: 0
  };

  


  peticionGet = () => {
    firebase.child('Traductor').on('value', (palabra) => {

      if(palabra.val()!==null) {

        this.setState({...this.state.data, data: palabra.val() });
      } else {
        this.setState({data: [] });
      }

    });
  };


  componentDidMount() {
    this.peticionGet();
  }


  peticionPost = () => {

    firebase.child("Traductor").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut = () => {
    firebase.child(`Traductor/${this.state.id}`).set(this.state.form,error=>{
      if(error)console.log(error)
    });
    this.setState({modalEditar: false});
  }

  seleccionarPalabra = async(palabra, id, caso ) => {

    await this.setState({form: palabra, id: id});
    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  peticionDelete=()=> {
    if(window.confirm(`¿Estás seguro que quieres eliminar esta palabra? ${this.state.form && this.state.form.palabra}?`))
    {
    firebase.child(`Traductor/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });

    }
  }


  handleChange = e =>{
    this.setState({form:{
      ...this.state.form,[e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  

  render () {
    return (



<div className="text-center">
  <Navbar/>

<br/>
<button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>

<br/>
<br/>
<Container>
<table  className="table table-bordered">
        <thead>
          <tr>
              <th>Palabra</th>
              <th>Significado</th>
              <th>Pronunciación</th>
              <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(this.state.data).map(i => {
            return <tr key = {i}>
              <td>{this.state.data[i].palabra}</td>
              <td>{this.state.data[i].significado}</td>
              <td>{this.state.data[i].pronunciacion}</td>
              
              <td>
                <button className="btn btn-primary" onClick={()=>this.seleccionarPalabra(this.state.data[i], i, 'Editar')} >Editar</button>
                <button className="btn btn-danger" onClick={()=>this.seleccionarPalabra(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
              </td>

            </tr>
          })}
        </tbody>
      </table>

      </Container>





          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader> Insertar Registro de palabra</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Palabra: </label>
                <br/>
                <input type="text" className="form-control" name="palabra" onChange={this.handleChange}/>
                <br/>
                <label>Significado: </label>
                <br/>
                <input type="text" className="form-control" name="significado" onChange={this.handleChange}/>
                <br/>
                <label>Pronunciación: </label>
                <br/>
                <input type="text" className="form-control" name="pronunciacion" onChange={this.handleChange}/>
                <br/>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() =>this.peticionPost()}>Insertar</button>
              <button className="btn btn-danger" onClick={() => this.setState({modalInsertar: false})}>Cancelar</button>
            </ModalFooter>
          </Modal>



          <Modal isOpen={this.state.modalEditar}>
            <ModalHeader> Editar Palabra</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Palabra: </label>
                <br/>
                <input type="text" className="form-control" name="palabra" onChange={this.handleChange} value={this.state.form && this.state.form.palabra}/>
                <br/>
                <label>Significado: </label>
                <br/>
                <input type="text" className="form-control" name="significado" onChange={this.handleChange} value={this.state.form && this.state.form.significado}/>
                <br/>
                <label>Pronunciación: </label>
                <br/>
                <input type="text" className="form-control" name="pronunciacion" onChange={this.handleChange} value={this.state.form && this.state.form.pronunciacion}/>
                <br/>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() =>this.peticionPut()}>Editar</button>
              <button className="btn btn-danger" onClick={() => this.setState({modalEditar: false})}>Cancelar</button>
            </ModalFooter>
          </Modal>








</div>



    );
  }
}

export default App;