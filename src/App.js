import React from 'react';
import './App.css';
import ClothesList from './components/ClothesList'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      token: "",
      email: "",
      password: "",
      name: "guest",
      role: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleLogin(event) {
    event.preventDefault();
    let test = new FormData(event.target);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({ "email": `${test.get("email")}`, "password": `${test.get("password")}` });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let data = await fetch("http://localhost:8080/customer/login", requestOptions)
      .then(response => {
        if (response.status > 399) throw new Error("Error login");
        return response.text()
      })
      .catch(error => alert(error));

    if (data) {
      let user = JSON.parse(data);
      console.table(user);
      let {name, email, password, role} = user.customer;
      this.setState({
        isLogged: true,
        token: user.token,
        name,
        email,
        password,
        role
      });
      console.table(this.state);
    } else {
      return;
    }
  }

  handleLogout() {
    this.setState({
      isLogged: false,
      token: "",
      email: "",
      password: "",
      name: "guest",
      role: ""
    });
    alert("Logged out");
  }

  async handleRegister(event) {
    event.preventDefault();
    let test = new FormData(event.target);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"name":`${test.get('name')}`, "email": `${test.get("email")}`, "password": `${test.get("password")}` });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let data = await fetch("http://localhost:8080/customer/register", requestOptions)
      .then(response => {
        if (response.status > 299) throw new Error("Error register");
        return response.text()
      })
      .catch(error => alert(error));

    if (data) {
      let user = JSON.parse(data);
      console.table(user);
      let {name, email, password, role} = user.customer;
      this.setState({
        isLogged: true,
        token: user.token,
        name,
        email,
        password,
        role
      });
      console.table(this.state);
    } else {
      return;
    }
  }

  render() {
    let form1;
    let form2;
    if(!this.state.isLogged) {
      form1 =
        <form onSubmit={this.handleLogin}>
          <label>
            Email:
          <input type="text" placeholder="example@mail.com" name='email' required />
          </label>
          <label>
            Password:
          <input type="text" placeholder="1234" name='password' required />
          </label>
          <input type="submit" value="Log in"/>
        </form>;
        form2 = 
        <form onSubmit={this.handleRegister} style={{marginTop: "20px"}}>
          <label>
            Name:
          <input type="text" placeholder="Username" name='name' required />
          </label>
          <label>
            Email:
          <input type="text" placeholder="example@mail.com" name='email' required />
          </label>
          <label>
            Password:
          <input type="text" placeholder="1234" name='password' required />
          </label>
          <input type="submit" value="Register"/>
        </form>;
    } else {
      form1 = <button onClick={this.handleLogout} style={{display: "block"}}>Log out</button>
    }

    return (
      <div className="App">
        <h1>Hello {this.state.name}</h1>
        {form1}
        {form2}
        <ClothesList role={this.state.role}/>
      </div>
    );
  }
}

export default App;
