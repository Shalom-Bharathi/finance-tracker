

const { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, Timestamp, getDoc } = firebase.firestore();
const auth = firebase.auth();
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');
const Userphoto = document.getElementById("Userphoto");

const provider = new firebase.auth.GoogleAuthProvider();

const purchasesData = [
    { Amount: 50, Category: 'Groceries', MoP: 'Credit Card', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-01-15')) },
    { Amount: 30, Category: 'Entertainment', MoP: 'Cash', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-02-10')) },
    { Amount: 80, Category: 'Utilities', MoP: 'Debit Card', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-02-25')) },
    { Amount: 60, Category: 'Groceries', MoP: 'Credit Card', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-03-05')) },
    { Amount: 40, Category: 'Entertainment', MoP: 'Cash', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-04-20')) },
    { Amount: 70, Category: 'Utilities', MoP: 'Debit Card', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-05-10')) },
    { Amount: 55, Category: 'Groceries', MoP: 'Credit Card', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-06-15')) },
    { Amount: 25, Category: 'Entertainment', MoP: 'Cash', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-07-20')) },
    { Amount: 90, Category: 'Utilities', MoP: 'Debit Card', Date: firebase.firestore.Timestamp.fromDate(new Date('2023-08-05')) },
  ];


const presetMoP = [
    "Credit Cards",
    "Debit Cards",
    "E-Wallets",
    "Bank Transfers",
    "Mobile Payments",
    "Cryptocurrencies",
    "Prepaid Cards",
    "Cash",
    "Buy Now, Pay Later",
    "Checks",
    "Direct Debit",
    "Money Orders",
    "Wire Transfers",
    "Digital Currencies",
    "Others",
    "Add Custom",
];

const presetCategories = [
    "Food",
    "Shopping",
    "Housing",
    "Transportation",
    "Utilities",
    "Healthcare",
    "Insurance",
    "Entertainment",
    "Education",
    "Personal Care",
    "Clothing",
    "Savings",
    "Investments",
    "Travel",
    "Gifts and Donations",
    "Debt Repayment",
    "Subscriptions",
    "Taxes",
    "Pets",
    "Childcare",
    "Others",
    "Add Custom",
];

try {
const dropdown1 = document.getElementById('Category');
    presetCategories.forEach(Cat => {
        const option = document.createElement('option');
        option.value = Cat;
        option.textContent = Cat;
        dropdown1.appendChild(option);
    });
}
catch {
    console.log("Category Adding Failed");
}




try {
const dropdown2 = document.getElementById('MoPDropdown');
    presetMoP.forEach(MoP => {
        const option = document.createElement('option');
        option.value = MoP;
        option.textContent = MoP;
        dropdown2.appendChild(option);
    });
}

catch {
    console.log("MoP Adding Failed")
}
try {
signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();
}
catch {
    console.log("logging in provider failed")
}

auth.onAuthStateChanged(user => {
    if (user) {
        try {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        }
        catch {console.log("login feature not in this page")}
        userDetails.textContent = user.displayName;
        const profilePicUrl = user.photoURL;
        Userphoto.src = profilePicUrl;
        try {
        document.getElementById('userDetails2').textContent = user.displayName;
        const profilePicUrl2 = user.photoURL;
        document.getElementById('Userphoto2').src = profilePicUrl2;
        } catch {console.log("there is no second profile loader in this page")}
    } else {
        try {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        }
        catch {console.log("login feature not in this page")}
        userDetails.innerHTML = '';
        Userphoto.src = '';
    } 
});
const CategoryItm = document.getElementById("Category");
const AmountItm = document.getElementById("Amount");
const db = firebase.firestore()

const sumbitBtn = document.getElementById("submit-btn");
const thingsList = document.getElementById("thingsList"); 

let thingsRef3;
let unsubscribe3;
const sumbitBtn3 = document.getElementById("submit-btn-MoP");
const MoPText = document.getElementById("add-MoP");
const dropdownCAT = document.getElementById('Category');
const dropdownMoP = document.getElementById('MoPDropdown');
const CustomCATAdd = document.getElementById("AddCustomSectionCAT");
const CustomMoPAdd = document.getElementById("AddCustomSectionMoP");

let thingsRef4;
let unsubscribe4;
const SumOfLabel = document.getElementById("SumOfText");
const DefaultRadio = document.getElementById("LifeTime-Spent");
const MoneySpent =document.querySelectorAll('input[name="sumOfMoneySpent"]');
const categoriesListDollars = document.getElementById("categoriesListDollars");
const categoriesListPersentage = document.getElementById("categoriesListPersentage");
const MoPListDollars = document.getElementById("MoPListDollars");
const MoPListPersentage = document.getElementById("MoPListPersentage");
let stateOfTime;
let isLifeTime;

let thingsRef5;
let unsubscribe5;
const EditDataBtn = document.getElementById("EditDataBtn");
const EditDataBtnOut = document.getElementById("EditDataBtnOut");
const DataEditorSection = document.getElementById("DataEditorSection");

// const DataEditTable = document.getElementById("DataEditTable").getElementsByTagName('tbody') [0];
const DataEditTable = document.getElementById("tbodyEdittor");


let thingsRef2;
let unsubscribe2;
const sumbitBtn2 = document.getElementById("submit-btn-Category")
const CategoryText = document.getElementById("add-category")

let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    
    if (user) {

        
        thingsRef = db.collection('spendings')

        sumbitBtn.onclick = () => {

            thingsRef.add({
                uid: user.uid,
                Amount: Number(AmountItm.value),
                Category: String(CategoryItm.value),
                MoP: String(dropdownMoP.value),
                Date: saveDateToFirestore('DatePicker')
            });
            alert("sucessfully added")
        }

    } else {
        
        unsubscribe && unsubscribe();
    }
});

// CATEGORY DATA PUSH PULL AND HANDLING //



auth.onAuthStateChanged(user => {

    if (user) {

        
        thingsRef2 = db.collection('categories')

        sumbitBtn2.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;
            thingsRef2.add({
                uid:user.uid,
                Category:String(CategoryText.value),
                Date: serverTimestamp()
            });
            console.log("success")
        }

        unsubscribe2 = thingsRef2
        .where('uid', '==', user.uid)
        
        .onSnapshot(querySnapshot => {
        
        let usersCat = querySnapshot.docs.map(doc => {                
            return doc.data().Category;
        }); 
        console.log(usersCat)
        addCategories(usersCat);
        console.log("pulling data sucessful")
    });

    


    } else {
        
        unsubscribe2 && unsubscribe();
    }
});





// MoP DATA PUSH PULL AND HANDLING //

auth.onAuthStateChanged(user => {

    if (user) {
        
        thingsRef3 = db.collection('MoP')

        sumbitBtn3.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;

            thingsRef3.add({
                uid:user.uid,
                MoP:String(MoPText.value),
                Date: serverTimestamp()
            
            });
            console.log("Test3: Success")
        }

        unsubscribe3 = thingsRef3
        .where('uid', '==', user.uid)
        
        .onSnapshot(querySnapshot => {
        
        let usersMoP = querySnapshot.docs.map(doc => {                
            return doc.data().MoP;

        }); 
        console.log(usersMoP);
        addMoP(usersMoP);
        console.log("sucess2");
    });
    


    } else {
        
        unsubscribe3 && unsubscribe();
    }
});


// pie charts MOP Dashboard
let thingsRef6;
let unsubscribe6;
try {
auth.onAuthStateChanged(user => {

    if (user) {

        thingsRef6 = db.collection('spendings')



                unsubscribe6 = thingsRef6
                .where('uid', '==', user.uid)
                
                .onSnapshot(querySnapshot => {
                let totalAmount_2 = 0
                let categoryTotalDollars_2 = {};
                let mopTotalDollars_2 = {};
                
                querySnapshot.docs.forEach(doc => {     
                    const data = doc.data();
                    const amount_ = data.Amount;   
                    const category_ = data.Category;
                    const mop_ = data.MoP;
                    
                    if (!categoryTotalDollars_2[category_]) {
                        categoryTotalDollars_2[category_] = 0;
                    }

                    categoryTotalDollars_2[category_] += amount_;

                    if (!mopTotalDollars_2[mop_]) {
                        mopTotalDollars_2[mop_]= 0;
                    }

                    mopTotalDollars_2[mop_] += amount_;

                    totalAmount_2 += amount_;
                    console.log(categoryTotalDollars_2);
                    
                    
                });
                console.log(categoryTotalDollars_2)
                
                let categoryTotalPersent_2 = categoryTotalDollars_2;
                let MoPTotalPersent_2 = mopTotalDollars_2;
                    for (const category in categoryTotalPersent_2) {
                        const percentage = (categoryTotalPersent_2[category] / totalAmount_2) * 100;
                        categoryTotalPersent_2[category] = percentage.toFixed(2);
                    }

                for (const MoP in MoPTotalPersent_2) {
                    const MoPs = (MoPTotalPersent_2[MoP] / totalAmount_2) * 100;
                    MoPTotalPersent_2[MoP] = MoPs.toFixed(2);
                }
                let highest = 0;
                let highestCat = "";
                for (i in categoryTotalPersent_2) {
                   if (categoryTotalPersent_2[i] > highest) {
                    highest = categoryTotalPersent_2[i];
                    highestCat = i
                   }
                }
                document.getElementById('MostusedCatLabel').textContent = highestCat;
                console.log(`testing :${highestCat}`)

                let highest2 = 0;
                let highestMoP = "";
                for (i in MoPTotalPersent_2) {
                   if (MoPTotalPersent_2[i] > highest2) {
                    highest2 = MoPTotalPersent_2[i];
                    highestMoP = i;
                   }
                   
                }
                document.getElementById('MostusedMoPLabel').textContent = highestMoP;
                console.log(`testing :${highestMoP}`)

                document.getElementById('totalAmountSpentLabel').textContent = `₹${totalAmount_2}`;

                

                piechartCreate("categoriesListPersentageChartIndex",categoryTotalPersent_2)
                piechartCreate("MoPListPersentageChartIndex",MoPTotalPersent_2)
                

                
                });

            };
        }
    )}

    
    catch {
            console.log("error in making MoP chart in Dashboard")
}
// Total Money Spent and charts
auth.onAuthStateChanged(user => {

    if (user) {

        
        thingsRef4 = db.collection('spendings')
        
        
        MoneySpent.forEach(radio => {
            radio.addEventListener('change', () => {
                let TimestampVAR;
                if (radio.value == "LifeTime") {
                    const now = new Date();
                    const pastLife = new Date(now);
                    pastLife.setDate(pastLife.getDate() - 100000);
                    
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const LifeTimeTimestamp = firebase.firestore.Timestamp.fromDate(pastLife);
                    console.log("Success: LifeTime")
                    console.log(`Checking:${LifeTimeTimestamp}`)
                    TimestampVAR = LifeTimeTimestamp;
                    stateOfTime = "";
                    
                }
        
                else if (radio.value == "PastYear") {
                    const now = new Date();
                    const past365Days = new Date(now);
                    past365Days.setDate(past365Days.getDate() - 365);
                    
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const past365DaysTimestamp = firebase.firestore.Timestamp.fromDate(past365Days);
                    console.log("Success: 365days")
                    console.log(`Checking:${past365DaysTimestamp}`)
                    TimestampVAR = past365DaysTimestamp;
                    stateOfTime = "in the last 365 days";
                    
                }
        
                else if (radio.value == "Past6Month") {
                    const now = new Date();
                    const past6Months = new Date(now);
                    past6Months.setDate(past6Months.getDate() - 182);
        
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const past6MonthsTimestamp = firebase.firestore.Timestamp.fromDate(past6Months);
                    console.log("Success: 182days")
                    console.log(`Checking:${past6MonthsTimestamp}`)
                    TimestampVAR = past6MonthsTimestamp;
                    stateOfTime = "in the last 6 months";
                    
                }
        
                else if (radio.value == "PastMonth") {
                    const now = new Date();
                    const pastMonth = new Date(now);
                    pastMonth.setDate(pastMonth.getDate() - 30);
        
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const pastMonthTimestamp = firebase.firestore.Timestamp.fromDate(pastMonth);
                    console.log("Success: 30days")
                    console.log(pastMonthTimestamp)
                    TimestampVAR = pastMonthTimestamp;
                    stateOfTime = "in the last 30 days";
                    
                }


                unsubscribe4 = thingsRef4
                .where('uid', '==', user.uid)
                
                .where('Date', '>=', TimestampVAR)
                
                .onSnapshot(querySnapshot => {
                let totalAmount = 0
                let categoryTotalDollars = {};
                let mopTotalDollars = {};

                querySnapshot.docs.forEach(doc => {     
                    const data = doc.data();
                    const amount_ = data.Amount;   
                    const category_ = data.Category;
                    const mop_ = data.MoP;
                    
                    if (!categoryTotalDollars[category_]) {
                        categoryTotalDollars[category_] = 0;
                    }

                    categoryTotalDollars[category_] += amount_;

                    if (!mopTotalDollars[mop_]) {
                        mopTotalDollars[mop_]= 0;
                    }

                    mopTotalDollars[mop_] += amount_;

                    totalAmount += amount_;
                    console.log(categoryTotalDollars);
                    
                    
                });
                console.log(categoryTotalDollars)
                AmountLiAppend(categoryTotalDollars,categoriesListDollars, "$", 'first')
                AmountLiAppend(mopTotalDollars, MoPListDollars, "$", 'first');
                drawBarGraph(categoryTotalDollars, 'categoriesListDollarBar')
                drawBarGraph(mopTotalDollars, 'MoPListDollarBar')
                let categoryTotalPersent = categoryTotalDollars;
                let MoPTotalPersent = mopTotalDollars;
                    for (const category in categoryTotalPersent) {
                        const percentage = (categoryTotalPersent[category] / totalAmount) * 100;
                        categoryTotalPersent[category] = percentage.toFixed(2);
                    }

                for (const MoP in MoPTotalPersent) {
                    const MoPs = (MoPTotalPersent[MoP] / totalAmount) * 100;
                    MoPTotalPersent[MoP] = MoPs.toFixed(2);
                }
                    
                console.log(categoryTotalPersent)
                console.log(categoryTotalDollars)
                
                SumOfLabel.textContent = `Total Money Spent ${stateOfTime} is ₹${totalAmount}!`;
                console.log("sucessfully summed money");

                
                AmountLiAppend(categoryTotalPersent,categoriesListPersentage, "%", "last")
                piechartCreate("categoriesListPersentageChart",categoryTotalPersent)
                
                AmountLiAppend(MoPTotalPersent, MoPListPersentage, "%", "last");
                piechartCreate("MoPListPersentageChart",MoPTotalPersent)
                  
                
                });
            
            });
    

        
    });
    


    } else {
        
        unsubscribe4 && unsubscribe();
    }
});

// Tablular Format to edit data


auth.onAuthStateChanged(user => {
    if (user) {
        thingsRef5 = db.collection('spendings');
        unsubscribe5 = thingsRef5
            .where('uid', '==', user.uid)
            .onSnapshot(querySnapshot => {
                try {
                    DataEditTable.innerHTML = '';
                } catch (error) {
                    console.log("DataEditTable.innerHTML Failed", error);
                }
                let numb = 0;
                querySnapshot.forEach(doc => {
                    numb++;
                    const data = doc.data();
                    console.log("Document data:", data);
                    const newRow = DataEditTable.insertRow(-1);
                    const _Sno = newRow.insertCell(0);
                    const _Amount = newRow.insertCell(1);
                    const _Category = newRow.insertCell(2);
                    const _MoP = newRow.insertCell(3);
                    const _Date = newRow.insertCell(4);
                    const _Delete = newRow.insertCell(5);
                    _Sno.innerHTML = `${numb}`;
                    _Amount.innerHTML = `₹${data.Amount}`;
                    _Category.innerHTML = `${data.Category}`;
                    _MoP.innerHTML = `${data.MoP}`;
                    _Date.innerHTML = `${convertTimestampToDate(data.Date)}`;

                    const deleteButton = document.createElement('button');
                    deleteButton.className = "btn btn-outline-danger";
                    deleteButton.innerHTML = 'Delete';
                    deleteButton.onclick = () => {
                        if (confirm("Please confirm deletion of data")) {
                            newRow.remove();
                            thingsRef5.doc(doc.id).delete().then(() => {
                                console.log('Document successfully deleted!');
                            }).catch(error => {
                                console.error('Error removing document: ', error);
                            });
                        } else {
                            alert("Data deletion has been cancelled");
                        }
                    };
                    _Delete.appendChild(deleteButton);
                });
            });
    } else {
        unsubscribe5 && unsubscribe5();
    }
});



// Monthly Spendings

let thingsRef8;
let unsubscribe8;


auth.onAuthStateChanged(user => {

    if (user) {
        
        thingsRef8 = db.collection('spendings')

        unsubscribe8 = thingsRef8
        .where('uid', '==', user.uid)
        
        .onSnapshot(querySnapshot => {
        let dictOfData = {
            "January":0,
            "February":0,
            "March":0,
            "April":0,
            "May":0,
            "June":0,
            "July":0,
            "August":0,
            "September":0,
            "October":0,
            "November":0,
            "December":0,
        };
        let highestSpent1 = 0;
        let usersMoP1 = querySnapshot.docs.map(doc => {    
            let date = convertTimestampToDate(doc.data().Date)
            console.log(date)
            date = getMonthNameFromDateString(date)
            console.log(date)
            dictOfData[date] += doc.data().Amount;
        }); 
        console.log()
        drawLineGraph(dictOfData, "monthlySpendingGraph")
    });
    


    } else {
        
        unsubscribe8 && unsubscribe();
    }
});

// Biggest Purchase //

let thingsRef7;
let unsubscribe7;

auth.onAuthStateChanged(user => {

    if (user) {
        
        thingsRef3 = db.collection('spendings')

        unsubscribe3 = thingsRef3
        .where('uid', '==', user.uid)
        
        .onSnapshot(querySnapshot => {
        let highestSpent = 0;
        let usersMoP = querySnapshot.docs.map(doc => {    
            if (doc.data().Amount > highestSpent) {
                highestSpent = doc.data().Amount
            }    
        }); 
        document.getElementById('biggestPurchaseLabel').textContent = `₹${highestSpent}`
    });
    


    } else {
        
        unsubscribe7 && unsubscribe();
    }
});

// END OF CODE //


function addCategories(categories) {
    const dropdown = document.getElementById('Category');
    
    const existingOptions = new Set();
    for (let i = 0; i < dropdown.options.length; i++) {
        existingOptions.add(dropdown.options[i].value);
    }

    categories.forEach(category => {
        if (!existingOptions.has(category)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        }
    });
};


function addMoP(MoPs) {
    const dropdown = document.getElementById('MoPDropdown');
    
    const existingOptions = new Set();
    for (let i = 0; i < dropdown.options.length; i++) {
        existingOptions.add(dropdown.options[i].value);
    };

    
    MoPs.forEach(MoP => {
        if (!existingOptions.has(MoP)) {
            const option = document.createElement('option');
            option.value = MoP;
            option.textContent = MoP;
            dropdown.appendChild(option);
        }
    });
};


function AmountLiAppend(data, table, type, position) {
    
    table.innerHTML = ``;
    

    for (const category in data) {
        if (data.hasOwnProperty(category)) {
            
            const row = table.insertRow();
            const cell = row.insertCell(0);
            
            
            if (position === "first") {
                cell.textContent = `${category}: ${type} ${data[category]}`;
            } else if (position === "last") {
                cell.textContent = `${category}: ${data[category]} ${type}`;
            }
            table.appendChild(row);
        }
    }
}


function convertTimestampToDate(timestamp) {
    if (!timestamp) {
      return 'Invalid Date';
    }
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


function piechartCreate (id,datab) {
    const labels = Object.keys(datab);
    const data = Object.values(datab);
    console.log(labels,data)
    const ctx = document.getElementById(id).getContext('2d');

    new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Percentage',
            data: data,
            backgroundColor : [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    
                    formatter: function(tooltip) {
                        let tooltipText = '';
                        if (tooltip.label) {
                            tooltipText += `${labels[tooltip.dataIndex]}: ${data[tooltip.dataIndex]}%`;
                        }
                        return tooltipText;
                    }

                }
            }
        }
    }
})
}

function timestampToYearMonth(timestamp) {
    const date = timestamp.toDate();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}



function drawBarGraph(data, canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data',
          data: values ,
          backgroundColor: '#6b8a7a',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Values'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Labels'
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend if not needed
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return '$' + tooltipItem.raw.toFixed(2); // Display raw data value with 2 decimal places
              }
            }
          }
        }
      }
    });
  }


  function getMonthNameFromDateString(dateString) {
    const parts = dateString.split('/');
    const monthIndex = parseInt(parts[1], 10) - 1;
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString('default', { month: 'long' });
  }
  
  function drawLineGraph(dataObject, canvasId) {
    const labels = Object.keys(dataObject); // Extract keys as labels (e.g., month names)
    const dataValues = Object.values(dataObject); // Extract values as data points
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Spending',
          data: dataValues,
          fill: false,
          borderColor: '#6b8a7a', // Custom color for the line
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Months'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top', // Adjust position as needed
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return '$' + tooltipItem.raw.toFixed(2); // Format tooltip to show $ sign and 2 decimals
              }
            }
          }
        }
      }
    });
  }

function saveDateToFirestore(id) {
    const customDateInput = document.getElementById(id).value;
    const selectedDate = new Date(customDateInput);
    const timestamp = firebase.firestore.Timestamp.fromDate(selectedDate);
    return timestamp
}