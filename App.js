import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, DevSettings } from 'react-native'

import ListaAlunos from './src/Componentes/ListaAlunos'
import Database from './src/Database/Database';
import Aluno from './src/Models/Aluno';

export default class App extends Component 
{

  constructor(props) {
    super(props);
    this.state = {
      nome: "", 
      disciplina: "",
      nota: 0,
      listaAlunos: []
    }
    this.ListarAlunos()
  }

  ListarAlunos() {
    const banco = new Database();
    banco.Listar().then( data => {this.setState({ listaAlunos: data })})
  }

  CadastrarAluno(nome, disciplina, nota) {
    const novoAluno = new Aluno(nome, disciplina, nota);
    const banco = new Database();
    banco.Inserir(novoAluno);
    this.ListarAlunos();
  }

  DeletarAluno(id) {
    const banco = new Database();
    banco.Deletar(id);
    DevSettings.reload();
  }

  AprovarAluno(id) {
    const banco = new Database();
    banco.Aprovar(id);
    DevSettings.reload();    
  }

  ReprovarAluno(id) {
    const banco = new Database();
    banco.Reprovar(id);
    DevSettings.reload();
  }

  render(){
    return(
      <ScrollView>
        <Text style={{fontSize: 20}}>Cadastro de Notas</Text>

        <TextInput onChangeText={(valorInformado) => {this.setState({ nome: valorInformado})}} placeholder="Nome do aluno" />
        <TextInput onChangeText={(valorInformado) => {this.setState({ disciplina: valorInformado})}} placeholder="Disciplina" />
        <TextInput onChangeText={(valorInformado) => {this.setState({ nota: valorInformado})}} placeholder="Nota" />
        <Button title="Cadastrar" onPress={ () => { this.CadastrarAluno(this.state.nome, this.state.disciplina, this.state.nota) } }></Button>

        <Text style={{fontSize: 20}}>Lista de Notas</Text>
        <Text></Text>


        {
          this.state.listaAlunos.map( item => (<ListaAlunos key={item.id} id={item.id} nome={item.nome} aprovado={item.aprovado} disciplina={item.disciplina} nota={item.nota} deletar={this.DeletarAluno} aprovar={this.AprovarAluno} reprovar={this.ReprovarAluno} />) )
        }


      </ScrollView>
    )
  }

}