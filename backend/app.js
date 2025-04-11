const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config()
require("./conn/conn")
const User = require("./Routes/User")
const Book = require("./Routes/Book")
const Library = require("./Routes/Library")
const borrower = require("./Routes/Borrower")

app.use(cors())
app.use(express.json())

//routes
app.use("/api/users", User)
app.use("/api/books", Book)
app.use("/api/libraries", Library)
app.use("/api/borrow", borrower)

const port = process.env.PORT 
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
    
})

// const selectcountry = document.getElementById("selectcountry");
// const selectstate = document.getElementById("selectstate");
// const selectcity = document.getElementById("selectcity");
// const toperrmessage = document.getElementById("top-message");
// const errorcolour = document.querySelectorAll(".error");
// const nameerrmessage = document.getElementById("name-message");
// const emailerrmessage = document.getElementById("email-message");
// const gendererrmessage = document.getElementById("gender-message");
// const hobbieserrmessage = document.getElementById("hobbies-message");
// const countryerrmessage = document.getElementById("country-message");
// const stateerrmessage = document.getElementById("state-message");
// const cityerrmessage = document.getElementById("city-message");
// const bookform = document.getElementById("form-data");
// const searchbox = document.getElementById("search");
// const sortvalue = document.getElementById("sortbyname");

// errorcolour.forEach((item) => {
//     return (item.style.color = "red");
// });

// document.getElementById("name").addEventListener("input", () => validation());
// document.getElementById("email").addEventListener("input", () => validation());
// document.getElementById("male").addEventListener("input", () => validation());
// document.getElementById("female").addEventListener("input", () => validation());

// document.querySelectorAll('input[name="hobbies"]').forEach((input) => {
//     input.addEventListener("input", () => validation());
// });
// selectcountry.addEventListener("input", () => validation());
// selectstate.addEventListener("input", () => validation());
// selectcity.addEventListener("input", () => validation());
// searchbox.oninput = searchbyname;

// const getgender = (gender) => {
//     const radiobtn = document.getElementsByName(gender);
//     let value;
//     for (let i = 0; i < radiobtn.length; i++) {
//         if (radiobtn[i].checked) {
//             value = radiobtn[i].value;
//             break;
//         }
//     }
//     return value;
// };

// const gethobbies = (hobbies) => {
//     const checkboxbtn = document.getElementsByName(hobbies);
//     let arr = [];
//     for (let i = 0; i < checkboxbtn.length; i++) {
//         if (checkboxbtn[i].checked) {
//             arr.push(checkboxbtn[i].value);
//         }
//     }
//     return arr;
// };

// const validation = () => {
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let gender = document.querySelector('input[name="gender"]:checked')?.value;
//     let hobbies = gethobbies("hobbies");
//     let country = selectcountry.value;
//     let state = selectstate.value;
//     let city = selectcity.value;

//     if (!name || name.length < 3) {
//         nameerrmessage.textContent = "Length should be greater than 3";
//     } else {
//         nameerrmessage.textContent = "";
//     }
//     if (!regex.test(email)) {
//         emailerrmessage.textContent = "Enter a valid email";
//     } else {
//         emailerrmessage.textContent = "";
//     }
//     if (!gender) {
//         gendererrmessage.textContent = "Select at least one gender";
//     } else {
//         gendererrmessage.textContent = "";
//     }
//     if (hobbies.length === 0) {
//         hobbieserrmessage.textContent = "Select at least one hobby";
//     } else {
//         hobbieserrmessage.textContent = "";
//     }
//     if (!country) {
//         countryerrmessage.textContent = "Select at least one country";
//     } else {
//         countryerrmessage.textContent = "";
//     }
//     if (!state) {
//         stateerrmessage.textContent = "Select at least one state";
//     } else {
//         stateerrmessage.textContent = "";
//     }
//     if (!city) {
//         cityerrmessage.textContent = "Select at least one city";
//     } else {
//         cityerrmessage.textContent = "";
//     }
// };

// for (const key in selectdataarray) {
//     let option = document.createElement("option");
//     option.setAttribute("value", key);
//     let optiontext = document.createTextNode(key);
//     option.appendChild(optiontext);
//     selectcountry.appendChild(option);
// }
// const updatestate = (country, state) => {
//     const data = selectdataarray[country];
//     // console.log(data);
//     selectstate.innerHTML = "<option value=''>Select state</option>";
//     selectcity.innerHTML = "<option value=''>Select city</option>";

//     for (const key in data) {
//         // console.log(key);
//         let option = document.createElement("option");
//         option.value = key;
//         let optiontext = document.createTextNode(key);
//         option.appendChild(optiontext);
//         selectstate.appendChild(option);
//     }
//     selectstate.value = state;
// };

// const updatecity = (country, state, city) => {
//     const citydata = selectdataarray[country][state];
//     // console.log(citydata);

//     for (const key of citydata) {
//         let option = document.createElement("option");
//         option.value = key;
//         let optiontext = document.createTextNode(key);
//         option.appendChild(optiontext);
//         selectcity.appendChild(option);
//     }
//     selectcity.value = city;
// };

// selectcountry.addEventListener("change", (e) => {
//     let selectedcountry = e.target.value;
//     selectstate.innerHTML = "<option value=''>Select state</option>";
//     selectcity.innerHTML = "<option value=''>Select city</option>";

//     if (selectedcountry) {
//         for (const key in selectdataarray[selectedcountry]) {
//             let option = document.createElement("option");
//             option.setAttribute("value", key);
//             let optiontext = document.createTextNode(key);
//             option.appendChild(optiontext);
//             selectstate.appendChild(option);
//         }
//     }
// });

// selectstate.addEventListener("change", (e) => {
//     let selectedcountry = selectcountry.value;
//     let selectedstate = e.target.value;

//     selectcity.innerHTML = "<option value=''>Select city</option>";

//     if (selectedcountry && selectedstate) {
//         for (const key of selectdataarray[selectedcountry][selectedstate]) {
//             let option = document.createElement("option");
//             option.setAttribute("value", key);
//             let optiontext = document.createTextNode(key);
//             option.appendChild(optiontext);
//             selectcity.appendChild(option);
//         }
//     }
// });

// const usersarray = [
//     {
//         id: 5,
//         city: "Phoenix",
//         country: "USA",
//         date: "08/04/2025, 10:26:15",
//         email: "surajpr.tagline@gmail.com",
//         gender: "male",
//         hobby: ["Reading", "Travelling"],
//         name: "mohan",
//         state: "Arizona",
//     },
//     {
//         id: 4,
//         city: "Phoenix",
//         country: "USA",
//         date: "08/04/2025, 10:26:15",
//         email: "surajpr.tagline@gmail.com",
//         gender: "male",
//         hobby: ["Reading", "Travelling"],
//         name: "rohan",
//         state: "Arizona",
//     },
//     {
//         id: 3,
//         city: "Phoenix",
//         country: "USA",
//         date: "08/04/2025, 10:26:15",
//         email: "surajpr.tagline@gmail.com",
//         gender: "male",
//         hobby: ["Reading", "Travelling"],
//         name: "suraj",
//         state: "Arizona",
//     },
//     {
//         id: 1,
//         city: "Phoenix",
//         country: "USA",
//         date: "08/04/2025, 10:26:15",
//         email: "surajpr.tagline@gmail.com",
//         gender: "male",
//         hobby: ["Reading", "Travelling"],
//         name: "Aeepak",
//         state: "Arizona",
//     },
//     {
//         id: 2,
//         city: "Phoenix",
//         country: "USA",
//         date: "08/04/2025, 10:26:15",
//         email: "surajpr.tagline@gmail.com",
//         gender: "male",
//         hobby: ["Reading", "Travelling"],
//         name: "aeepak",
//         state: "Arizona",
//     },
// ];

// document.addEventListener("DOMContentLoaded", (e) => {
//     loadtable();
// });

// let editingindex = null;

// submitbtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     let name = document.getElementById("name");
//     let email = document.getElementById("email");
//     let gender = document.querySelector('input[name="gender"]:checked')?.value;
//     let hobbies = gethobbies("hobbies");
//     let selectcountryvalue = selectcountry.value;
//     let selectstatevalue = selectstate.value;
//     let selectcityvalue = selectcity.value;

//     validation();

//     const user = {
//         id: Math.floor(Math.random() * 95) + 5,
//         name: name.value,
//         email: email.value,
//         gender: gender,
//         hobby: hobbies,
//         country: selectcountryvalue,
//         state: selectstatevalue,
//         city: selectcityvalue,
//         date: new Date().toLocaleString(),
//     };

//     let userhasvalue = true;
//     for (const key in user) {
//         // console.log(key,user[key]);
//         let value = user[key];
//         if (value === undefined || value === "" || value === null) {
//             userhasvalue = false;
//             break;
//         }
//     }
//     if (userhasvalue) {
//         usersarray.push(user);
//         console.log(usersarray);

//         loadtable();
//         bookform.reset();
//     }
// });

// function updatefunc() {
//     let userobj = usersarray.find((item) => item.id === editingindex);
//     // console.log(userobj);

//     let name = document.getElementById("name");
//     let email = document.getElementById("email");
//     let gender = document.querySelector('input[name="gender"]:checked')?.value;
//     let hobbies = gethobbies("hobbies");
//     let selectcountryvalue = selectcountry.value;
//     let selectstatevalue = selectstate.value;
//     let selectcityvalue = selectcity.value;

//     userobj.name = name.value;
//     userobj.email = email.value;
//     userobj.gender = gender;
//     userobj.hobby = hobbies;
//     userobj.country = selectcountryvalue;
//     userobj.state = selectstatevalue;
//     userobj.city = selectcityvalue;
//     userobj.date = new Date().toLocaleString();

//     loadtable();
//     editingindex = null;
//     bookform.reset();
//     submitbtn.style.display = "block";
//     updatebtn.style.display = "none";
//     cancelbtn.style.display = "none";
// }

// const edituser = (id) => {
//     const userobj = usersarray.find((item) => item.id === id);

//     document.getElementById("name").value = userobj.name;
//     document.getElementById("email").value = userobj.email;
//     document.querySelector(
//         `input[name="gender"][value="${userobj.gender}"]`
//     ).checked = true;

//     document.querySelectorAll('input[type="checkbox"]').forEach((el) => {
//         el.checked = userobj.hobby.includes(el.value);
//     });

//     selectcountry.value = userobj.country;
//     let country = selectcountry.value;
//     let state = userobj.state;
//     let city = userobj.city;

//     updatestate(country, state);
//     updatecity(country, state, city);

//     validation();

//     editingindex = id;
//     console.log(editingindex);

//     submitbtn.style.display = "none";
//     updatebtn.style.display = "block";
//     cancelbtn.style.display = "block";
// };

// updatebtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     updatefunc();
// });

// cancelbtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     bookform.reset();
//     submitbtn.style.display = "block";
//     updatebtn.style.display = "none";
//     cancelbtn.style.display = "none";
// });

// const deleteuser = (id) => {
//     const indexobj = usersarray.findIndex((obj) => obj.id === id);

//     let deleteobj = usersarray.splice(indexobj, 1);
//     console.log(deleteobj);

//     if (!usersarray.length || editingindex === id) {
//         bookform.reset();
//     }
//     loadtable();
// };

// const loadtable = (filtereddata) => {
//     const data = filtereddata ? filtereddata : usersarray;
//     const tbody = document.getElementById("tbody");
//     tbody.innerHTML = "";

//     data.forEach((item, i) => {
//         let tr = document.createElement("tr");
//         tr.innerHTML = `
//           <td>${item.name}</td>
//           <td>${item.email}</td>
//           <td>${item.gender}</td>
//           <td>${item.hobby}</td>
//           <td>${item.country}</td>
//           <td>${item.state}</td>
//           <td>${item.city}</td>
//           <td>${item.date}</td>
//           <td style="display: flex"><button onclick="edituser(${item.id})">Edit</button><button onclick="deleteuser(${item.id})">Delete</button></td>
//         `;
//         tbody.appendChild(tr);
//     });
// };

// sortvalue.addEventListener("input", (e) => {
//     sortfunc(e);
// });

// let filtereddata;
// function searchbyname(e) {
//     let searchvalue = e.target.value.toLocaleLowerCase();

//     filtereddata = usersarray.filter((item) => {
//         return item.name.toLocaleLowerCase().includes(searchvalue);
//     });
//     // console.log(filte);
    

//     if (searchvalue.length === 0) {
//         sortvalue.value = ""
//     }

//     if (!filtereddata.length && searchvalue.length) {
//         sortvalue.removeEventListener("input", sortfunc(e));
//     }

//     loadtable(filtereddata);
//     if (!filtereddata.length) {
//         nodatafound.style.display = "block";
//     }
//     if (filtereddata.length) {
//         nodatafound.style.display = "none";
//     }
// }

// function sortfunc(e) {
//     let value = e.target.value;

//     if (!value) {
//         loadtable(usersarray);
//     }

//     let copydata = structuredClone(usersarray);
//     let sortdata;
//     if (value === "Ascending") {
//         sortdata = copydata.sort((a, b) => {
//             return a.name.localeCompare(b.name);
//         });
//         loadtable(sortdata)
//     }

//     if (value === "Decending") {
//         sortdata = copydata.sort((a, b) => {
//             return b.name.localeCompare(a.name);
//         });
//         loadtable(sortdata)
//     }

//     let data = filtereddata.length ? filtereddata : sortdata
//     loadtable(data);
//     bookform.reset();
// }
