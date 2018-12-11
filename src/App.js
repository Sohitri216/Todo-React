import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: [] };
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.getCheckedElem = this.getCheckedElem.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }
  addItem(e) {
    if (e.keyCode === 13 || e.keyCode === undefined) {

      (document.getElementById('text') && document.getElementById('text').value !== "") ? this.state.item.push({
        value: document.getElementById('text').value,
        selected: false,
        edit: false
      }) : '';
      this.setState({
        item: this.state.item
      });
      document.getElementById('text').value = '';
    }
  }
  deleteItem(idx) {
    this.setState((state) => {
      state.item.splice(idx, 1);
      return {
        item: state.item
      };
    })
    console.log('after splice:', this.state);
  }
  editItem(idx) {
    this.setState((state) => {
      state.item[idx].edit = true;
      return {
        item: state.item
      };
    });

  }

  saveItem(idx) {
    this.setState((state) => {
      state.item[idx].edit = false;
      state.item[idx].selected = false;
      state.item[idx].value = document.getElementById('editText').value;
      return {
        item: state.item
      }
    })
  }

  getCheckedElem(idx) {
    console.log('checked Item:', idx);
    this.setState((state) => {
      // state.item[idx].selected = state.item[idx].selected ? false : true;
      if (state.item[idx].selected) {
        state.item[idx].selected = false;
        state.item[idx].edit = false;
      }
      else {
        state.item[idx].selected = true;
      }
      return {
        item: state.item
      };
    });

  }
  render() {
    return (
      <div className="mainWrapper">
        <div className="outerWrapper">
          <h3 className="heading">TODO List</h3>
          <input className="input-box" id="text" type="text" onKeyDown={this.addItem} placeholder="Enter here.." />
          <button className="add-button" onClick={this.addItem}>Add</button>
          <ul className="todo-list">{
            this.state.item.map((item, index) => {
              return (
                <React.Fragment key={'val' + index}>
                  <li id={'item' + index}>
                    <input type="checkbox" id={'checkbox' + index} name="todoItem" checked={item.selected} onChange={this.getCheckedElem.bind(this, index)} />
                    <span>{item.edit ? <input id="editText" type="text" /> : item.value}</span>
                    <span>{(item.selected && !item.edit) ? <button className="edit-button" onClick={this.editItem.bind(this, index)}>Edit</button> : ''}</span>
                    <span>{(item.edit) ? <button className="edit-button" onClick={this.saveItem.bind(this, index)}>Save</button> : ''}</span>
                    <span>{item.selected ? <button onClick={this.deleteItem.bind(this, index)}>Delete</button> : ''}</span>
                  </li>
                </React.Fragment>
              )
            })
          }</ul>
        </div>
      </div>
    );
  }
}

export default App;
