import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./deleteEmployeeModal";
import WeatherProject from "./Weatherproject";

class App extends Component {
  state = {
    employee: [],
    data_source: [],
    isAddEmployeeModalOpen: false,
    isEditEmployeeModalOpen: false,
    isDeleteEmployeeModalOpen: false,
    loading: false,
    errorMessage: "",
    selectedEmployee: {},
  };

  componentDidMount() {
  console.log('--------------------------------------------get------------------------------------------');
   // this.getData();

   this.getTestData();

  console.log('--------------------------------------------get data done--------------------------------');
    
  }

  getTestData = async () => {
    this.setState({ errorMessage: "", loading: true });
    let response = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    );
    let json = await response.json();
    console.log(JSON.stringify(json));
    return this.setState({
              employee: json,
              loading: true,
              errorMessage: "",
            });
             

    
  //   this.setState({ errorMessage: "", loading: true });
  // let response= await fetch("https://jsonplaceholder.typicode.com/posts", {
  //     method: "GET",
  //     header: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then((response) => {
  //       console.log('----------------------------------------resData ---------------------------------');
  //       response.json()})
  //     .then((json) => {
  //   //   console.log(JSON.stringify(json));
  //   let json = await response.json();
  //       this.setState({
  //         employee: json,
  //         loading: true,
  //         errorMessage: "",
  //       });
  //     }
  //     )

      // console.log('----------------------------------------resJSON ---------------------------------');
      // let json = await response.json();
      // console.log(json);


    
  // fetch('https://jsonplaceholder.typicode.com/posts').then((response)=>response.json()).then((json)=>
  //  console.log(json),
  //   ).catch((error)=>console.log(error))
};
  getData = () => {
    this.setState({ errorMessage: "", loading: true });
    fetch("http://dummy.restapiexample.com/api/v1/employees", {
      method: "GET",
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        console.log('----------------------------------------resData ---------------------------------');
        res.json()})
      .then((res) => {
       console.log(JSON.stringify(res));
       console.log('----------------------------------------resJSON ---------------------------------');
        this.setState({
          employee: res,
          loading: true,
          errorMessage: "",
        });
      }
      )
      .catch((error) =>
        this.setState({
          loading: true,
          errorMessage: "Network Error. Please try again....",
        }),
      );

    
  // fetch('http://dummy.restapiexample.com/api/v1/employees').then((response)=>response.json()).then((json)=>
  //  console.log(json),
  //   ).catch((error)=>console.log(error))
};





  toggleAddEmployeeModal = () => {
    this.setState({
      isAddEmployeeModalOpen: !this.state.isAddEmployeeModalOpen,
    });
  };

  toggleEditEmployeeModal = () => {
    this.setState({
      isEditEmployeeModalOpen: !this.state.isEditEmployeeModalOpen,
    });
  };

  toggleDeleteEmployeeModal = () => {
    this.setState({
      isDeleteEmployeeModalOpen: !this.state.isDeleteEmployeeModalOpen,
    });
  };

  addEmployee = (data) => {
    // this.state.employee array is seprated into object by rest operator
    this.setState({ employee: [data, ...this.state.employee] });
  };

  updateEmployee = (data) => {
    // updating employee data with updated data if employee id is matched with updated data id
    this.setState({
      employee: this.state.employee.map((emp) =>
        emp.id == data.id ? data : emp
      ),
    });
  };

  deleteEmployee = (employeeId) => {
    // delete employee lsit with deleted data if employee id is matched with updated data id
    this.setState({
      employee: this.state.employee.filter((emp) => emp.id !== employeeId),
    });
  };

  render() {
    const {
      loading,
      errorMessage,
      employee,
      isAddEmployeeModalOpen,
      isEditEmployeeModalOpen,
      isDeleteEmployeeModalOpen,
      selectedEmployee,
    } = this.state;
    return (
      // <WeatherProject/>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.toggleAddEmployeeModal}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add employee</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Emloyee Lists:</Text>
            {/* {
              Object.keys(this.state.employee).map( (data,index) => 
                {
                 
                  
                  // LOG  status
                  // LOG  data {"status":"success",
                  // "data":[{"id":1,"employee_name":"Tiger Nixon","employee_salary":320800,"employee_age":61,"profile_image":""}]}
                  // LOG  message
                }
              )
            } */}

{this.state.employee.map((data, index) => (
  <View style={styles.employeeListContainer} key={data.id}>
    <Text style={{ ...styles.listItem, color: "tomato" }}>
      {index }+ {data.id}.
    </Text>
    <Text style={styles.name}>{data.employee_name}</Text>
    <Text style={styles.listItem}>
      employee age: {data.employee_age} + {data.title}
    </Text>
    <Text style={styles.listItem}>
      employee salary: {data.employee_salary} + {data.body}
    </Text>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          this.toggleEditEmployeeModal();
          this.setState({ selectedEmployee: data.id });
        }}
        style={{ ...styles.button, marginVertical: 0 }}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          this.toggleDeleteEmployeeModal();
          this.setState({ selectedEmployee: data });
        }}
        style={{
          ...styles.button,
          marginVertical: 0,
          marginLeft: 10,
          backgroundColor: "tomato",
        }}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
))}

          {loading ? (
            <Text style={styles.message}>Please Wait...</Text>
          ) : errorMessage ? (
            <Text style={styles.message}>{errorMessage}</Text>
          ) : null}

          {/* AddEmployeeModal modal is open when add employee button is clicked */}
          {isAddEmployeeModalOpen ? (
            <AddEmployeeModal
              isOpen={isAddEmployeeModalOpen}
              closeModal={this.toggleAddEmployeeModal}
              addEmployee={this.addEmployee}
            />
          ) : null}

          {/* EditEmployeeModal modal is open when edit button is clicked in particular employee list*/}
          {isEditEmployeeModalOpen ? (
            <EditEmployeeModal
              isOpen={isEditEmployeeModalOpen}
              closeModal={this.toggleEditEmployeeModal}
              selectedEmployee={selectedEmployee}
              updateEmployee={this.updateEmployee}
            />
          ) : null}

          {/* DeleteEmployeeModal modal is open when delete button is clicked in particular employee list*/}
          {isDeleteEmployeeModalOpen ? (
            <DeleteEmployeeModal
              isOpen={isDeleteEmployeeModalOpen}
              closeModal={this.toggleDeleteEmployeeModal}
              selectedEmployee={selectedEmployee}
              updateEmployee={this.deleteEmployee}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  employeeListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "tomato",
    fontSize: 17,
  },
});
