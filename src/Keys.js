import "./styles.css";
import React from "react";
import { Button } from "./buttons.js";

export class Keys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      data: 0,
      operator: null,
      change: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleClick(value, opt) {
    //console.log(opt);
    if (this.state.change && opt !== 4) {
      this.setState({ change: false });
    }
    //Figures out number
    if (opt === 0) {
      if (this.state.data === 0) {
        if (value === 0) {
          return;
        }
        this.setState({ data: value });
      } else {
        let num = this.state.data * 10 + value;
        this.setState({ data: num });
      }
    } else if (opt !== 4 && opt !== 6) {
      //All operators besides negative/positive and equal
      if (this.state.total === null) {
        this.setState({ total: this.state.data, data: 0 });
      }
      switch (opt) {
        case 1:
          this.setState({ operator: "sub" });
          break;
        case 2:
          this.setState({ operator: "add" });
          break;
        case 3:
          this.setState({ operator: "mul" });
          break;
        case 5:
          this.setState({ operator: "div" });
          break;
        default:
          break;
      }
    } else if (opt === 6) {
      //Equal sign
      if (this.state.total === null) {
        return;
      }
      let num;
      switch (this.state.operator) {
        case "sub":
          num = this.state.total - this.state.data;
          this.setState({ change: true, total: num, data: 0 });
          break;
        case "add":
          num = this.state.total + this.state.data;
          //console.log(num);
          this.setState({ change: true, total: num, data: 0 });
          break;
        case "mul":
          num = this.state.total * this.state.data;
          this.setState({ change: true, total: num, data: 0 });
          break;
        case "div":
          if (this.state.data === 0) {
            this.setState({ change: true });
            break;
          }
          num = this.state.total / this.state.data;
          this.setState({ change: true, total: num, data: 0 });
          break;
        default:
          break;
      }
    } else if (opt === 4) {
      let num;
      if (this.state.change === true) {
        num = this.state.total * -1;
        this.setState({ total: num });
        return;
      }
      num = this.state.data * -1;
      this.setState({ data: num });
    }
  }
  clear() {
    if (this.state.change) {
      this.reset();
      return;
    }
    this.setState({
      data: 0,
      change: false,
      operator: null
    });
  }
  reset() {
    this.setState({
      total: null,
      data: 0,
      operator: null,
      change: false
    });
  }
  display() {
    const rows = [
      [1, 2, 3, "-"],
      [4, 5, 6, "+"],
      [7, 8, 9, "*"],
      ["+ / -", 0, "/", "="]
    ];
    const opt = [
      [0, 0, 0, 1],
      [0, 0, 0, 2],
      [0, 0, 0, 3],
      [4, 0, 5, 6]
    ];
    let content = [];
    for (let i = 0; i < rows.length; i++) {
      content.push(
        <div>
          {rows[i].map((value, index) => (
            <Button
              key={value}
              onClick={() => this.handleClick(value, opt[i][index])}
              value={value}
            />
          ))}
        </div>
      );
    }
    return content;
  }
  render() {
    return (
      <div className="App">
        <h1>Calculator</h1>
        {this.display()}
        <h2>Value: {this.state.change ? this.state.total : this.state.data}</h2>
        <Button onClick={() => this.clear()} value="Clear" />
        <Button onClick={() => this.reset()} value="Reset" />
      </div>
    );
  }
}
